/* namespace MyNamespace
{

	interface IConnectionStrings
	{
		string ApplicationDbConnection;
		string SportifierDbConnection;
		string SportifierReportingDbConnection;
	}

	interface IAppSettings
	{
		IConnectionStrings ConnectionStrings;
	}

	class MyClass
	{
		public MyClass()
		{
            var appSettings = new { } as IAppSettings;
            //appSettings.ConnectionStrings.
        }
    }

}  */

/* {
    "ConnectionStrings": {
        "ApplicationDbConnection": "Server=qa-sql-1.sportifier.com;Database=CMSDB;User Id=developer;Password=Devel@per365;",
        "SportifierDbConnection": "Server=qa-sql-1.sportifier.com;Database=SportifierDB;User Id=developer;Password=Devel@per365;",
        "SportifierReportingDbConnection": "Server=qa-sql-1.sportifier.com;Database=SportifierReportingDB;User Id=developer;Password=Devel@per365;"
    },
    "Serilog": {
        "Using": [ "Serilog.Sinks.Console", "Serilog.Sinks.File" ],
        "MinimumLevel": "Debug",
        "WriteTo": [
            { "Name": "Console" }
        ],
        "Enrich": [ "FromLogContext", "WithMachineName", "WithThreadId" ],
        "Destructure": [
            {
                "Name": "ToMaximumDepth",
                "Args": { "maximumDestructuringDepth": 4 }
            },
            {
                "Name": "ToMaximumStringLength",
                "Args": { "maximumStringLength": 100 }
            },
            {
                "Name": "ToMaximumCollectionCount",
                "Args": { "maximumCollectionCount": 10 }
            }
        ],
        "Properties": {
            "Application": "CMS Core"
        }
    },
    "AllowedHosts": "*",
    "HOST": {
        "PORT": 5000
    },
    "CLOUDINARY": {
        "NAME": "scores365",
        "API_KEY": "214782816171547",
        "API_SECRET": "6UhHHoKWM1JWwaYMvIJJhQcK_PM"
    },
    "NOTIFICATION_SENDER": {
        "USE_RABBITMQ": true
    },
    "CalculateReachServer": "http://localhost:9000/api/calculateReach/",
    "UpdatesServiceMgmt": {
        "Address": "net.tcp://172.31.4.151:8005/UpdatesService/management"
    },
    "UpdatesServiceListener": {
        "Address": "net.tcp://172.31.4.151:8005/UpdatesService/service"
    }
}

*/