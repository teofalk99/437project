

window.onclick = function(event) { // add event listener on window
    // toggles showing dropdown when clicking dropdown buttons
    if (event.target.matches('#dropdownbtn')) {
        document.getElementById("content").classList.toggle("show");
    }
    if (event.target.matches('#dropdownbtn2')) { // check whether click was made outside of dropdown
        document.getElementById("content2").classList.toggle("show");
    }

    // removes dropdown content if click anywhere else but respective dropdown buttons
    if (!event.target.matches('#dropdownbtn')) {
        document.getElementById("content").classList.remove("show");
    }
    if (!event.target.matches('#dropdownbtn2')) {
        document.getElementById("content2").classList.remove("show");
    }
}

// adds div with ingredient (SCRAPPED)
// function submit() {
//     var card = document.createElement("div");
//     card.innerHTML = "Ingredient";
//     document.body.append(card); 
// }

//variables for inputs
const recipename = document.getElementById("recipe_name") 
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
const result_field = document.getElementById('resultlist')
const cuisine = document.getElementById('cuisine')


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
        calories: [cal_min.value, cal_max.value],
        protein: [protein_min.value, protein_max.value],
        carbs: [carb_min.value, carb_max.value],
        fat: [fat_min.value, fat_max.value],
        cooktime: cook_time.value,
        preptime: prep_time.value,
        minrating: rating_min.value,
        skill: skill.value,
        course: course.value,
        cuisine: cuisine.value,
        sort: sort.value
    }

    vals = JSON.stringify(vals)

    let form = new FormData();
    form.append("data", vals)

    console.log('sending data to backend')

    fetch("/submit", {
        method: "POST",
        body: form,
    }).then(response => response.json()).then(data => {

        console.log('received data!')
        display_results(data)

    });


}


//get data back from backend, display list of results
function display_results(data)
{
    result_field.innerHTML = ""
    var res_num = 0
    data.forEach(line => 
        {
            if (res_num == 50)
            {
                return;
            }

            console.log(line)

            contents = ""

            
            for (let i = 0; i < 10; i++) 
            {
                let sz;

                if (i == 0){ sz = 'lg'} else {sz = 'sm'}

                let put;

                if (line[i] == "" || line[i] == "0"){put = 'N/A'}

                else if (i == 2 || i == 3){put = parseInt(line[i])/60}
                
                else {put = line[i]}


                contents += `<div class="col-${sz}" >${put}</div>`;
              }

            console.log(contents)

            $('#resultlist').append(`<li class="list-group-item" >
                                            <div class="row" onclick="searchit('${line[0]}','${line[10]}')">
                                                ${contents}
                                            </div>
                                    </li>`)


            res_num += 1
        })
}

//opens a sick google search for you
function searchit(rec, auth)
{
    window.open(('http://www.google.com/search?q=' + rec + ' recipe ' + auth).replace('&', 'and'), '_blank');
}


//handler to send data to backend
document.getElementById('search').onclick = function(){check_data()}