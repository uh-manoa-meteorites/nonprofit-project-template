import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import faker from 'faker';
import { SpecialSkills } from './SpecialSkillCollection';
import {
  defineTestVolunteer,
  withLoggedInUser,
  withSubscriptions,
} from '../../test-utilities/test-utilities';
import { defineMethod, updateMethod, removeItMethod } from '../base/BaseCollection.methods';

/* eslint prefer-arrow-callback: "off",  no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isClient) {
  describe('SpecialSkillsCollection Meteor Methods', function testSuite() {
    it('Can define, update, and removeIt', async function test1() {
      const { username, password } = await defineTestVolunteer.callPromise();
      await withLoggedInUser({ username, password });
      await withSubscriptions();
      const collectionName = SpecialSkills.getCollectionName();
      const definitionData = {};
      definitionData.name = faker.lorem.words();
      // console.log(collectionName, definitionData);
      const docID = await defineMethod.callPromise({ collectionName, definitionData });
      expect(SpecialSkills.isDefined(docID)).to.be.true;
      let doc = SpecialSkills.findDoc(docID);
      expect(doc.name).to.equal(definitionData.name);
      const updateData = {};
      updateData.id = docID;
      updateData.name = faker.lorem.words();
      await updateMethod.callPromise({ collectionName, updateData });
      doc = SpecialSkills.findDoc(docID);
      expect(doc.name).to.equal(updateData.name);
      await removeItMethod.callPromise({ collectionName, instance: docID });
      expect(SpecialSkills.isDefined(docID)).to.be.false;
      Meteor.logout();
    });
  });
}
