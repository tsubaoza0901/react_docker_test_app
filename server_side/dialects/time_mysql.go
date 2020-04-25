package dialects

import (
	"database/sql/driver"

	// 不要かもしれない
	_ "github.com/jinzhu/gorm/dialects/mysql"

	"time"
)

// TimeMysql MysqlのTIME型の文字列マッパー
type TimeMysql string

var format = "15:04:05"

// Value get value of TimeMysql
func (t TimeMysql) Value() (driver.Value, error) {
	// string→[]biteのため、時刻型としてのバリデーションチェックを行う
	// ただし、空文字列は00:00:00に変換する
	if t == "" {
		t = "00:00:00"
	}
	_, err := time.Parse(format, string(t))
	if err != nil {
		return nil, err
	}
	return []uint8(t), nil
}

// Scan scan value into TimeMysql
func (t *TimeMysql) Scan(value interface{}) (err error) {
	parseStr := string(value.([]uint8))
	*t = TimeMysql(parseStr)
	return nil
}

// jsonの変換ロジックは既存のstring型と同様なので不要。
// nullable型にする予定はない。
