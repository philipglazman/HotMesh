#include "stdafx.h"
#include "Wallet.h"
#include "Error.h"

/**/
/*
DESCRIPTION
Constructor
*/
/**/
Wallet::Wallet()
{
    std::string passphrase = "test";
    createMnemonicCodeWords(passphrase);
}

/**/
/*
DESCRIPTION
Generate wallet using 12-word mnemonic code words.
*/
/**/
Wallet::Wallet(const bc::wallet::word_list a_mnemonicSeed)
{
    m_seed = bc::to_chunk(bc::wallet::decode_mnemonic(a_mnemonicSeed));
    m_mnemonic = a_mnemonicSeed;
    m_privateKey = bc::wallet::hd_private(m_seed);
    m_publicKey = m_privateKey.to_public();
}

/**/
/*
DESCRIPTION
Creates Mnemonic Code Words following BIP-39 Standard
*/
/**/
void
Wallet::createMnemonicCodeWords(const std::string& a_passphrase)
{
    // Create vector<uint8_t> to store 128 bits.
    std::vector<std::uint8_t> m_entropy(16); 

    // Create entropy of 128 bits. 
    bc::pseudo_random_fill(m_entropy);

    // Create mnemonic words. 
    m_mnemonic = bc::wallet::create_mnemonic(m_entropy);

    // Create 512-bit seed using mnemonic code wirds and a_passphrase as Salt.
    // TODO - add ICU to library dependency to make it work with passphrase
    m_seed = bc::to_chunk(bc::wallet::decode_mnemonic(m_mnemonic));

    // Create master 256-bit Private Key.
    m_privateKey = bc::wallet::hd_private(m_seed);

    // Create master 264-bit Public Key.
    m_publicKey = m_privateKey.to_public(); 
    
}

bc::wallet::hd_private Wallet::childPrivateKey(int index)
{
    return m_privateKey.derive_private(index);
}

bc::wallet::hd_public Wallet::childPublicKey(int index)
{
    return m_publicKey.derive_public(index);
}

bc::wallet::payment_address Wallet::childAddress(int index)
{
    return bc::wallet::ec_public(childPublicKey(index).point()).to_payment_address();
}

void Wallet::showPrivateKey()
{
    std::cout << "priv key " << m_privateKey.encoded() << std::endl;
}

void Wallet::showChildPrivateKey(int index)
{
    std::cout << "child priv key " << childPrivateKey(index).encoded() << std::endl;
}

void Wallet::showAddress(int index)
{
    std::cout << "first address " << childAddress(index).encoded() << std::endl;
}

// void showNextAddress()
// {
//     std::cout << "Next available address " << childAddress(1).encoded() << std::endl;
// }

void Wallet::showAllAddresses()
{
    //TODO cycle thru all addresses
    std::cout << "to do" << std::endl;
}

void Wallet::showMnemonicCodes()
{
    if(bc::wallet::validate_mnemonic(m_mnemonic))
    {
        std::string mnemonicString = bc::join(m_mnemonic);
        std::cout << "\n" << mnemonicString << std::endl;
 
    }else{
        std::cout << "mnemonic invalid!" << std::endl;
    }
}

void Wallet::showKeys()
{
    showMnemonicCodes();
    showPrivateKey();
    showChildPrivateKey(1);
    showAddress(1);
}