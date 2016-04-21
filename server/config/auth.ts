import { Request, Response } from "express";
import * as _ from 'lodash';

interface AuthOption {
  loginUrl?: string;
  ignorePatterns?: string[];
}

const auth = (opts: AuthOption = {}) => {
  opts = _.assign<AuthOption, AuthOption>({ loginUrl: "/", ignorePatterns: [] }, opts);
  return (req: Request, res: Response, next) => {
    if (req.url === opts.loginUrl
      || matchIgnore(opts.ignorePatterns, req.url)) return next();

    const cookie: any = _.assign({ key: "{}" }, req.cookies);
    let senseInstance: { AuthKey?: string } = {};

    try {
      senseInstance = JSON.parse(cookie.key);
    } catch (err) {
      // TODO: print log, illegal cookie value
      console.log(`illegal cookie value(key):${cookie.key}`);
    }

    if (!senseInstance.AuthKey)
      res.redirect(opts.loginUrl);
    else
      next();
  };
};

const matchIgnore = (patterns: string[], target: string): boolean => {
  return _.some(patterns, (pattern) => {
    const regx = new RegExp(pattern);
    return regx.test(target);
  });
}

export default auth;