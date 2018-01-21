/*
g++ -std=c++11 -o wallet main.cpp wallet.cpp error.cpp $(pkg-config --cflags libbitcoin --libs libbitcoin libbitcoin-client)
*/

#include "stdafx.h"
#include "Wallet.h"
#include "Network.h"
#include "Error.h"

int
main(int argc, char * argv[])
{
    // Wallet and network objects.
    Wallet wallet;
    Network network;
    switch(atoi(argv[1]))
    {
        // Get next address of wallet.
        // TODO , create new wallet or load existing wallet.
        case 1:
            std::cout << wallet.showNextAddress() << std::endl;
            break;
        // Confirm if address is paid. 
        case 2:
            bc::wallet::payment_address addy("1FKrfBLFsTCquCXJouj5AYEYVHdEUFs4wz");
            std::cout << network.addressPaid(addy) << std::endl;
            break;
    }

    // DEBUG: Expose keys of wallet.
    // wallet.showKeys();
    //network.getPriceQuoteFromCoinbase();
}