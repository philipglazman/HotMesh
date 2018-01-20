#include "stdafx.h"
#include "Network.h"
#include "Error.h"

// Constructor.
Network::Network()
{
    // if(!connectToNetwork())
    // {
    //     std::string err = "Error connecting to bitcoin network.";
    //     Error::RecordError(err);
    // }
}

bool Network::addressPaid(bc::wallet::payment_address a_address)
{
    bc::client::connection_type connection = {};
	connection.retries = 3;
	connection.timeout_seconds = 8;
	connection.server = bc::config::endpoint("tcp://mainnet.libbitcoin.net:9091");
    
    bc::client::obelisk_client m_client(connection);
    
    // Check if connection is working.
	if(m_client.connect(connection))
	{
        std::cout << "Connected to bitcoin network" << std::endl;
		//return false;
	}
    else 
    {
        std::cout << "Failed connect to bitcoin network" << std::endl;
		//return true;
	}
    // Lambda callback functions for blockchain_fetch_history3

    static const auto on_done = [](const bc::chain::history::list& rows)
	{
        uint64_t utxo = 0;
        
        // For each row in chain history, check for balance.
        for(const auto& row: rows)
		{
		    if (row.spend.hash() == bc::null_hash)
		        utxo += row.value;
		}

		std::cout<< "Balance: " << utxo << std::endl;

	};

    // Exception handling callback;
	static const auto on_error2 = [](const bc::code ec) 
    {
        std::string err = "Error connecting to bitcoin network.";
		Error::RecordError(err);
	};

    m_client.blockchain_fetch_history3(on_error2, on_done, a_address);

    // Wait for history to be fetched.
	m_client.wait();
    
}

void Network::showTotalBalance( bc::wallet::payment_address a_addresses [] )
{
    bc::client::connection_type connection = {};
	connection.retries = 3;
	connection.timeout_seconds = 8;
	connection.server = bc::config::endpoint("tcp://mainnet.libbitcoin.net:9091");
    
    bc::client::obelisk_client m_client(connection);
    
    // Check if connection is working.
	if(m_client.connect(connection))
	{
        std::cout << "Connected to bitcoin network" << std::endl;
		//return false;
	}
    else 
    {
        std::cout << "Failed connect to bitcoin network" << std::endl;
		//return true;
	}
    // Lambda callback functions for blockchain_fetch_history3

    static const auto on_done = [](const bc::chain::history::list& rows)
	{
        uint64_t utxo = 0;
        
        // For each row in chain history, check for balance.
        for(const auto& row: rows)
		{
		    if (row.spend.hash() == bc::null_hash)
		        utxo += row.value;
		}

		std::cout<< "Balance: " << utxo << std::endl;

	};

    // Exception handling callback;
	static const auto on_error2 = [](const bc::code ec) 
    {
        std::string err = "Error connecting to bitcoin network.";
		Error::RecordError(err);
	};

    //TODO change to m_index
    for( int addyIndex = 0; addyIndex < sizeof(a_addresses); addyIndex++)
    {
        m_client.blockchain_fetch_history3(on_error2, on_done, a_addresses[addyIndex]);
    }

    // Wait for history to be fetched.
	m_client.wait();
}

// Gets price quote from coinbase. returns int. 
int Network::getPriceQuoteFromCoinbase()
{
    CURL *curl;
    CURLcode res;
    
    curl = curl_easy_init();
    if(curl)
    {
        curl_easy_setopt(curl, CURLOPT_URL, "https://api.coinbase.com/v2/prices/spot?currency=USD");
        
        curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);
    
        /* Perform the request, res will get the return code */ 
        res = curl_easy_perform(curl);
        
        /* Check for errors */ 
        if(res != CURLE_OK)
            fprintf(stderr, "curl_easy_perform() failed: %s\n", curl_easy_strerror(res));
    
        /* always cleanup */ 
        curl_easy_cleanup(curl);
    }
}