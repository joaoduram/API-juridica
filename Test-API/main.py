import requests
import json
import pandas as pd


#LISTANDO TODOS OS ARTIGOS POR ORDEM DE PUBLICAÇÃO
def list_all():
    response = requests.get('http://localhost:3000/articles')
    return response.json()

#FILTRAR POR CATEGORIA
def filter_category(category):
    response = requests.get('http://localhost:3000/articles/filterByCategory/'+category)
    return response.json()

#BUSCAR POR TERMO CHAVE NO TITULO OU CATEGORIA
def search_term(termo):
    response = requests.get('http://localhost:3000/articles/searchByTerm/'+termo)
    return response.json()

#QTD POR CATEGORIA
def getAllByCategory():
    categorys = {}
    articles = list_all()
    for article in articles:
        if "category" in article:
            category = article["category"]
            if category not in categorys:
                filtered_articles = filter_category(category)
                qtd = len(filtered_articles)
                categorys[category] = qtd
                words = sum([len(article['content'].split()) for article in filtered_articles])
                mean_words = words / qtd
                categorys[category] = {"qtd": qtd, "media_palavras": mean_words}

    df = pd.DataFrame([(k, v['qtd'], v['media_palavras']) for k, v in categorys.items()],
                      columns=['categoria', 'qtd', 'media_palavras'])
    df.to_csv('category.csv', index=False)

#QTD POR AUTOR
def getByAuthor():
    authors = {}
    articles = list_all()
    for article in articles:
        if "author" in article:
            author = article["author"]
            content = article["content"]
            qtd = len(content.split())
            if author not in authors:
                authors[author] = {"count": 1, "word_count": qtd}
            else:
                authors[author]["count"]+=1
                authors[author]["word_count"] += qtd
    for author in authors:
        authors[author]["word_count"] = authors[author]["word_count"]/authors[author]["count"]
        df = pd.DataFrame([(k, v['count'], v['word_count']) for k, v in authors.items()],
                          columns=['autor', 'qtd', 'media_palavras'])
        df.to_csv('author.csv', index=False)

def main():
    getAllByCategory()
    getByAuthor()

if __name__ == '__main__':
    main