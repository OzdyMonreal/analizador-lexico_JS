/**
 * 
 * FUNCIONES
 * 
 **/


function eraseText() {
    document.getElementById("text-area").value = "";
}


function getTextArea() {
    var text = document.getElementById("text-area").value;
    return text;
}


function isCharNumber(c) {
    if (/[+-]?([0-9]*[.])?[0-9]+/.test(c) || c == ".")
    return true;
}


function isChar(c) {
    return /[\w]/.test(c)
}


function doubleOperator(aux, actual, resul, operator="Operador") {
    if(aux == actual[0]) {
        actual[0] += aux;
        if (actual[0] == "//") {
            resul.pop();
            comment = 1
        }
        else {
            resul.pop();
            resul.push(`${actual[0]}\t -> Es un ${operator} de ${actual[0].length} caracteres\n`);
        }
    }
    else {
        resul.push(`${aux}\t -> Es un ${operator} de ${aux.length} caracteres\n`);
        actual[0] = aux
    }
}


function comparisonOperator(aux, actual, resul, operator="Operador") {
    if(aux == actual[1]) {
        actual[0] += actual[1];
        resul.pop();
        resul.push(`${actual[0]}\t -> Es un ${operator} de ${actual[0].length} caracteres\n`);
        actual[0] = '';
        actual[1] = '';
    }
    else {
        actual[1] = "=";
        resul.push(`${aux}\t -> Es un ${operator} de ${aux.length} caracteres\n`);
        actual[0] = aux
    }
}


/**
 * 
 * ALFABETO
 * 
**/
var conditionals = new Map([
    ["if", "IF"],
    ["else", "ELSE"],
    ["then", "THEN"]
]);

var loops = new Map([
    ["for", "FOR"],
    ["while", "WHILE"],
]);

var keywords = new Map([
    ["return", "RETURN"],
    ["continue", "CONTINUE"],
    ["void", "VOID"],
]);

var data_types = new Map([
    ["int", "INT"],
    ["float", "FLOAT"],
    ["string", "STRING"],
    ["null", "NULL"]
]);

var functions = new Map([
    ["printf", "PRINTF"],
    ["main", "MAIN"],
])

var comment = 0

/**
 * 
 * FUNCION PRINCIPAL
 * 
**/
function main() {
    var text = getTextArea();
    let aux, resul =[];

    if(text.length !== 0) {
        text = text.split(/[\s\n\r""'']+/);

        for(let i = 0; i <= text.length;i++) {
            aux = text[i];
            let id = ""
            let numero = "";
            let actual_char = [];
            let contador = 0;

            for(let j in aux) {
                contador += 1;

                switch(aux[j]) {
                    // Operadores aritmeticos
                    case "+":
                    case "-":
                    case "/":
                    case "%":
                    case "*":
                        doubleOperator(aux[j], actual_char, resul, 'Operador Aritmetico')
                        break;
                    // Operadores de comparacion
                    case "=":
                    case "<":
                    case ">":
                    case "!":
                        comparisonOperator(aux[j], actual_char, resul, 'Operador de comparación')
                        break;
                    // Operadores logicos
                    case "&":
                    case "|":
                        doubleOperator(aux[j], actual_char, resul, 'Operador lógico')
                        break;
                    // Operador de agrupación
                    case "{":
                    case "}":
                    case "(":
                    case ")":
                    case "[":
                    case "]":
                        resul.push(`${aux[j]}\t -> Es un Operador de Agrupación de ${aux[j].length} caracter\n`);
                        break;
                    case "$":
                    case "^":
                        resul.push(`${aux[j]}\t -> Es un Caracter Especial de ${aux[j].length} caracter\n`);
                        break;

                    default:
                        if (/[a-zA-Z]+/g.test(aux[j])) {
                            id += aux[j]
                            if (/[\W]+/.test(aux[contador]) || aux[contador] == null || /[\d]/.test(aux[contador])) {
                                // Condicionales
                                if(conditionals.get(id)) {
                                    resul.push(`${id}\t -> Sentencia de validación de ${id.length} caracteres\n`);
                                    id = ""
                                }
                                // Bucles    
                                if(loops.get(id)) {
                                    resul.push(`${id}\t -> Sentencia de bucle de ${id.length} caracteres\n`);
                                    id = ""
                                }
                                // Palabra reservadas
                                if(keywords.get(id)) {
                                    resul.push(`${id}\t -> Palabra reservadas de ${id.length} caracteres\n`);
                                    id = ""
                                }
                                // Funciones
                                if(functions.get(id)) {
                                    resul.push(`${id}\t -> Función de ${id.length} caracteres\n`);
                                    id = ""
                                }
                                // ID
                                if(isChar(id)) {
                                    if (comment == 1) {
                                        console.log(id, "Es un comentario")
                                        comment = 0
                                    }
                                    else {
                                        resul.push(`${id}\t -> Es un ID de ${id.length} caracteres\n`);
                                        id = ""
                                    }
                                }
                            }
                        }
                        if (/[+-]?([0-9]*[.])?[0-9]+/.test(aux[j]) || aux[j] == ".") {
                            numero += aux[j]
                            if (/[!"`'#%&,+_:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|-]+/.test(aux[contador]) || aux[contador] == null || /[a-zA-Z]/.test(aux[contador]))
                                if(isCharNumber(numero)) {
                                    if (Number(numero) % 1 == 0) {
                                        resul.push(`${numero}\t -> Es un número entero de ${numero.length} caracteres\n`);
                                        numero = ""
                                    }
                                    else {
                                        resul.push(`${numero}\t -> Es un número real de ${numero.length} caracteres\n`);
                                        numero = ""
                                    }
                                }
                    }
                }
            }
        }
        console.log(resul);
            if(resul.join('').length != 0){
                alert(resul.join(''))
            }
            else
                alert("La alerta está vacía, probablemente hubo un error.")
    } else {
        alert("Por favor introduce texto antes de presionar el botón.");
    }
};