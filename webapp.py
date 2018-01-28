from flask import Flask, render_template
from KingDevickTestGenerator import generateTest
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("reading_test.html", reading_lines=generateTest().split('\n'))

if __name__ == '__main__':
    app.run(debug=True)
