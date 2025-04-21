function writeMenus() {

    topMenus = {
        "Accueil" : "../Index2.html",
        //"Technotes": "/~mountaz/Ens/Ihm/Technotes/",
        "Videos": "/~mountaz/Ens/Ihm/Videos/",
        "Biblio": "/~mountaz/Ens/Ihm/Papers/",
        "Cours": "/~mountaz/Ens/Ihm/Cours/"

    };

    document.write("<div id=\"menu\">\n<ul>\n<li style=\"border-right: 1px solid #d0d0d0;\">\n");
    for(var title in topMenus){
        document.write("<li style=\"border-right: 1px solid #d0d0d0;\"><a href=\""+topMenus[title]+"\">" + title + "</a>");
    };
    document.write("</ul>\n</div>");
}


