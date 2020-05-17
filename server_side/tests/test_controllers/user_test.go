package testcontrollers

import (
	"regexp"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"

	// "strings"
	"app/server_side/models"
	_ "app/server_side/routers"

	"github.com/jinzhu/gorm"
)

func getDBMock() (*gorm.DB, sqlmock.Sqlmock, error) {
	db, mock, err := sqlmock.New()
	if err != nil {
		return nil, nil, err
	}

	gdb, err := gorm.Open("mysql", db)
	if err != nil {
		return nil, nil, err
	}
	return gdb, mock, err
}

func TestCreateUser(t *testing.T) {
	db, mock, err := getDBMock()
	if err != nil {
		t.Fatal(err)
	}

	defer db.Close()
	db.LogMode(true)

	user := models.User{
		UserName:      "山田",
		LoginName:     "",
		LoginPassword: "",
	}

	// Mock設定
	mock.ExpectQuery(regexp.QuoteMeta(
		`INSERT INTO "users" ("id","userName","loginName","loginPassword") VALUES ($1,$2,$3,$4)
    RETURNING "users"."id"`)).
		WithArgs(user).
		WillReturnRows(
			sqlmock.NewRows([]string{"id"}).AddRow("100"))

	// 実行
	_, err = models.CreateUser(user)
	if err != nil {
		t.Fatal(err)
	}
}

// const User = "user"

// func TestGetUser(t *testing.T) {
// 	pathOfGetDir := jsonDirectory + camelToSnake(User) + "/get/"

// 	expectJSONDir, dirErr := ioutil.ReadDir(pathOfGetDir)
// 	if dirErr != nil {
// 		assert.Fail(t, dirErr.Error())
// 	}

// 	for _, expectJSONFile := range expectJSONDir {
// 		expectJSONByte, eErr := ioutil.ReadFile(pathOfGetDir + expectJSONFile.Name())
// 		if eErr != nil {
// 			assert.Fail(t, eErr.Error())
// 		}

// 		expectJSON := string(expectJSONByte)

// 		id := gjson.Get(expectJSON, "id").Int()

// 		testGet(t, User, id, expectJSON)
// 	}
// }
