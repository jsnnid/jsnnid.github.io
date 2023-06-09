var fs = require("fs");
var exec = require('child_process').exec;


var gitignore_txt = fs.readFileSync('.gitignore').toString()

var gitignore = gitignore_txt.split("\n");
var dict_path = "D:/0/jsnnid.github.io";

var notImg = [];
var img = [];
var imgDirFileSite = {};

gitignore.forEach(element => {
    if (element.indexOf("/wp-content/") > -1) {
        img.push(element);
    } else {
        notImg.push(element);
    }
});


var notImg_text = notImg.join("\n") + "\n";


img.forEach(element => {
    imgDirFileSite[element] = dirFileSize(element.slice(0, -1));
});


main();
function main() {
    console.log("\n\n-----------------------\n\n");
    let fileN = 0;
    for (let u in imgDirFileSite) {
        // console.log(u, imgDirFileSite[u]);

        gitignore_txt = gitignore_txt.replace(u + "\n", "");

        fileN += imgDirFileSite[u];
        delete imgDirFileSite[u];

        if (fileN > 600) {
            break;
        }
    }

    console.log(Object.keys(imgDirFileSite).length, gitignore_txt.length);

    fs.writeFileSync('.gitignore', gitignore_txt);

    exec("git add . && git commit -m '" + fileN + "' && git push", function (error, stdout, stderr) {
        // 获取命令执行的输出
        console.log(stdout);

        setTimeout(function () {
            main();
        }, 2000);
    });


}




// 获取文件夹下总共文件数量
function dirFileSize(path) {
    let thisDirFile = fs.readdirSync(dict_path + path);
    return thisDirFile.length;
}