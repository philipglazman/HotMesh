/*
*   Implementation of the Error class.
*/

#include "stdafx.h"
#include "Error.h"

// Initializes error reports.

std::queue<std::string> Error::m_ErrorMsgs;


/**/
/*
DESCRIPTION
This function empties the error queue in order to remove any junk.
*/
/**/
void
Error::InitErrorReporting()
{
	while (!m_ErrorMsgs.empty()) m_ErrorMsgs.pop();
}

/**/
/*
DESCRIPTION
This function pushes a string error message to the queue.
*/
/**/
void
Error::RecordError(std::string &a_emsg)
{
	m_ErrorMsgs.push(a_emsg);
}

/**/
/*
DESCRIPTION
This function outputs any error messages in the queue.
*/
/**/
void
Error::DisplayErrors()
{	
	// While there are any error messages, print them to the screen.
	while (!m_ErrorMsgs.empty())
	{
		std::cout << std::setw(15) << std::right << m_ErrorMsgs.front() << std::endl;
		m_ErrorMsgs.pop();
	}
}