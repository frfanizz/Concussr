from flask import Flask, render_template
from KingDevickTestGenerator import generateTest
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("ho.html")

@app.route("/reading_test.html")
def reading_test():
    t1_lines, t1_solution = test_render(1)
    t2_lines, t2_solution = test_render(2)
    t3_lines, t3_solution = test_render(3)
    return render_template("reading_test.html",
            t1_lines = t1_lines, t1_solution = t1_solution,
            t2_lines = t2_lines, t2_solution = t2_solution,
            t3_lines = t3_lines, t3_solution = t3_solution)

def test_render(ver):
    text, solution = generateTest(testVersion=ver)
    return (text.replace(' ', '\xa0').split('\n'), solution)

if __name__ == '__main__':
    app.run(debug=True)
