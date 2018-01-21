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
    std::string words;
    std::string index;
    int int_index;

    //config does not exist.
    std::ifstream file("src/config.txt");
    
    //If config file does not exist, make new wallet.
	if (!file) {
		Wallet wallet;
        Network network;
        switch(atoi(argv[1]))
        {
            // Get next address of wallet.
            case 1:
                std::cout << wallet.showNextAddress() << std::endl;
                break;
            // Confirm if address is paid. 
            case 2:
                bc::wallet::payment_address addy(wallet.showNextAddress());
                std::cout << network.addressPaid(addy) << std::endl;
                break;
        }
	}
    // If config is present, use config settings. 
    else
    {
        std::string str; 

        while (std::getline(file, str))
        {
            configuration.push(str);
        }

        index = configuration.top();
        configuration.pop();

        words = configuration.top();
        configuration.pop();

        bc::wallet::word_list mnemonicSeedList = bc::split(words);
        if(bc::wallet::validate_mnemonic(mnemonicSeedList))
        {
            Wallet wallet(mnemonicSeedList);
            Network network;

            switch(atoi(argv[1]))
            {
                // Get next address of wallet.
                case 1:
                    int_index=std::stoi(index);
                    wallet.setIndex(int_index);
                    std::cout << wallet.showNextAddress() << std::endl;
                    break;
                // Confirm if address is paid. 
                case 2:
                    int_index=std::stoi(index);
                    wallet.setIndex(int_index);
                    bc::wallet::payment_address addy(wallet.showNextAddress());
                    std::cout << network.addressPaid(addy) << std::endl;
                    break;
            }
            //wallet.setIndex(int_index++);
        }
    
        //Wallet wallet(word);
    }
}