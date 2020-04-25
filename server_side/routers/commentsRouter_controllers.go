package routers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context/param"
)

func init() {

    beego.GlobalControllerRouter["app/server_side/controllers:UserController"] = append(beego.GlobalControllerRouter["app/server_side/controllers:UserController"],
        beego.ControllerComments{
            Method: "Post",
            Router: `/`,
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["app/server_side/controllers:UserController"] = append(beego.GlobalControllerRouter["app/server_side/controllers:UserController"],
        beego.ControllerComments{
            Method: "GetAll",
            Router: `/`,
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["app/server_side/controllers:UserController"] = append(beego.GlobalControllerRouter["app/server_side/controllers:UserController"],
        beego.ControllerComments{
            Method: "Get",
            Router: `/:UserID`,
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["app/server_side/controllers:UserController"] = append(beego.GlobalControllerRouter["app/server_side/controllers:UserController"],
        beego.ControllerComments{
            Method: "Put",
            Router: `/:UserID`,
            AllowHTTPMethods: []string{"put"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["app/server_side/controllers:UserController"] = append(beego.GlobalControllerRouter["app/server_side/controllers:UserController"],
        beego.ControllerComments{
            Method: "Delete",
            Router: `/:UserID`,
            AllowHTTPMethods: []string{"delete"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

}
