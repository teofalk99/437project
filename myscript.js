function myFunction() {
    document.getElementById("content").classList.toggle("show");
}

const recipe_name = document.getElementById("recipe_name") 
const cal_min = document.getElementById('cal_min') 
const cal_max = document.getElementById('cal_max') 
const protein_min = document.getElementById('protein_min') 
const protein_max = document.getElementById('protein_max') 
const carb_min = document.getElementById('carb_min') 
const carb_max = document.getElementById('carb_max') 
const fat_min = document.getElementById('fat_min') 
const fat_max = document.getElementById('fat_max') 
const cook_time = document.getElementById('cook_time') 
const prep_time = document.getElementById('prep_time') 
const rating_min = document.getElementById('rating_min') 
const skill = document.getElementById('skill')
const course = document.getElementById('course')
const sort = document.getElementById('sort')
const error_field = document.getElementById('error')


function check_data()
{
    //check that inputs are proper
    errors = []
    if (rating_min.value && parseInt(rating_min.value) > 100)
    {
        errors.push("Minimum rating too high")
    }
    if ((cal_min.value && cal_max.value) && parseInt(cal_min.value) > parseInt(cal_max.value))
    {
        errors.push("Minimum calories cannot be higher than maximum")
    }
    if ((protein_min.value && protein_max.value) && parseInt(protein_min.value) > parseInt(protein_max.value))
    {
        errors.push("Minimum protein cannot be higher than maximum")
    }
    if ((carb_min.value && carb_max.value) && parseInt(carb_min.value) > parseInt(carb_max.value))
    {
        errors.push("Minimum carbohydrates cannot be higher than maximum")
    }
    if ((fat_min.value && fat_max.value) && parseInt(fat_min.value) > parseInt(fat_max.value))
    {
        errors.push("Minimum fat cannot be higher than maximum")
    }

    if (errors.length > 0)
    {
        error_message = "Please fix following errors: "

        errors.forEach(m => {
            error_message += (m + " - ")
        });


        error_field.innerHTML = error_message
    }
    else
    {
        error_field.innerHTML = ""
        send_data();
    }
}


function send_data()
{

    var vals = {
        recipe_name: recipe_name.value,
        cals: [cal_min.value, cal_max.value],
        protein: [protein_min.value, protein_max.value],
        carb: [carb_min.value, carb_max.value],
        fat: [fat_min.value, fat_max.value],
        cooktime: cook_time.value,
        preptime: prep_time.value,
        minrating: rating_min.value,
        skill: skill.value,
        course: course.value,
        sort: sort.value
    }

    alert(JSON.stringify(vals))
}



document.getElementById('search').onclick = function(){check_data()}