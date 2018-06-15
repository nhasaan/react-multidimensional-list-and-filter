import React, { Component } from 'react';
import categories from './categories.json';
import './App.css';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: categories,
      categoryTree: []
    };
  }

  listToTree(categories) {
    let hashTable = Object.create(null)
    categories.forEach(aData => hashTable[aData.Id] = { ...aData, childNodes: [] })
    let dataTree = []
    categories.forEach(aData => {
      if (aData.ParentCategoryId) hashTable[aData.ParentCategoryId].childNodes.push(hashTable[aData.Id])
      else dataTree.push(hashTable[aData.Id])
    })
    return dataTree
  }

  // hasSomeParentTheClass(element, classname) {
  //   if (element.className.split(' ').indexOf(classname) >= 0) return true;
  //   return element.parentNode && hasSomeParentTheClass(element.parentNode, classname);
  // }

  makeParentsVisible(element) {
    element.style.display = "";
    if (element.closest("li") !== null) {
      this.makeParentsVisible(element.closest("li"));
    }
  }

  filterByTextInput() {
    // console.log('handler');
    var input, filter, li, p, i, j, liShow;
    input = document.getElementById("filterInput");
    filter = input.value.toUpperCase();
    li = document.querySelectorAll(".categoryWrap > ul li");

    for (i = 0; i < li.length; i++) {
      // console.log(i);
      p = li[i].getElementsByTagName("p")[0];
      if (p.innerHTML.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
        li[i].classList.add("show");
      } else {
        li[i].style.display = "none";
        li[i].classList.remove("show");
      }
    }

    liShow = document.querySelectorAll(".categoryWrap > ul li.show");
    // console.log(liShow);

    for (j = 0; j < liShow.length; j++) {
      // console.log(liShow[i].closest("li"));
      // console.log(liShow[j].closest("li"));
      liShow[j].closest("ul").parentNode.childNodes[0].style.display = "";
      liShow[j].closest("ul").parentNode.parentNode.childNodes[0].style.display = "";
      // this.makeParentsVisible(liShow[i].closest("li"));
    }
  }

  render() {
    let categoryTree = this.listToTree(categories);
    // console.log(categoryDataTree)

    const categoryItems = categoryTree.map((item, i) =>
      <ul className="ulWrap" key={item.Id}>
        <li key={item.Id}>
          <p>{item.Name}</p>
        </li>
        {Object.keys(item.childNodes).map((child, ci) =>
          <ul className="childUlWrap" key={item.childNodes[child].Id + ci}>
            <li key={item.childNodes[child].Id}>
              <p>{item.childNodes[child].Name}</p>
            </li>

            {Object.keys(item.childNodes[child].childNodes).map((subChild, sci) =>
              <ul className="childUlWrap" key={item.childNodes[child].childNodes[subChild].Id + ci}>
                <li key={item.childNodes[child].childNodes[subChild].Id}>
                  <p>{item.childNodes[child].childNodes[subChild].Name}</p>
                </li>
                {Object.keys(item.childNodes[child].childNodes[subChild].childNodes).map((sub, si) =>
                  <ul className="childUlWrap" key={item.childNodes[child].childNodes[subChild].childNodes[sub].Id + ci}>
                    <li key={item.childNodes[child].childNodes[subChild].childNodes[sub].Id}>
                      <p>{item.childNodes[child].childNodes[subChild].childNodes[sub].Name}</p>
                    </li>
                  </ul>
                )}
              </ul>
            )}
          </ul>
        )}
      </ul>
    );

    return (
      <div className="Category">
        <header className="Category-header">
          <h1 className="Category-title">List of Category</h1>
        </header>
        <div className="categoryWrap">
          <p><input onKeyUp={this.filterByTextInput} className="searchTxt" type="text" placeholder="Type to search within the category list" id="filterInput" /></p>
          {categoryItems}
        </div>
      </div>
    );
  }
}

export default Category;
