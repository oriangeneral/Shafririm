using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace ShafririmWebapi
{
    public class CommonHandler
    {

        public static Object JsonToObject(string jsonString, Type targetType)
        {
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
           return javaScriptSerializer.Deserialize(jsonString, targetType);
        }


        public static Object ObjectToJson(object obj)
        {
            string jsonString = string.Empty;
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();

            var serializeSettings = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
                PreserveReferencesHandling= PreserveReferencesHandling.Objects
            };
            if (obj != null)
            {
                jsonString = JsonConvert.SerializeObject(obj, serializeSettings); 
            }

            return jsonString;
        }
    }
}