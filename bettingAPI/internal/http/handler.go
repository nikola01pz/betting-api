package http

import (
	"bettingAPI/internal/mysql"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"
)

type handler struct {
	db *mysql.DB
}

func NewHandler(d *mysql.DB) *handler {
	return &handler{
		db: d,
	}
}

type registrationRequest struct {
	Username  string `json:"username" `
	Email     string `json:"email" `
	Password  string `json:"password"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	BirthDate string `json:"birth_date"`
}

type loginInfo struct {
	Username  string  `json:"username" `
	Email     string  `json:"email" `
	FirstName string  `json:"first_name"`
	LastName  string  `json:"last_name"`
	Balance   float32 `json:"balance"`
}

type loginRequest struct {
	User     string `json:"user" `
	Password string `json:"password"`
}

type BetSlipRequest struct {
	Username string  `json:"username" `
	Stake    float32 `json:"stake"`
	Bets     []bet   `json:"bets"`
}

type bet struct {
	OfferID int    `json:"offer"`
	Tip     string `json:"tip"`
}

type myError struct {
	Message string `json:"message"`
}

func (h *handler) GetLeagueOffers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var leagueOffers = h.db.GetLeagueOffers()
	json.NewEncoder(w).Encode(leagueOffers)
}

func (h *handler) GetOffer(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	offerID, err := strconv.Atoi(params["id"])
	if err != nil {
		log.Printf("Error converting id from string to int: %s", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	offer := h.db.GetOfferByID(offerID)
	json.NewEncoder(w).Encode(offer)
}

func HandleAndUnmarshalIncomingData(w http.ResponseWriter, r *http.Request, target interface{}) (interface{}, error) {
	w.Header().Set("Content-Type", "application/json")
	body, err := io.ReadAll(r.Body)
	if err != nil {
		log.Printf("Error getting data from login form: %s", err)
		w.WriteHeader(http.StatusInternalServerError)
		return nil, err
	}
	err = json.Unmarshal(body, &target)
	if err != nil {
		log.Printf("Error unmarshalling data from login form: %s", err)
		w.WriteHeader(http.StatusInternalServerError)
		return nil, err
	}
	return target, nil
}

func (h *handler) HandleRegisterRequest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	body, err := io.ReadAll(r.Body)
	if err != nil {
		log.Printf("Error getting data from register form: %s", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	var regReq registrationRequest
	err = json.Unmarshal(body, &regReq)
	if err != nil {
		log.Printf("Error unmarshalling data from register form: %s", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	if !isRegistrationRequestValid(regReq) {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	isEmailUnique, err := h.isEmailUnique(regReq.Email)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	if !isEmailUnique {
		w.WriteHeader(http.StatusBadRequest)
		e := myError{
			Message: "email is already used",
		}
		json.NewEncoder(w).Encode(e)
		return
	}
	isUsernameUnique, err := h.isUsernameUnique(regReq.Username)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	if !isUsernameUnique {
		w.WriteHeader(http.StatusBadRequest)
		e := myError{
			Message: "username is already used",
		}
		json.NewEncoder(w).Encode(e)
		return
	}
	passwordHash, err := hashPassword(regReq.Password)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	parsedBirthDate, err := time.Parse("02-01-2006", regReq.BirthDate)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	user := mysql.User{
		Email:        regReq.Email,
		Username:     regReq.Username,
		PasswordHash: passwordHash,
		FirstName:    regReq.FirstName,
		LastName:     regReq.LastName,
		BirthDate:    parsedBirthDate,
	}
	err = h.db.InsertUser(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}

func (h *handler) HandleLoginRequest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	body, err := io.ReadAll(r.Body)
	if err != nil {
		log.Printf("Error getting data from login form: %s", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	var logReq loginRequest
	err = json.Unmarshal(body, &logReq)
	if err != nil {
		log.Printf("Error unmarshalling data from login form: %s", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	if !isLoginRequestValid(logReq) {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	user, err := h.Login(logReq.User, logReq.Password)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	if user == nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	userInfo := loginInfo{
		Email:     user.Email,
		Username:  user.Username,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Balance:   user.Balance,
	}
	json.NewEncoder(w).Encode(userInfo)
	w.WriteHeader(http.StatusOK)
}

func (h *handler) HandleBetSlipRequest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	body, err := io.ReadAll(r.Body)
	if err != nil {
		log.Printf("Error getting data from bet slip request: %s", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var betSlip mysql.BetSlipRequest
	err = json.Unmarshal(body, &betSlip)
	if err != nil {
		log.Printf("Error unmarshalling data from bet slip request: %s", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if !isStakeSufficient(betSlip.Stake) {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	user, err := h.db.FindUserByUsername(betSlip.Username)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	if user == nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if !hasSufficientFunds(user.Balance, betSlip.Stake) || !hasOnlyOneTipPerOffer(betSlip.Bets) {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	totalCoefficient, err := h.calculateTotalCoefficient(betSlip)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	var tax float32 = 0.15

	payout := totalCoefficient * betSlip.Stake * (1 - tax)

	if payout > 10000 {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	userBetSlip := mysql.UserBetSlip{
		UserID:      user.ID,
		Stake:       betSlip.Stake,
		Coefficient: totalCoefficient,
		Payout:      payout,
	}

	err = h.db.InsertUserBetSlip(userBetSlip, betSlip)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err = h.db.UpdateUserBalance(*user, user.Balance-betSlip.Stake)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}

func (h *handler) HandleAddFundsRequest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	body, err := io.ReadAll(r.Body)
	if err != nil {
		log.Printf("Error getting data from add funds request: %s", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var addFunds mysql.AddFundsRequest
	err = json.Unmarshal(body, &addFunds)
	if err != nil {
		log.Printf("Error unmarshalling data from add funds request: %s", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if (addFunds.Amount > 1000) || (addFunds.Amount < 5) {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	user, err := h.db.FindUserByUsername(addFunds.Username)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	if user == nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	err = h.db.UpdateUserBalance(*user, user.Balance+addFunds.Amount)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}