const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

function add(node, data) {
  if (!node) return new Node(data);
  if (node.data === data) return node;

  if (data < node.data) node.left = add(node.left, data);
  else node.right = add(node.right, data);

  return node;
}

function remove(node, data) {
  if (!node) return null;

  if (data < node.data) {
    node.left = remove(node.left, data);
    return node;
  } else if (data > node.data) {
    node.right = remove(node.right, data);
    return node;
  } else {
    if (!node.left) {
      return node.right;
    } else if (!node.right) {
      return node.left;
    }

    let temporary = node.right;
    while (temporary.left) {
      temporary = temporary.left;
    }

    node.data = temporary.data;
    node.right = remove(node.right, temporary.data);
    return node;
  }
}

function search(node, data) {
  return !node ? false :
    node.data === data ? true :
      data < node.data
        ? search(node.left, data)
        : search(node.right, data);
}

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }
  root() {
    return this.rootNode;
  }
  add(data) {
    this.rootNode = add(this.rootNode, data);
  }
  has(data) {
    return search(this.rootNode, data);
  }
  find(data) {
    return this.findNode(this.rootNode, data);
  }
  findNode(node, data) {
    return (node === null) ? null :
      (data < node.data) ? this.findNode(node.left, data) :
        (data > node.data) ? this.findNode(node.right, data) :
          node;
  }
  remove(data) {
    this.rootNode = remove(this.rootNode, data);
  }

  min() {
    if (!this.rootNode) {
      return;
    }

    let node = this.rootNode;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this.rootNode) return;

    let node = this.rootNode;
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};