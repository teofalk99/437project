# {'recipe_name': '', 'calories': ['', ''],
#  'protein': ['', ''], 'carbs': ['', ''],
#   'fat': ['', ''], 'cooktime': '',
#  'preptime': '', 'minrating': '',
#   'skill': 'none', 'course': 'none',
#    'cuisine': 'Brazilian', 'sort': 'none'}

# SELECT title, rating, cookingTime,prepTime, calories, protein, carbs, fat, cusine, skillLevel, author 

def add_conditions(data):
    ipt_flag = False

    clauses = []

    if data['recipe_name']:
        ipt_flag = True
        clauses.append('title LIKE "%%' + data['recipe_name'] + '%%"')
    

    for macro in ['calories', 'protein', 'carbs', 'fat']:

        if data[macro][0]:
            ipt_flag = True
            clauses.append(macro + ' >= ' + data[macro][0])

        if data[macro][1]:
            ipt_flag = True
            clauses.append(macro + ' <= ' + data[macro][1])

    if data['cooktime']:
        ipt_flag = True
        clauses.append('cookingTime <= ' + str(60 * int(data['cooktime'])))

    if data['preptime']:
        ipt_flag = True
        clauses.append('prepTime <= ' + str(60 * int(data['preptime'])))

    if data['minrating']:
        ipt_flag = True
        clauses.append('rating >= ' + data['minrating'])

    if data['skill'] != 'none':
        ipt_flag = True
        clauses.append('skillLevel = "' + data['skill'] + '"')

    if data['course'] != 'none':
        ipt_flag = True
        clauses.append('course = "' + data['course'] +'"')

    if data['cuisine']:
        ipt_flag = True
        clauses.append('cusine = "' + data['cuisine'] + '"')

    sort = ""

    if data['sort'] == 'none':
        sort = ' ORDER BY RAND()'
    else:
        sort = ' ORDER BY ' + data['sort']

        if data['sort'] != 'calories':
            sort += ' DESC'


    return (" WHERE " + " AND ".join(clauses) + sort) if ipt_flag else sort
        

    
