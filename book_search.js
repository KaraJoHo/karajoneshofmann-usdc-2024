/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/* NOTEs: - function will take the search term(string) and the object with scanned text
        - This object is nested and I want to get to the content section of the object
        - I can use a for loop to iterate through each layer or use ForEach to get in to the object then to the content
        - Once I am looking at the content, I want to see if the searched term matches any part of the text
        - If I find a match, I want to return an object with the search term and the results in a list
* /

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {

    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };

     /* First iterate through each book in the input object
        Then iterate through each object in the content of each book
        Only looking at the "Text" key to see if the search term appears in the value
        If it does, push the output information to the results array */
     /* WORKING FOR FIRST 2 TESTS
     for (const book of scannedTextObj) {
         for (const content of book["Content"]) {
             if (content["Text"].includes(searchTerm)) {
                 result["Results"].push({
                     "ISBN": book["ISBN"],
                     "Page": content["Page"],
                     "Line": content["Line"]
                 })
             }
         }
     } - */

     /* Next, I want to make sure that my solution is not matching substrings
     I don't want the search term "found" to match "profound" in line 9
     and to avoid special characters like dashes
     regex \ and word boundary will let me match just the word in the search term to something in the
     lines of content(no substrings), if they exist while also ignoring the special characters..
     make a regex to test the search term to match just the term provided*/

     for (const book of scannedTextObj) {
         for (const content of book["Content"]) {
            const regex = new RegExp(`\\b${searchTerm}\\b`)

             if ((regex.test(content["Text"]))) {
                 result["Results"].push({
                     "ISBN": book["ISBN"],
                     "Page": content["Page"],
                     "Line": content["Line"]
                 })
            }
         }
     }
    
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]

/* Another input for edge cases */

const twentyLeaguesInEdgeCases = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 40,
                "Line": 12,
                "Text": "Can't stop won't stop. Probably not a line from the book"
            },
            {
                "Page": 100,
                "Line": 50,
                "Text": "Hello world"
            },
        ] 
    }
]
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*Output object for capitol "The" */
const thirtyLeaguesOut = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}

/*Output object for substring, don't want it to return "profound in line 9" */
const substringLeaguesOut = {
    "SearchTerm": "found",
    "Results": []
}

/* Output object for searching a word with a dash on it: "dark-" in line 8 */
const dashOut = {
    "SearchTerm": "dark",
    "Results": [
    {
        "ISBN": "9780000528531",
        "Page": 31,
        "Line": 8  
    }
    ]
}

/* Output object for special characters like apostrophes */

const specialCharOut = {
    "SearchTerm": "Can't",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 40,
            "Line": 12
        }
    ]
}

/* Output object for an empty string search, and provide more than one result in array */
const emptyString = {
    "SearchTerm": "",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 40,
            "Line": 12
        },
        {
            "ISBN": "9780000528531",
            "Page": 100,
            "Line": 50 
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/* Add Tests */

/* Test for a capital "The". Lines should be different */
const testForCapital = findSearchTermInBooks("The", twentyLeaguesIn);
if (JSON.stringify(thirtyLeaguesOut) === JSON.stringify(testForCapital)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", thirtyLeaguesOut);
    console.log("Received:", testForCapital);
}

/* Test substring, return nothing for a substring */

const testSubstring = findSearchTermInBooks("found", twentyLeaguesIn);
if (JSON.stringify(substringLeaguesOut) === JSON.stringify(testSubstring)) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", substringLeaguesOut);
    console.log("Received:", testSubstring);
}

/* Test for special characters. Dashes here, "dark" should still be found without searching it with the dash */

const testDash = findSearchTermInBooks("dark", twentyLeaguesIn)
if (JSON.stringify(dashOut) === JSON.stringify(testDash)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", dashOut);
    console.log("Received:", testDash);
}

/* Test for special characters. Including apostrophe.   */

const testSpecialCharacters = findSearchTermInBooks("Can't", twentyLeaguesInEdgeCases)
if (JSON.stringify(specialCharOut) === JSON.stringify(testSpecialCharacters)) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", specialCharOut);
    console.log("Received:", testSpecialCharacters);
}

/* Test for empty string. Function can still search for strings without words */

const testEmptyString = findSearchTermInBooks("", twentyLeaguesInEdgeCases)
if (JSON.stringify(emptyString) === JSON.stringify(testEmptyString)) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", emptyString);
    console.log("Received:", testEmptyString);
}




