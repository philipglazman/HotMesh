/*
Contains peer discovery and checking libbitcoin network servers for balance.
*/

#ifndef _NETWORK_H      
#define _NETWORK_H

#include "stdafx.h"

class Network
{
    public:

        // Call connectToNetwork.
        Network();

        // Connect to the libbitcoin server network.
        // Return true if connection, return false if connection failed.
        //bool connectToNetwork();

        // Check if the address has been paid.
        bool addressPaid(bc::wallet::payment_address a_address);

        // Get Total UTXO for set of addresses.
        void showTotalBalance( bc::wallet::payment_address a_addresses [] );

    private:
        // Client object used for accessing balance and network.
        bc::wallet::payment_address m_address;
};

#endif