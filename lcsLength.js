// Longest common subsequence length
function lcsLength(trial, actual) {
    var s,i,j,m,n,
        lcs = [], row = [], c = [],
        left, diag, latch;
    //make sure shorter string is the column string
    if (trial < actual) {
        s = trial;
        trial = actual;
        actual = s;
    }
    m = trial.length;
    n = actual.length;
    //build the dynamic programming table
    for (j=0; j<n; j++) {
        row[j] = 0;
    }
    for (i=0; i<m; i++) {
        c[i] = row = row.slice();
        for (diag = 0, j = 0; j < n; j++, diag = latch) {
            latch = row[j];
            if(trial[i] == actual[j]) {
                row[j] = diag+1;
            } else {
                left = row[j-1] || 0;
                if (left>row[j]) {
                    row[j] = left;
                }
            }
        }
    }
    return row[--j];
}
// TODO: test