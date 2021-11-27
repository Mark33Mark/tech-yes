
const getNews = () => {
    
    fetch('/api/user/key')
        .then(response => response.text() )
        .then( result => renderNews( result ));
};


renderNews = async ( result ) => {
    
    // I can't work out why the data package needs to be JSON.parse'd
    // twice to convert it to an object - but it worked 2nd time!

    let dataPackage = JSON.parse( result );
    const newsFeed = JSON.parse(dataPackage);

    console.log(`News articles = ${newsFeed.articles.length}`);                

    let html = "";
    newsFeed.articles.forEach( myNews );
    function myNews ( news ) {  

            console.log(`${news.title}, \n${news.description}, \n${news.url}, \n${news.urlToImage}`);
            
            html +=` 
            <div class = "card display-flex">
                <div>
                    <img src = "${news.urlToImage}" width="90px" height="100px">
                </div>
                <div>
                    <h4>${news.title}</h4>
                    <div style="font-size:0.9rem">${news.description}</div>
                    <a href="${news.url}" class="news-href" target="_blank"><div class="newslink-anchor">${news.url}</div></a>
                </div>
            </div>
            `;

            const latestArticles = document.getElementById("news-feed");
            latestArticles.innerHTML = html;
    }                             

};

getNews();