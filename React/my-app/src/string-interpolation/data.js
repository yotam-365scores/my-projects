import { BehaviorSubject, combineLatest } from "rxjs";
import { initIndex } from "../common";
import { map } from "rxjs/operators";
import _ from "lodash";

/* export const baseData = {
  username: `Dan`,
  user: { name: `some dan` },
}; */

export const baseDataArr1 = [
  { name: "username", value: "Dan" },
  { name: "user.name", value: "some Dan" },
];

export const baseDataArr = [
    {
      "name": "base-branch",
      "value": "base"
    },
    {
      "name": "new-branch",
      "value": "new"
    }
  ]
const defaultItem = {
  title: `long`,
  template: `{user.name}: Welcome back, {username}!`,
  //data: {username: `not Dan`, reason: `because it's will Object.assign and override the baseData`}
};

export const arrTemplates1 = [
  defaultItem,
  {
    title: `mini`,
    template: `{username}: hi {firstName}`,
    data: [{ name: "firstName", value: "some firstName" }],
  },
];

export const arrTemplates = [{
    "title": "long",
    "template": `git checkout {base-branch} // move to branch\n    git pull\n    git checkout {new-branch} // move to branch\n    git pull\n    git merge {base-branch} // VS visual merge. will see conflicts, resolve them locally\n    git status // check resolved conflicts\n    git merge --continue // git merge --abort will stop merge prosess and let you do reset to base.\n    git push origin HEAD\n`
  }]