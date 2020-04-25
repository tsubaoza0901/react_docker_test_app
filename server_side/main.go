package main

import (
	_ "app/server_side/routers"
	"github.com/astaxie/beego"
)

func main() {
	// sessionconf := &session.ManagerConfig{
	// 	CookieName: "beegosessionId",
	// 	Gclifetime: 3600,
	// }
	// beego.GlobalSessions, _ = session.NewManager("memory", sessionconf)
	// go beego.GlobalSessions.GC()

	if beego.BConfig.RunMode == "dev" {
		beego.BConfig.WebConfig.DirectoryIndex = true
		beego.BConfig.WebConfig.StaticDir["/swagger"] = "swagger"
	}

	beego.Run()
}

