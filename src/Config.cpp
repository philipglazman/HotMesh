#include "stdafx.h"
#include "config.h"

// Don't forget to comment the function headers.
Config::Config(){};

bool Config::configExists()
{
	m_file.open("config.h");

	if (!m_file) {
		return false;
	}
}
Config::~Config()
{
	m_file.close();
}
// Get the next line from the file.
bool Config::GetNextLine(std::string &a_buff)
{
	// If there is no more data, return false.
	if (m_file.eof()) {
		return false;
	}
	std::getline(m_file, a_buff);

	// Return indicating success.
	return true;
}
void Config::rewind()
{
	// Clean all file flags and go back to the beginning of the file.
	m_file.clear();
	m_file.seekg(0, std::ios::beg);
}