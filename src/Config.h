/*
Reads config.txt file.
*/
#ifndef _CONFIG_H  // This is the way that multiple inclusions are defended against often used in UNIX
#define _CONFIG_H

#include "stdafx.h"

class Config {

public:

	// Opens the file.
	Config();

	// Closes the file.
	~Config();

	// Check if file exists.
	bool configExists();

	// Get the next line from the source file.
	bool GetNextLine(std::string &a_buff);

	// Put the file pointer back to the beginning of the file.
	void rewind();

private:
    // Source file object.
	std::ifstream m_file;
};
#endif