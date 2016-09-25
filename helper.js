function compileAndLinkShaders(vertexShaderId, fragmentShaderId) {
    // An object to which shader objects can be attached:
    var shaderProgram = gl.createProgram();
    var vertexShader = createShaderObject(gl.VERTEX_SHADER, vertexShaderId);
    var fragmentShader = createShaderObject(gl.FRAGMENT_SHADER, fragmentShaderId);

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }
    return shaderProgram;
}

/*
    Creates and compiles a shader object from shader code found in DOM node.
    shaderType: gl.VERTEX_SHADER or gl.FRAGMENT_SHADER,
    domId: id of DOM node with shader script
*/
function createShaderObject(shaderType, domId) {
    var shader = gl.createShader(shaderType);
    var shaderScript = document.getElementById(domId);
    var str = shaderScript.text;
    gl.shaderSource(shader, str);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}

function uniformMatrix(shaderProgram, name) {
    var loc = gl.getUniformLocation(shaderProgram, name);
    return function (matrix) {
        gl.uniformMatrix4fv(loc, false, matrix);
    }
}

/**
* Creates a vertex buffer from the given data.
*/
function createVertexBuffer(data) {
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    return buffer;
}

/**
* Creates an index buffer from the given data.
*/
function createIndexBuffer(data) {
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
    return buffer;
}


function handleTextureLoaded(image, texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    //gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
}


function cube() {
    var vertices = [];
    for (var iz = -1; iz <= 1; iz = iz + 2) {
        for (var iy = -1; iy <= 1; iy = iy + 2) {
            for (var ix = -1; ix <= 1; ix = ix + 2) {
                vertices.push(ix); vertices.push(iy); vertices.push(iz);
            }
        }
    }

    var topIndices = [];

    return { vertices: vertices };
}