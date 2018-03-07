using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace ShafririmWebapi
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            string httpOrigin = Request.Params["HTTP_ORIGIN"];
            if (httpOrigin == null)
            {
                httpOrigin = "http://localhost:4200/";
            }
            HttpContext.Current.Response.Headers.Add("Access-Control-Allow-Origin", httpOrigin);
            HttpContext.Current.Response.Headers.Add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            HttpContext.Current.Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
            if (HttpContext.Current.Request.HttpMethod == "OPTIONS")
            {
                var app = sender as HttpApplication;
                HttpContext.Current.Response.StatusCode = 200;
                app.CompleteRequest();
            }
        }
    }
}
