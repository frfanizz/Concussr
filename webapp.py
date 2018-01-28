from flask import Flask, render_template
from KingDevickTestGenerator import generateTest
app = Flask(__name__)

@app.route("/")
def index():
    t1_lines, t1_solution = test_render(1)
    t2_lines, t2_solution = test_render(2)
    return render_template("reading_test.html",
            t1_lines = t1_lines, t1_solution = t1_solution,
            t2_lines = t2_lines, t2_solution = t2_solution)

def test_render(ver):
    text, solution = generateTest(testVersion=ver)
    return (text.replace(' ', '\xa0').split('\n'), solution)

if __name__ == '__main__':
    app.run(debug=True)
