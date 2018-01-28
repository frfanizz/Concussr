import random as rand

# Constant for width of test (in chars)
testWidth = 10
testSpacing = 5
testRows = 8
testColumns = 5

def generateTest(testVersion = 1, fileWriteName = "test.txt") :
    """
    Generate a King-Devick Test
    """
    try :
        # open file stream
        fw = open(fileWriteName, "w")
    except IOError :
        print "Error writing to", fileWriteName
        sys.exit()
    for row in range(testRows) :
        rowLocs = generateRowLocs()
        rowLocs.sort()
        rowLocs = rowLocs[0:-1]
        fw.write(str(rand.randint(0,9)))
        for currPos in range(testWidth) :
            if testVersion == 1 :
                fw.write("-" * testSpacing)
            else :
                fw.write(" " * testSpacing)
            if currPos in rowLocs :
                fw.write(str(rand.randint(0,9)))
            else :
                if testVersion == 1 :
                    fw.write("-")
                else :
                    fw.write(" ")
        if testVersion == 1 :
            fw.write("-" * testSpacing + str(rand.randint(0,9)) + "\n")
        else :
            fw.write(" " * testSpacing + str(rand.randint(0,9)) + "\n")
        if testVersion == 1 or testVersion == 2 :
            fw.write("\n")

def generateRowLocs() :
    rowLocs = [testWidth]
    while len(rowLocs) < testColumns - 1 :
        currLoc = int(testWidth * rand.random())
        if currLoc not in rowLocs :
            rowLocs.append(currLoc)
    return rowLocs
# ex: [3, 5, 8, 10]


# import KingDevickTestGenerator as kd; kd.generateTest(testVersion = 1, fileWriteName = "vers1.txt"); kd.generateTest(testVersion = 2, fileWriteName = "vers2.txt"); kd.generateTest(testVersion = 3, fileWriteName = "vers3.txt")