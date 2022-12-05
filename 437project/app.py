########  imports  ##########
from flask import Flask, render_template, request
import mysql.connector
import json

app = Flask(__name__)

import secretkeys
import helpers

 
mydb = mysql.connector.connect(
  host= 'localhost',
  user= 'root',
  password=secretkeys.keys['password'],
  database='Food'
)


mycursor = mydb.cursor()


@app.route("/")
def hello():
    print('launched site')
    return render_template('index.html')

@app.route("/submit", methods=["POST"])
def search():
    #QUERY DATABASE HERE, RETURN RESULTS
    data = json.loads(request.form.get('data'))

    querybase = "SELECT title, rating, cookingTime,prepTime, calories, protein, carbs, fat, cusine, skillLevel, author FROM recipeStrings NATURAL JOIN recipeMacros NATURAL JOIN recipePrep"
    
    querybase += helpers.add_conditions(data)

    print(querybase)


    mycursor.execute(querybase + ';')


    myresult = mycursor.fetchall()
    
    return json.dumps(myresult)



  
if __name__ == "__main__":
    app.run(host="localhost", port=8001, debug=True)
