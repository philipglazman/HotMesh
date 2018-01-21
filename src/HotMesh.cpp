/*
g++ -std=c++11 -o wallet main.cpp wallet.cpp error.cpp $(pkg-config --cflags libbitcoin --libs libbitcoin libbitcoin-client)
*/

#include "stdafx.h"
#include "Wallet.h"
#include "Network.h"
#include "Error.h"
#include "Config.h"

int
main(int argc, char * argv[])
{
    Config config;
    std::stack<std::string> configuration;
    std::string word;
    int index;

    for( ; ; ) 
    {
        std::string buff;

        //config does not exist.
        if(!config.configExists())
            break;
        if(!config.GetNextLine(buff))
            break;

        std::istringstream line(buff);
	    std::string ibuff;
        while (line)
        {

            if ( !ibuff.empty() )
            {
                configuration.push(ibuff);
            }
            line >> ibuff;
        }

        word = configuration.top();
        configuration.pop();

        index = std::stoi(configuration.top());
        configuration.pop();
    }

    std::cout<<word<<std::endl;
    std::cout<<index<<std::endl;
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