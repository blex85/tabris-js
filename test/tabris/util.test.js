import {expect} from '../test';
import {extend, pick, omit, clone, extendPrototype} from '../../src/tabris/util';

describe('util', function() {

  describe('extend', function() {

    it('copies properties of all source objects into target object', function() {
      let target = {a: 1, b: 1};

      extend(target, {b: 2, c: 2}, {c: 3});

      expect(target).to.eql({a: 1, b: 2, c: 3});
    });

    it('returns target object', function() {
      let object = {};

      let result = extend(object, {a: 1});

      expect(result).to.equal(object);
    });

  });

  describe('pick', function() {

    it('returns a copy', function() {
      let original = {a: 1};

      let result = pick(original, ['a']);

      expect(result).not.to.equal(original);
    });

    it('copies all properties that are in the list', function() {
      let result = pick({a: 1, b: 2, c: 3}, ['a', 'c', 'x']);

      expect(result).to.eql({a: 1, c: 3});
    });

  });

  describe('omit', function() {

    it('returns a copy', function() {
      let original = {a: 1};

      let result = omit(original, ['b']);

      expect(result).not.to.equal(original);
    });

    it('copies all properties that are not in the list', function() {
      let result = omit({a: 1, b: 2, c: 3}, ['a', 'c', 'x']);

      expect(result).to.eql({b: 2});
    });

  });

  describe('clone', function() {

    it('returns a copy of object', function() {
      let original = {a: 1};

      let result = clone(original);

      expect(result).not.to.equal(original);
    });

    it('copies all properties', function() {
      let result = clone({a: 1, b: 2});

      expect(result).to.eql({a: 1, b: 2});
    });

  });

  describe('extendPrototype', function() {

    let Class1, Class2;

    beforeEach(function() {
      Class1 = function() {};
      Class2 = function() {};
    });

    it('returns object with source function prototype as prototype', function() {
      Class1.prototype = {a: 1};
      let object = extendPrototype(Class1, {});

      expect(object.a).to.equal(1);
      expect(object.hasOwnProperty('a')).to.be.not.ok;
    });

    it('returns object with target object properties', function() {
      let object = extendPrototype(function() {}, {a: 1});

      expect(object.a).to.equal(1);
      expect(object.hasOwnProperty('a')).to.be.ok;
    });

    it('works with instanceof', function() {

      Class2.prototype = extendPrototype(Class1, {});
      let object = new Class2();

      expect(object instanceof Class2).to.be.ok;
      expect(object instanceof Class1).to.be.ok;
    });

  });

});
