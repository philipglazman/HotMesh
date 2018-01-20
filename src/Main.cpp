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

    Wallet wallet;
    Network network;
    
    bc::wallet::payment_address addy("mnrnjVFimDFrNkszzMtecr4yrMKmEuMRbv");
    network.addressPaid(addy);
}