function add_field(){
            var x = document.getElementById("fset");

            // Create an input field to insert
            var new_field = document.createElement("input");

            // Set input field data type to text
            new_fied.setAttribute("type", "text");

            // Set input field name
            new_field.setAttribute("name", "milestones");

            // Select last position to insert element 
            var pos = x.childElementCount;

            // Insert element
            x.insertBefore(new_field, x.childNodes[pos]);
        }


module.exprots = add_field;