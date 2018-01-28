from flask import Flask, render_template
from KingDevickTestGenerator import generateTest
app = Flask(__name__)

@app.route("/")
def index():
    t1 = test_render(1)
    t2 = test_render(2)
    return render_template("reading_test.html", test_1_lines=t1, test_2_lines=t2)

def test_render(ver):
    return generateTest(testVersion=ver)[0].replace(' ', '\xa0').split('\n')

if __name__ == '__main__':
    app.run(debug=True)
