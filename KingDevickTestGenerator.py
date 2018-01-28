import random as rand

# Constant for width of test (in chars)
testWidth = 5
testSpacing = 5
testRows = 8
testColumns = 5

def generateTest(testVersion = 1):
    """
    Generate a King-Devick Test
    """
    output = ""
    for row in range(testRows) :
        rowLocs = generateRowLocs()
        rowLocs.sort()
        rowLocs = rowLocs[0:-1]
        output += str(rand.randint(0,9))
        for currPos in range(testWidth) :
            if testVersion == 1 :
                output += "-" * testSpacing
            else :
                output += " " * testSpacing
            if currPos in rowLocs :
                output += (str(rand.randint(0,9)))
            else :
                if testVersion == 1 :
                    output += "-"
                else :
                    output += " "
        if testVersion == 1 :
            output += "-" * testSpacing + str(rand.randint(0,9)) + "\n"
        else :
            output += " " * testSpacing + str(rand.randint(0,9)) + "\n"
        if testVersion == 1 or testVersion == 2 :
            output += "\n"

    return output

def generateRowLocs() :
    rowLocs = [testWidth]
    while len(rowLocs) < testColumns - 1 :
        currLoc = int(testWidth * rand.random())
        if currLoc not in rowLocs :
            rowLocs.append(currLoc)
    return rowLocs
# ex: [3, 5, 8, 10]


# import KingDevickTestGenerator as kd; kd.generateTest(testVersion = 1, fileWriteName = "vers1.txt"); kd.generateTest(testVersion = 2, fileWriteName = "vers2.txt"); kd.generateTest(testVersion = 3, fileWriteName = "vers3.txt")
