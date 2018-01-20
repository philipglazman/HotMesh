#include "stdafx.h"
#include "Network.h"
#include "Error.h"

// Constructor.
Network::Network()
{
    if(!connectToNetwork())
    {
        std::string err = "Error connecting to bitcoin network.";
        Error::RecordError(err);
    }
}

// Connect to libbitcoin network nodes.
bool Network::connectToNetwork()
{   
    bc::client::connection_type connection = {};
	connection.retries = 3;
	connection.timeout_seconds = 8;
	connection.server = bc::config::endpoint("tcp://testnet3.libbitcoin.net:19091");

    // Check if connection is working.
	if(!client.connect(connection))
	{
		return false;
	}
    else 
    {
		return true;
	}
}

bool Network::addressPaid(bc::wallet::payment_address a_address)
{
    // Lambda callback functions for blockchain_fetch_history3

    static const auto on_done = [](const bc::chain::history::list& rows)
	{
        uint64_t utxo;
        
        // For each row in chain history, check for balance.
        for(const auto& row: rows)
		{
		    if (row.spend.hash() == bc::null_hash)
		        utxo += row.value;
		}

		std::cout<< bc::encode_base10(utxo, 8) << std::endl;

	};

    // Exception handling callback;
	static const auto on_error2 = [](const bc::code ec) 
    {
        std::string err = "Error connecting to bitcoin network.";
		Error::RecordError(err);
	};

    client.blockchain_fetch_history3(on_error2, on_done, a_address);

    // Wait for history to be fetched.
	client.wait();
    
}