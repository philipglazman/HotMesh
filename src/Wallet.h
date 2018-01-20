/*
Contains core features of wallet. 
Seed creation, Address creation, storage.
*/
#ifndef _WALLET_H      
#define _WALLET_H

#include "stdafx.h"

class Wallet
{
public:
    // creates wallet using user entropy (256 bits)
    Wallet();

    // creates wallet from 12 phrase mneumonic phrases
    Wallet(const bc::wallet::word_list a_mneomnicSeed);

    ~Wallet() {}

    void createMnemonicCodeWords(const std::string& a_passphrase);

    bc::wallet::hd_private childPrivateKey(int index);

    bc::wallet::hd_public childPublicKey(int index);

    bc::wallet::payment_address childAddress(int index);

    void showPrivateKey();

    void showChildPrivateKey(int index);

    // Show bitcoin address at index.
    void showAddress(int index);

    //void showNextAddress();

    // Show all addresses.
    void showAllAddresses();

    // Show mnemonic codes.
    void showMnemonicCodes();

    // Debug function to get all keys.
    void showKeys();
    
private:
    bc::data_chunk m_entropy;
    bc::data_chunk m_seed;
    bc::wallet::word_list m_mnemonic;
    bc::wallet::hd_private m_privateKey;
    bc::wallet::hd_public m_publicKey;

    // Cursor to latest index.
    // TODO replace index with m_index.
    int m_index = 1;
};

#endif