﻿using System;
using System.Collections.Generic;
using System.IO;
// System.Linq.Enumerable
using System.Linq;
using System.Transactions;

using HelperClassLibrary;

namespace LearningExamples
{
	// https://docs.microsoft.com/en-us/dotnet/api/system.transactions.transactionscope?view=net-5.0
	public static class TransactionScopeExample
	{
		public static void Run()
		{

		}

        // This function takes arguments for 2 connection strings and commands to create a transaction 
        // involving two SQL Servers. It returns a value > 0 if the transaction is committed, 0 if the 
        // transaction is rolled back. To test this code, you can connect to two different databases 
        // on the same server by altering the connection string, or to another 3rd party RDBMS by 
        // altering the code in the connection2 code block.
        static public int CreateTransactionScope(
            string connectString1, string connectString2,
            string commandText1, string commandText2)
        {
            // Initialize the return value to zero and create a StringWriter to display results.
            int returnValue = 0;
            StringWriter writer = new StringWriter();

            try
            {
                // Create the TransactionScope to execute the commands, guaranteeing
                // that both commands can commit or roll back as a single unit of work.
                using (TransactionScope scope = new TransactionScope())
                {
					/* using (SqlConnection connection1 = new SqlConnection(connectString1))
                    {
                        // Opening the connection automatically enlists it in the 
                        // TransactionScope as a lightweight transaction.
                        connection1.Open();

                        // Create the SqlCommand object and execute the first command.
                        SqlCommand command1 = new SqlCommand(commandText1, connection1);
                        returnValue = command1.ExecuteNonQuery();
                        writer.WriteLine("Rows to be affected by command1: {0}", returnValue);

                        // If you get here, this means that command1 succeeded. By nesting
                        // the using block for connection2 inside that of connection1, you
                        // conserve server and network resources as connection2 is opened
                        // only when there is a chance that the transaction can commit.   
                        using (SqlConnection connection2 = new SqlConnection(connectString2))
                        {
                            // The transaction is escalated to a full distributed
                            // transaction when connection2 is opened.
                            connection2.Open();

                            // Execute the second command in the second database.
                            returnValue = 0;
                            SqlCommand command2 = new SqlCommand(commandText2, connection2);
                            returnValue = command2.ExecuteNonQuery();
                            writer.WriteLine("Rows to be affected by command2: {0}", returnValue);
                        }
                    } 
					*/

                    // The Complete method commits the transaction. If an exception has been thrown,
                    // Complete is not  called and the transaction is rolled back.
                    scope.Complete();
                }
            }
            catch (TransactionAbortedException ex)
            {
                writer.WriteLine("TransactionAbortedException Message: {0}", ex.Message);
            }

            // Display messages.
            Console.WriteLine(writer.ToString());

            return returnValue;
        }
    }
}
