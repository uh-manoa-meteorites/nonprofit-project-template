import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const volSkillPublications = {
  current: 'currUserSkill',
  all: 'allUserSkill',
};

class VolunteerSkillCollection extends BaseCollection {
  constructor() {
    super('VolunteerSkill', new SimpleSchema({
      volunteerID: SimpleSchema.RegEx.Id,
      skillID: SimpleSchema.RegEx.Id,
    }));
  }

  /**
   * Define a link between a volunteer and a skill based on their ID
   * @param volunteerID the volunteer ID
   * @param skillID the skill ID
   * @return {String} the docID of the new document.
   */
  define({ volunteerID, skillID }) {
    const docID = this._collection.insert({
      volunteerID,
      skillID,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param volunteerID the volunteer ID (optional)
   * @param skillID the interest ID (optional)
   */
  update(docID, { volunteerID, skillID }) {
    const updateData = {};
    if (volunteerID) {
      updateData.volunteerID = volunteerID;
    }
    if (skillID) {
      updateData.skillID = skillID;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER, ROLE.VOLUNTEER, ROLE.ORGANIZATION]);
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the volunteerProfile associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(volSkillPublications.current, function publish() {
        if (this.userId) {
          return instance._collection.find({ volunteerID: this.userId });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(volSkillPublications.all, function publish() {
        // add role use if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for volunteer profile by the current user.
   */
  subscribeCurr() {
    if (Meteor.isClient) {
      return Meteor.subscribe(volSkillPublications.current);
    }
    return null;
  }

  /**
   * Subscription method for subscribing all profile
   * It subscribes to the entire collection.
   */
  subscribe() {
    if (Meteor.isClient) {
      return Meteor.subscribe(volSkillPublications.all);
    }
    return null;
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{ name, description }}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const volunteerID = doc.volunteerID;
    const skillID = doc.skillID;
    return { volunteerID, skillID };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const VolunteerSkill = new VolunteerSkillCollection();
