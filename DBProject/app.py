########  imports  ##########
from flask import Flask, render_template, request
import mysql.connector
import json

app = Flask(__name__)

 
mydb = mysql.connector.connect(
  host= 'localhost',
  user= 'root',
  password='Imaluigi99',
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
    print("RECEIVED ???")

    data = json.loads(request.form.get('data'))
    
    mycursor.execute("SELECT title, rating, cookingTime,prepTime, calories, carbs, protein, fat, cusine, skillLevel, author FROM fullRecipes WHERE title LIKE '%%pasta%%';")
    myresult = mycursor.fetchall()

    print(myresult)
    
    return json.dumps(myresult)



  
if __name__ == "__main__":
    app.run(host="localhost", port=8001, debug=True)
