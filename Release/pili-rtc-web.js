(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.QNRTC = {}));
}(this, function (exports) { 'use strict';

  function detect() {
    if (typeof navigator !== 'undefined') {
      return parseUserAgent(navigator.userAgent);
    }

    return getNodeVersion();
  }

  function detectOS(userAgentString) {
    var rules = getOperatingSystemRules();
    var detected = rules.filter(function (os) {
      return os.rule && os.rule.test(userAgentString);
    })[0];
    return detected ? detected.name : null;
  }

  function getNodeVersion() {
    var isNode = typeof process !== 'undefined' && process.version;
    return isNode && {
      name: 'node',
      version: process.version.slice(1),
      os: process.platform
    };
  }

  function parseUserAgent(userAgentString) {
    var browsers = getBrowserRules();

    if (!userAgentString) {
      return null;
    }

    var detected = browsers.map(function (browser) {
      var match = browser.rule.exec(userAgentString);
      var version = match && match[1].split(/[._]/).slice(0, 3);

      if (version && version.length < 3) {
        version = version.concat(version.length == 1 ? [0, 0] : [0]);
      }

      return match && {
        name: browser.name,
        version: version.join('.')
      };
    }).filter(Boolean)[0] || null;

    if (detected) {
      detected.os = detectOS(userAgentString);
    }

    if (/alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/i.test(userAgentString)) {
      detected = detected || {};
      detected.bot = true;
    }

    return detected;
  }

  function getBrowserRules() {
    return buildRules([['aol', /AOLShield\/([0-9\._]+)/], ['edge', /Edge\/([0-9\._]+)/], ['yandexbrowser', /YaBrowser\/([0-9\._]+)/], ['vivaldi', /Vivaldi\/([0-9\.]+)/], ['kakaotalk', /KAKAOTALK\s([0-9\.]+)/], ['samsung', /SamsungBrowser\/([0-9\.]+)/], ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/], ['phantomjs', /PhantomJS\/([0-9\.]+)(:?\s|$)/], ['crios', /CriOS\/([0-9\.]+)(:?\s|$)/], ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/], ['fxios', /FxiOS\/([0-9\.]+)/], ['opera', /Opera\/([0-9\.]+)(?:\s|$)/], ['opera', /OPR\/([0-9\.]+)(:?\s|$)$/], ['ie', /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/], ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/], ['ie', /MSIE\s(7\.0)/], ['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/], ['android', /Android\s([0-9\.]+)/], ['ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/], ['safari', /Version\/([0-9\._]+).*Safari/], ['facebook', /FBAV\/([0-9\.]+)/], ['instagram', /Instagram\s([0-9\.]+)/], ['ios-webview', /AppleWebKit\/([0-9\.]+).*Mobile/]]);
  }

  function getOperatingSystemRules() {
    return buildRules([['iOS', /iP(hone|od|ad)/], ['Android OS', /Android/], ['BlackBerry OS', /BlackBerry|BB10/], ['Windows Mobile', /IEMobile/], ['Amazon OS', /Kindle/], ['Windows 3.11', /Win16/], ['Windows 95', /(Windows 95)|(Win95)|(Windows_95)/], ['Windows 98', /(Windows 98)|(Win98)/], ['Windows 2000', /(Windows NT 5.0)|(Windows 2000)/], ['Windows XP', /(Windows NT 5.1)|(Windows XP)/], ['Windows Server 2003', /(Windows NT 5.2)/], ['Windows Vista', /(Windows NT 6.0)/], ['Windows 7', /(Windows NT 6.1)/], ['Windows 8', /(Windows NT 6.2)/], ['Windows 8.1', /(Windows NT 6.3)/], ['Windows 10', /(Windows NT 10.0)/], ['Windows ME', /Windows ME/], ['Open BSD', /OpenBSD/], ['Sun OS', /SunOS/], ['Linux', /(Linux)|(X11)/], ['Mac OS', /(Mac_PowerPC)|(Macintosh)/], ['QNX', /QNX/], ['BeOS', /BeOS/], ['OS/2', /OS\/2/], ['Search Bot', /(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves\/Teoma)|(ia_archiver)/]]);
  }

  function buildRules(ruleTuples) {
    return ruleTuples.map(function (tuple) {
      return {
        name: tuple[0],
        rule: tuple[1]
      };
    });
  }

  var detectBrowser = {
    detect: detect,
    detectOS: detectOS,
    getNodeVersion: getNodeVersion,
    parseUserAgent: parseUserAgent
  };
  var detectBrowser_1 = detectBrowser.detect;

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
  }

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var semver = createCommonjsModule(function (module, exports) {
    exports = module.exports = SemVer; // The debug function is excluded entirely from the minified version.

    /* nomin */

    var debug;
    /* nomin */

    if (typeof process === 'object' &&
    /* nomin */
    process.env &&
    /* nomin */
    process.env.NODE_DEBUG &&
    /* nomin */
    /\bsemver\b/i.test(process.env.NODE_DEBUG))
      /* nomin */
      debug = function () {
        /* nomin */
        var args = Array.prototype.slice.call(arguments, 0);
        /* nomin */

        args.unshift('SEMVER');
        /* nomin */

        console.log.apply(console, args);
        /* nomin */
      };
      /* nomin */
    else
      /* nomin */
      debug = function () {}; // Note: this is the semver.org version of the spec that it implements
    // Not necessarily the package version of this code.

    exports.SEMVER_SPEC_VERSION = '2.0.0';
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991; // Max safe segment length for coercion.

    var MAX_SAFE_COMPONENT_LENGTH = 16; // The actual regexps go on exports.re

    var re = exports.re = [];
    var src = exports.src = [];
    var R = 0; // The following Regular Expressions can be used for tokenizing,
    // validating, and parsing SemVer version strings.
    // ## Numeric Identifier
    // A single `0`, or a non-zero digit followed by zero or more digits.

    var NUMERICIDENTIFIER = R++;
    src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
    var NUMERICIDENTIFIERLOOSE = R++;
    src[NUMERICIDENTIFIERLOOSE] = '[0-9]+'; // ## Non-numeric Identifier
    // Zero or more digits, followed by a letter or hyphen, and then zero or
    // more letters, digits, or hyphens.

    var NONNUMERICIDENTIFIER = R++;
    src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*'; // ## Main Version
    // Three dot-separated numeric identifiers.

    var MAINVERSION = R++;
    src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' + '(' + src[NUMERICIDENTIFIER] + ')\\.' + '(' + src[NUMERICIDENTIFIER] + ')';
    var MAINVERSIONLOOSE = R++;
    src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' + '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' + '(' + src[NUMERICIDENTIFIERLOOSE] + ')'; // ## Pre-release Version Identifier
    // A numeric identifier, or a non-numeric identifier.

    var PRERELEASEIDENTIFIER = R++;
    src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] + '|' + src[NONNUMERICIDENTIFIER] + ')';
    var PRERELEASEIDENTIFIERLOOSE = R++;
    src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] + '|' + src[NONNUMERICIDENTIFIER] + ')'; // ## Pre-release Version
    // Hyphen, followed by one or more dot-separated pre-release version
    // identifiers.

    var PRERELEASE = R++;
    src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] + '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';
    var PRERELEASELOOSE = R++;
    src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] + '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))'; // ## Build Metadata Identifier
    // Any combination of digits, letters, or hyphens.

    var BUILDIDENTIFIER = R++;
    src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+'; // ## Build Metadata
    // Plus sign, followed by one or more period-separated build metadata
    // identifiers.

    var BUILD = R++;
    src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] + '(?:\\.' + src[BUILDIDENTIFIER] + ')*))'; // ## Full Version String
    // A main version, followed optionally by a pre-release version and
    // build metadata.
    // Note that the only major, minor, patch, and pre-release sections of
    // the version string are capturing groups.  The build metadata is not a
    // capturing group, because it should not ever be used in version
    // comparison.

    var FULL = R++;
    var FULLPLAIN = 'v?' + src[MAINVERSION] + src[PRERELEASE] + '?' + src[BUILD] + '?';
    src[FULL] = '^' + FULLPLAIN + '$'; // like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
    // also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
    // common in the npm registry.

    var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] + src[PRERELEASELOOSE] + '?' + src[BUILD] + '?';
    var LOOSE = R++;
    src[LOOSE] = '^' + LOOSEPLAIN + '$';
    var GTLT = R++;
    src[GTLT] = '((?:<|>)?=?)'; // Something like "2.*" or "1.2.x".
    // Note that "x.x" is a valid xRange identifer, meaning "any version"
    // Only the first item is strictly required.

    var XRANGEIDENTIFIERLOOSE = R++;
    src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
    var XRANGEIDENTIFIER = R++;
    src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';
    var XRANGEPLAIN = R++;
    src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' + '(?:' + src[PRERELEASE] + ')?' + src[BUILD] + '?' + ')?)?';
    var XRANGEPLAINLOOSE = R++;
    src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:' + src[PRERELEASELOOSE] + ')?' + src[BUILD] + '?' + ')?)?';
    var XRANGE = R++;
    src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
    var XRANGELOOSE = R++;
    src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$'; // Coercion.
    // Extract anything that could conceivably be a part of a valid semver

    var COERCE = R++;
    src[COERCE] = '(?:^|[^\\d])' + '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' + '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' + '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' + '(?:$|[^\\d])'; // Tilde ranges.
    // Meaning is "reasonably at or greater than"

    var LONETILDE = R++;
    src[LONETILDE] = '(?:~>?)';
    var TILDETRIM = R++;
    src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
    re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
    var tildeTrimReplace = '$1~';
    var TILDE = R++;
    src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
    var TILDELOOSE = R++;
    src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$'; // Caret ranges.
    // Meaning is "at least and backwards compatible with"

    var LONECARET = R++;
    src[LONECARET] = '(?:\\^)';
    var CARETTRIM = R++;
    src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
    re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
    var caretTrimReplace = '$1^';
    var CARET = R++;
    src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
    var CARETLOOSE = R++;
    src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$'; // A simple gt/lt/eq thing, or just "" to indicate "any version"

    var COMPARATORLOOSE = R++;
    src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
    var COMPARATOR = R++;
    src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$'; // An expression to strip any whitespace between the gtlt and the thing
    // it modifies, so that `> 1.2.3` ==> `>1.2.3`

    var COMPARATORTRIM = R++;
    src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] + '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')'; // this one has to use the /g flag

    re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
    var comparatorTrimReplace = '$1$2$3'; // Something like `1.2.3 - 1.2.4`
    // Note that these all use the loose form, because they'll be
    // checked against either the strict or loose comparator form
    // later.

    var HYPHENRANGE = R++;
    src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' + '\\s+-\\s+' + '(' + src[XRANGEPLAIN] + ')' + '\\s*$';
    var HYPHENRANGELOOSE = R++;
    src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' + '\\s+-\\s+' + '(' + src[XRANGEPLAINLOOSE] + ')' + '\\s*$'; // Star ranges basically just allow anything at all.

    var STAR = R++;
    src[STAR] = '(<|>)?=?\\s*\\*'; // Compile to actual regexp objects.
    // All are flag-free, unless they were created above with a flag.

    for (var i = 0; i < R; i++) {
      debug(i, src[i]);
      if (!re[i]) re[i] = new RegExp(src[i]);
    }

    exports.parse = parse;

    function parse(version, options) {
      if (!options || typeof options !== 'object') options = {
        loose: !!options,
        includePrerelease: false
      };
      if (version instanceof SemVer) return version;
      if (typeof version !== 'string') return null;
      if (version.length > MAX_LENGTH) return null;
      var r = options.loose ? re[LOOSE] : re[FULL];
      if (!r.test(version)) return null;

      try {
        return new SemVer(version, options);
      } catch (er) {
        return null;
      }
    }

    exports.valid = valid;

    function valid(version, options) {
      var v = parse(version, options);
      return v ? v.version : null;
    }

    exports.clean = clean;

    function clean(version, options) {
      var s = parse(version.trim().replace(/^[=v]+/, ''), options);
      return s ? s.version : null;
    }

    exports.SemVer = SemVer;

    function SemVer(version, options) {
      if (!options || typeof options !== 'object') options = {
        loose: !!options,
        includePrerelease: false
      };

      if (version instanceof SemVer) {
        if (version.loose === options.loose) return version;else version = version.version;
      } else if (typeof version !== 'string') {
        throw new TypeError('Invalid Version: ' + version);
      }

      if (version.length > MAX_LENGTH) throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters');
      if (!(this instanceof SemVer)) return new SemVer(version, options);
      debug('SemVer', version, options);
      this.options = options;
      this.loose = !!options.loose;
      var m = version.trim().match(options.loose ? re[LOOSE] : re[FULL]);
      if (!m) throw new TypeError('Invalid Version: ' + version);
      this.raw = version; // these are actually numbers

      this.major = +m[1];
      this.minor = +m[2];
      this.patch = +m[3];
      if (this.major > MAX_SAFE_INTEGER || this.major < 0) throw new TypeError('Invalid major version');
      if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) throw new TypeError('Invalid minor version');
      if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) throw new TypeError('Invalid patch version'); // numberify any prerelease numeric ids

      if (!m[4]) this.prerelease = [];else this.prerelease = m[4].split('.').map(function (id) {
        if (/^[0-9]+$/.test(id)) {
          var num = +id;
          if (num >= 0 && num < MAX_SAFE_INTEGER) return num;
        }

        return id;
      });
      this.build = m[5] ? m[5].split('.') : [];
      this.format();
    }

    SemVer.prototype.format = function () {
      this.version = this.major + '.' + this.minor + '.' + this.patch;
      if (this.prerelease.length) this.version += '-' + this.prerelease.join('.');
      return this.version;
    };

    SemVer.prototype.toString = function () {
      return this.version;
    };

    SemVer.prototype.compare = function (other) {
      debug('SemVer.compare', this.version, this.options, other);
      if (!(other instanceof SemVer)) other = new SemVer(other, this.options);
      return this.compareMain(other) || this.comparePre(other);
    };

    SemVer.prototype.compareMain = function (other) {
      if (!(other instanceof SemVer)) other = new SemVer(other, this.options);
      return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
    };

    SemVer.prototype.comparePre = function (other) {
      if (!(other instanceof SemVer)) other = new SemVer(other, this.options); // NOT having a prerelease is > having one

      if (this.prerelease.length && !other.prerelease.length) return -1;else if (!this.prerelease.length && other.prerelease.length) return 1;else if (!this.prerelease.length && !other.prerelease.length) return 0;
      var i = 0;

      do {
        var a = this.prerelease[i];
        var b = other.prerelease[i];
        debug('prerelease compare', i, a, b);
        if (a === undefined && b === undefined) return 0;else if (b === undefined) return 1;else if (a === undefined) return -1;else if (a === b) continue;else return compareIdentifiers(a, b);
      } while (++i);
    }; // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.


    SemVer.prototype.inc = function (release, identifier) {
      switch (release) {
        case 'premajor':
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc('pre', identifier);
          break;

        case 'preminor':
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc('pre', identifier);
          break;

        case 'prepatch':
          // If this is already a prerelease, it will bump to the next version
          // drop any prereleases that might already exist, since they are not
          // relevant at this point.
          this.prerelease.length = 0;
          this.inc('patch', identifier);
          this.inc('pre', identifier);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.

        case 'prerelease':
          if (this.prerelease.length === 0) this.inc('patch', identifier);
          this.inc('pre', identifier);
          break;

        case 'major':
          // If this is a pre-major version, bump up to the same major version.
          // Otherwise increment major.
          // 1.0.0-5 bumps to 1.0.0
          // 1.1.0 bumps to 2.0.0
          if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) this.major++;
          this.minor = 0;
          this.patch = 0;
          this.prerelease = [];
          break;

        case 'minor':
          // If this is a pre-minor version, bump up to the same minor version.
          // Otherwise increment minor.
          // 1.2.0-5 bumps to 1.2.0
          // 1.2.1 bumps to 1.3.0
          if (this.patch !== 0 || this.prerelease.length === 0) this.minor++;
          this.patch = 0;
          this.prerelease = [];
          break;

        case 'patch':
          // If this is not a pre-release version, it will increment the patch.
          // If it is a pre-release it will bump up to the same patch version.
          // 1.2.0-5 patches to 1.2.0
          // 1.2.0 patches to 1.2.1
          if (this.prerelease.length === 0) this.patch++;
          this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.

        case 'pre':
          if (this.prerelease.length === 0) this.prerelease = [0];else {
            var i = this.prerelease.length;

            while (--i >= 0) {
              if (typeof this.prerelease[i] === 'number') {
                this.prerelease[i]++;
                i = -2;
              }
            }

            if (i === -1) // didn't increment anything
              this.prerelease.push(0);
          }

          if (identifier) {
            // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
            // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
            if (this.prerelease[0] === identifier) {
              if (isNaN(this.prerelease[1])) this.prerelease = [identifier, 0];
            } else this.prerelease = [identifier, 0];
          }

          break;

        default:
          throw new Error('invalid increment argument: ' + release);
      }

      this.format();
      this.raw = this.version;
      return this;
    };

    exports.inc = inc;

    function inc(version, release, loose, identifier) {
      if (typeof loose === 'string') {
        identifier = loose;
        loose = undefined;
      }

      try {
        return new SemVer(version, loose).inc(release, identifier).version;
      } catch (er) {
        return null;
      }
    }

    exports.diff = diff;

    function diff(version1, version2) {
      if (eq(version1, version2)) {
        return null;
      } else {
        var v1 = parse(version1);
        var v2 = parse(version2);

        if (v1.prerelease.length || v2.prerelease.length) {
          for (var key in v1) {
            if (key === 'major' || key === 'minor' || key === 'patch') {
              if (v1[key] !== v2[key]) {
                return 'pre' + key;
              }
            }
          }

          return 'prerelease';
        }

        for (var key in v1) {
          if (key === 'major' || key === 'minor' || key === 'patch') {
            if (v1[key] !== v2[key]) {
              return key;
            }
          }
        }
      }
    }

    exports.compareIdentifiers = compareIdentifiers;
    var numeric = /^[0-9]+$/;

    function compareIdentifiers(a, b) {
      var anum = numeric.test(a);
      var bnum = numeric.test(b);

      if (anum && bnum) {
        a = +a;
        b = +b;
      }

      return anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : a > b ? 1 : 0;
    }

    exports.rcompareIdentifiers = rcompareIdentifiers;

    function rcompareIdentifiers(a, b) {
      return compareIdentifiers(b, a);
    }

    exports.major = major;

    function major(a, loose) {
      return new SemVer(a, loose).major;
    }

    exports.minor = minor;

    function minor(a, loose) {
      return new SemVer(a, loose).minor;
    }

    exports.patch = patch;

    function patch(a, loose) {
      return new SemVer(a, loose).patch;
    }

    exports.compare = compare;

    function compare(a, b, loose) {
      return new SemVer(a, loose).compare(new SemVer(b, loose));
    }

    exports.compareLoose = compareLoose;

    function compareLoose(a, b) {
      return compare(a, b, true);
    }

    exports.rcompare = rcompare;

    function rcompare(a, b, loose) {
      return compare(b, a, loose);
    }

    exports.sort = sort;

    function sort(list, loose) {
      return list.sort(function (a, b) {
        return exports.compare(a, b, loose);
      });
    }

    exports.rsort = rsort;

    function rsort(list, loose) {
      return list.sort(function (a, b) {
        return exports.rcompare(a, b, loose);
      });
    }

    exports.gt = gt;

    function gt(a, b, loose) {
      return compare(a, b, loose) > 0;
    }

    exports.lt = lt;

    function lt(a, b, loose) {
      return compare(a, b, loose) < 0;
    }

    exports.eq = eq;

    function eq(a, b, loose) {
      return compare(a, b, loose) === 0;
    }

    exports.neq = neq;

    function neq(a, b, loose) {
      return compare(a, b, loose) !== 0;
    }

    exports.gte = gte;

    function gte(a, b, loose) {
      return compare(a, b, loose) >= 0;
    }

    exports.lte = lte;

    function lte(a, b, loose) {
      return compare(a, b, loose) <= 0;
    }

    exports.cmp = cmp;

    function cmp(a, op, b, loose) {
      var ret;

      switch (op) {
        case '===':
          if (typeof a === 'object') a = a.version;
          if (typeof b === 'object') b = b.version;
          ret = a === b;
          break;

        case '!==':
          if (typeof a === 'object') a = a.version;
          if (typeof b === 'object') b = b.version;
          ret = a !== b;
          break;

        case '':
        case '=':
        case '==':
          ret = eq(a, b, loose);
          break;

        case '!=':
          ret = neq(a, b, loose);
          break;

        case '>':
          ret = gt(a, b, loose);
          break;

        case '>=':
          ret = gte(a, b, loose);
          break;

        case '<':
          ret = lt(a, b, loose);
          break;

        case '<=':
          ret = lte(a, b, loose);
          break;

        default:
          throw new TypeError('Invalid operator: ' + op);
      }

      return ret;
    }

    exports.Comparator = Comparator;

    function Comparator(comp, options) {
      if (!options || typeof options !== 'object') options = {
        loose: !!options,
        includePrerelease: false
      };

      if (comp instanceof Comparator) {
        if (comp.loose === !!options.loose) return comp;else comp = comp.value;
      }

      if (!(this instanceof Comparator)) return new Comparator(comp, options);
      debug('comparator', comp, options);
      this.options = options;
      this.loose = !!options.loose;
      this.parse(comp);
      if (this.semver === ANY) this.value = '';else this.value = this.operator + this.semver.version;
      debug('comp', this);
    }

    var ANY = {};

    Comparator.prototype.parse = function (comp) {
      var r = this.options.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
      var m = comp.match(r);
      if (!m) throw new TypeError('Invalid comparator: ' + comp);
      this.operator = m[1];
      if (this.operator === '=') this.operator = ''; // if it literally is just '>' or '' then allow anything.

      if (!m[2]) this.semver = ANY;else this.semver = new SemVer(m[2], this.options.loose);
    };

    Comparator.prototype.toString = function () {
      return this.value;
    };

    Comparator.prototype.test = function (version) {
      debug('Comparator.test', version, this.options.loose);
      if (this.semver === ANY) return true;
      if (typeof version === 'string') version = new SemVer(version, this.options);
      return cmp(version, this.operator, this.semver, this.options);
    };

    Comparator.prototype.intersects = function (comp, options) {
      if (!(comp instanceof Comparator)) {
        throw new TypeError('a Comparator is required');
      }

      if (!options || typeof options !== 'object') options = {
        loose: !!options,
        includePrerelease: false
      };
      var rangeTmp;

      if (this.operator === '') {
        rangeTmp = new Range(comp.value, options);
        return satisfies(this.value, rangeTmp, options);
      } else if (comp.operator === '') {
        rangeTmp = new Range(this.value, options);
        return satisfies(comp.semver, rangeTmp, options);
      }

      var sameDirectionIncreasing = (this.operator === '>=' || this.operator === '>') && (comp.operator === '>=' || comp.operator === '>');
      var sameDirectionDecreasing = (this.operator === '<=' || this.operator === '<') && (comp.operator === '<=' || comp.operator === '<');
      var sameSemVer = this.semver.version === comp.semver.version;
      var differentDirectionsInclusive = (this.operator === '>=' || this.operator === '<=') && (comp.operator === '>=' || comp.operator === '<=');
      var oppositeDirectionsLessThan = cmp(this.semver, '<', comp.semver, options) && (this.operator === '>=' || this.operator === '>') && (comp.operator === '<=' || comp.operator === '<');
      var oppositeDirectionsGreaterThan = cmp(this.semver, '>', comp.semver, options) && (this.operator === '<=' || this.operator === '<') && (comp.operator === '>=' || comp.operator === '>');
      return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
    };

    exports.Range = Range;

    function Range(range, options) {
      if (!options || typeof options !== 'object') options = {
        loose: !!options,
        includePrerelease: false
      };

      if (range instanceof Range) {
        if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
          return range;
        } else {
          return new Range(range.raw, options);
        }
      }

      if (range instanceof Comparator) {
        return new Range(range.value, options);
      }

      if (!(this instanceof Range)) return new Range(range, options);
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease; // First, split based on boolean or ||

      this.raw = range;
      this.set = range.split(/\s*\|\|\s*/).map(function (range) {
        return this.parseRange(range.trim());
      }, this).filter(function (c) {
        // throw out any that are not relevant for whatever reason
        return c.length;
      });

      if (!this.set.length) {
        throw new TypeError('Invalid SemVer Range: ' + range);
      }

      this.format();
    }

    Range.prototype.format = function () {
      this.range = this.set.map(function (comps) {
        return comps.join(' ').trim();
      }).join('||').trim();
      return this.range;
    };

    Range.prototype.toString = function () {
      return this.range;
    };

    Range.prototype.parseRange = function (range) {
      var loose = this.options.loose;
      range = range.trim(); // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`

      var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
      range = range.replace(hr, hyphenReplace);
      debug('hyphen replace', range); // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`

      range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
      debug('comparator trim', range, re[COMPARATORTRIM]); // `~ 1.2.3` => `~1.2.3`

      range = range.replace(re[TILDETRIM], tildeTrimReplace); // `^ 1.2.3` => `^1.2.3`

      range = range.replace(re[CARETTRIM], caretTrimReplace); // normalize spaces

      range = range.split(/\s+/).join(' '); // At this point, the range is completely trimmed and
      // ready to be split into comparators.

      var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
      var set = range.split(' ').map(function (comp) {
        return parseComparator(comp, this.options);
      }, this).join(' ').split(/\s+/);

      if (this.options.loose) {
        // in loose mode, throw out any that are not valid comparators
        set = set.filter(function (comp) {
          return !!comp.match(compRe);
        });
      }

      set = set.map(function (comp) {
        return new Comparator(comp, this.options);
      }, this);
      return set;
    };

    Range.prototype.intersects = function (range, options) {
      if (!(range instanceof Range)) {
        throw new TypeError('a Range is required');
      }

      return this.set.some(function (thisComparators) {
        return thisComparators.every(function (thisComparator) {
          return range.set.some(function (rangeComparators) {
            return rangeComparators.every(function (rangeComparator) {
              return thisComparator.intersects(rangeComparator, options);
            });
          });
        });
      });
    }; // Mostly just for testing and legacy API reasons


    exports.toComparators = toComparators;

    function toComparators(range, options) {
      return new Range(range, options).set.map(function (comp) {
        return comp.map(function (c) {
          return c.value;
        }).join(' ').trim().split(' ');
      });
    } // comprised of xranges, tildes, stars, and gtlt's at this point.
    // already replaced the hyphen ranges
    // turn into a set of JUST comparators.


    function parseComparator(comp, options) {
      debug('comp', comp, options);
      comp = replaceCarets(comp, options);
      debug('caret', comp);
      comp = replaceTildes(comp, options);
      debug('tildes', comp);
      comp = replaceXRanges(comp, options);
      debug('xrange', comp);
      comp = replaceStars(comp, options);
      debug('stars', comp);
      return comp;
    }

    function isX(id) {
      return !id || id.toLowerCase() === 'x' || id === '*';
    } // ~, ~> --> * (any, kinda silly)
    // ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
    // ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
    // ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
    // ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
    // ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0


    function replaceTildes(comp, options) {
      return comp.trim().split(/\s+/).map(function (comp) {
        return replaceTilde(comp, options);
      }).join(' ');
    }

    function replaceTilde(comp, options) {
      if (!options || typeof options !== 'object') options = {
        loose: !!options,
        includePrerelease: false
      };
      var r = options.loose ? re[TILDELOOSE] : re[TILDE];
      return comp.replace(r, function (_, M, m, p, pr) {
        debug('tilde', comp, _, M, m, p, pr);
        var ret;
        if (isX(M)) ret = '';else if (isX(m)) ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';else if (isX(p)) // ~1.2 == >=1.2.0 <1.3.0
          ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';else if (pr) {
          debug('replaceTilde pr', pr);
          if (pr.charAt(0) !== '-') pr = '-' + pr;
          ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + M + '.' + (+m + 1) + '.0';
        } else // ~1.2.3 == >=1.2.3 <1.3.0
          ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + (+m + 1) + '.0';
        debug('tilde return', ret);
        return ret;
      });
    } // ^ --> * (any, kinda silly)
    // ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
    // ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
    // ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
    // ^1.2.3 --> >=1.2.3 <2.0.0
    // ^1.2.0 --> >=1.2.0 <2.0.0


    function replaceCarets(comp, options) {
      return comp.trim().split(/\s+/).map(function (comp) {
        return replaceCaret(comp, options);
      }).join(' ');
    }

    function replaceCaret(comp, options) {
      debug('caret', comp, options);
      if (!options || typeof options !== 'object') options = {
        loose: !!options,
        includePrerelease: false
      };
      var r = options.loose ? re[CARETLOOSE] : re[CARET];
      return comp.replace(r, function (_, M, m, p, pr) {
        debug('caret', comp, _, M, m, p, pr);
        var ret;
        if (isX(M)) ret = '';else if (isX(m)) ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';else if (isX(p)) {
          if (M === '0') ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';else ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
        } else if (pr) {
          debug('replaceCaret pr', pr);
          if (pr.charAt(0) !== '-') pr = '-' + pr;

          if (M === '0') {
            if (m === '0') ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + M + '.' + m + '.' + (+p + 1);else ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + M + '.' + (+m + 1) + '.0';
          } else ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + (+M + 1) + '.0.0';
        } else {
          debug('no pr');

          if (M === '0') {
            if (m === '0') ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + m + '.' + (+p + 1);else ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + (+m + 1) + '.0';
          } else ret = '>=' + M + '.' + m + '.' + p + ' <' + (+M + 1) + '.0.0';
        }
        debug('caret return', ret);
        return ret;
      });
    }

    function replaceXRanges(comp, options) {
      debug('replaceXRanges', comp, options);
      return comp.split(/\s+/).map(function (comp) {
        return replaceXRange(comp, options);
      }).join(' ');
    }

    function replaceXRange(comp, options) {
      comp = comp.trim();
      if (!options || typeof options !== 'object') options = {
        loose: !!options,
        includePrerelease: false
      };
      var r = options.loose ? re[XRANGELOOSE] : re[XRANGE];
      return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
        debug('xRange', comp, ret, gtlt, M, m, p, pr);
        var xM = isX(M);
        var xm = xM || isX(m);
        var xp = xm || isX(p);
        var anyX = xp;
        if (gtlt === '=' && anyX) gtlt = '';

        if (xM) {
          if (gtlt === '>' || gtlt === '<') {
            // nothing is allowed
            ret = '<0.0.0';
          } else {
            // nothing is forbidden
            ret = '*';
          }
        } else if (gtlt && anyX) {
          // replace X with 0
          if (xm) m = 0;
          if (xp) p = 0;

          if (gtlt === '>') {
            // >1 => >=2.0.0
            // >1.2 => >=1.3.0
            // >1.2.3 => >= 1.2.4
            gtlt = '>=';

            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else if (xp) {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === '<=') {
            // <=0.7.x is actually <0.8.0, since any 0.7.x should
            // pass.  Similarly, <=7.x is actually <8.0.0, etc.
            gtlt = '<';
            if (xm) M = +M + 1;else m = +m + 1;
          }

          ret = gtlt + M + '.' + m + '.' + p;
        } else if (xm) {
          ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
        } else if (xp) {
          ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
        }

        debug('xRange return', ret);
        return ret;
      });
    } // Because * is AND-ed with everything else in the comparator,
    // and '' means "any version", just remove the *s entirely.


    function replaceStars(comp, options) {
      debug('replaceStars', comp, options); // Looseness is ignored here.  star is always as loose as it gets!

      return comp.trim().replace(re[STAR], '');
    } // This function is passed to string.replace(re[HYPHENRANGE])
    // M, m, patch, prerelease, build
    // 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
    // 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
    // 1.2 - 3.4 => >=1.2.0 <3.5.0


    function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
      if (isX(fM)) from = '';else if (isX(fm)) from = '>=' + fM + '.0.0';else if (isX(fp)) from = '>=' + fM + '.' + fm + '.0';else from = '>=' + from;
      if (isX(tM)) to = '';else if (isX(tm)) to = '<' + (+tM + 1) + '.0.0';else if (isX(tp)) to = '<' + tM + '.' + (+tm + 1) + '.0';else if (tpr) to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;else to = '<=' + to;
      return (from + ' ' + to).trim();
    } // if ANY of the sets match ALL of its comparators, then pass


    Range.prototype.test = function (version) {
      if (!version) return false;
      if (typeof version === 'string') version = new SemVer(version, this.options);

      for (var i = 0; i < this.set.length; i++) {
        if (testSet(this.set[i], version, this.options)) return true;
      }

      return false;
    };

    function testSet(set, version, options) {
      for (var i = 0; i < set.length; i++) {
        if (!set[i].test(version)) return false;
      }

      if (!options) options = {};

      if (version.prerelease.length && !options.includePrerelease) {
        // Find the set of versions that are allowed to have prereleases
        // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
        // That should allow `1.2.3-pr.2` to pass.
        // However, `1.2.4-alpha.notready` should NOT be allowed,
        // even though it's within the range set by the comparators.
        for (var i = 0; i < set.length; i++) {
          debug(set[i].semver);
          if (set[i].semver === ANY) continue;

          if (set[i].semver.prerelease.length > 0) {
            var allowed = set[i].semver;
            if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) return true;
          }
        } // Version has a -pre, but it's not one of the ones we like.


        return false;
      }

      return true;
    }

    exports.satisfies = satisfies;

    function satisfies(version, range, options) {
      try {
        range = new Range(range, options);
      } catch (er) {
        return false;
      }

      return range.test(version);
    }

    exports.maxSatisfying = maxSatisfying;

    function maxSatisfying(versions, range, options) {
      var max = null;
      var maxSV = null;

      try {
        var rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }

      versions.forEach(function (v) {
        if (rangeObj.test(v)) {
          // satisfies(v, range, options)
          if (!max || maxSV.compare(v) === -1) {
            // compare(max, v, true)
            max = v;
            maxSV = new SemVer(max, options);
          }
        }
      });
      return max;
    }

    exports.minSatisfying = minSatisfying;

    function minSatisfying(versions, range, options) {
      var min = null;
      var minSV = null;

      try {
        var rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }

      versions.forEach(function (v) {
        if (rangeObj.test(v)) {
          // satisfies(v, range, options)
          if (!min || minSV.compare(v) === 1) {
            // compare(min, v, true)
            min = v;
            minSV = new SemVer(min, options);
          }
        }
      });
      return min;
    }

    exports.validRange = validRange;

    function validRange(range, options) {
      try {
        // Return '*' instead of '' so that truthiness works.
        // This will throw if it's invalid anyway
        return new Range(range, options).range || '*';
      } catch (er) {
        return null;
      }
    } // Determine if version is less than all the versions possible in the range


    exports.ltr = ltr;

    function ltr(version, range, options) {
      return outside(version, range, '<', options);
    } // Determine if version is greater than all the versions possible in the range.


    exports.gtr = gtr;

    function gtr(version, range, options) {
      return outside(version, range, '>', options);
    }

    exports.outside = outside;

    function outside(version, range, hilo, options) {
      version = new SemVer(version, options);
      range = new Range(range, options);
      var gtfn, ltefn, ltfn, comp, ecomp;

      switch (hilo) {
        case '>':
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = '>';
          ecomp = '>=';
          break;

        case '<':
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = '<';
          ecomp = '<=';
          break;

        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      } // If it satisifes the range it is not outside


      if (satisfies(version, range, options)) {
        return false;
      } // From now on, variable terms are as if we're in "gtr" mode.
      // but note that everything is flipped for the "ltr" function.


      for (var i = 0; i < range.set.length; ++i) {
        var comparators = range.set[i];
        var high = null;
        var low = null;
        comparators.forEach(function (comparator) {
          if (comparator.semver === ANY) {
            comparator = new Comparator('>=0.0.0');
          }

          high = high || comparator;
          low = low || comparator;

          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        }); // If the edge version comparator has a operator then our version
        // isn't outside it

        if (high.operator === comp || high.operator === ecomp) {
          return false;
        } // If the lowest version comparator has an operator and our version
        // is less than it then it isn't higher than the range


        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false;
        }
      }

      return true;
    }

    exports.prerelease = prerelease;

    function prerelease(version, options) {
      var parsed = parse(version, options);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    }

    exports.intersects = intersects;

    function intersects(r1, r2, options) {
      r1 = new Range(r1, options);
      r2 = new Range(r2, options);
      return r1.intersects(r2);
    }

    exports.coerce = coerce;

    function coerce(version) {
      if (version instanceof SemVer) return version;
      if (typeof version !== 'string') return null;
      var match = version.match(re[COERCE]);
      if (match == null) return null;
      return parse((match[1] || '0') + '.' + (match[2] || '0') + '.' + (match[3] || '0'));
    }
  });
  var semver_1 = semver.SEMVER_SPEC_VERSION;
  var semver_2 = semver.re;
  var semver_3 = semver.src;
  var semver_4 = semver.parse;
  var semver_5 = semver.valid;
  var semver_6 = semver.clean;
  var semver_7 = semver.SemVer;
  var semver_8 = semver.inc;
  var semver_9 = semver.diff;
  var semver_10 = semver.compareIdentifiers;
  var semver_11 = semver.rcompareIdentifiers;
  var semver_12 = semver.major;
  var semver_13 = semver.minor;
  var semver_14 = semver.patch;
  var semver_15 = semver.compare;
  var semver_16 = semver.compareLoose;
  var semver_17 = semver.rcompare;
  var semver_18 = semver.sort;
  var semver_19 = semver.rsort;
  var semver_20 = semver.gt;
  var semver_21 = semver.lt;
  var semver_22 = semver.eq;
  var semver_23 = semver.neq;
  var semver_24 = semver.gte;
  var semver_25 = semver.lte;
  var semver_26 = semver.cmp;
  var semver_27 = semver.Comparator;
  var semver_28 = semver.Range;
  var semver_29 = semver.toComparators;
  var semver_30 = semver.satisfies;
  var semver_31 = semver.maxSatisfying;
  var semver_32 = semver.minSatisfying;
  var semver_33 = semver.validRange;
  var semver_34 = semver.ltr;
  var semver_35 = semver.gtr;
  var semver_36 = semver.outside;
  var semver_37 = semver.prerelease;
  var semver_38 = semver.intersects;
  var semver_39 = semver.coerce;

  /*
   * browserCheck.ts
   * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
   *
   * Distributed under terms of the MIT license.
  */
  const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  const isChrome = !!window.chrome;
  const isIOS = navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i);
  const browser = detectBrowser_1() || {};
  function baseSupportCheck() {
      try {
          if (!RTCPeerConnection) {
              return false;
          }
          if (!WebSocket) {
              return false;
          }
          if (!navigator.mediaDevices.getUserMedia) {
              return false;
          }
          return true;
      }
      catch (e) {
          return false;
      }
  }
  function supportGetDisplayMedia() {
      const hasGetDisplayMediaAPI = navigator && navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia;
      const supportDisplaysurface = navigator && navigator.mediaDevices && navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.getSupportedConstraints().displaySurface;
      // 在 Firefox 支持标准的选择采集源之前，继续使用老的 API，因为反正都不需要插件
      if (isFirefox) {
          return !!hasGetDisplayMediaAPI && !!supportDisplaysurface;
      }
      return !!hasGetDisplayMediaAPI;
  }
  function browserCheck() {
      if (!browser) {
          return {
              support: baseSupportCheck(),
              supportRestartICE: true,
              getDisplayMedia: supportGetDisplayMedia(),
              disconnectAudioNode: true,
          };
      }
      switch (browser.name) {
          case "chrome":
              return {
                  support: semver_24(browser.version, "52.0.0"),
                  mediaStreamDest: semver_24(browser.version, "55.0.0"),
                  replaceTrack: semver_24(browser.version, "65.0.0"),
                  screenSharing: semver_24(browser.version, "55.0.0"),
                  connectionState: false,
                  stats: semver_24(browser.version, "67.0.0"),
                  ondevicechange: semver_24(browser.version, "57.0.0"),
                  minMaxWithIdeal: semver_24(browser.version, "56.0.0"),
                  unifiedPlan: false,
                  // semver.gte(browser.version, "71.0.0"),
                  supportTransceivers: false,
                  supportRestartICE: true,
                  getReceivers: semver_24(browser.version, "55.0.0"),
                  needH264FmtpLine: semver_25(browser.version, "51.0.0"),
                  audioContextOptions: true,
                  getDisplayMedia: supportGetDisplayMedia(),
                  disconnectAudioNode: true,
              };
          case "safari":
              return {
                  support: semver_24(browser.version, "11.0.0"),
                  replaceTrack: semver_24(browser.version, "11.0.0"),
                  stats: false,
                  ondevicechange: false,
                  connectionState: true,
                  mediaStreamDest: semver_24(browser.version, "12.0.0"),
                  screenSharing: false,
                  minMaxWithIdeal: false,
                  supportRestartICE: true,
                  getReceivers: true,
                  audioContextOptions: true,
                  getDisplayMedia: supportGetDisplayMedia(),
                  disconnectAudioNode: false,
              };
          case "firefox":
              return {
                  support: baseSupportCheck() && semver_24(browser.version, "52.0.0"),
                  replaceTrack: true,
                  stats: true,
                  ondevicechange: semver_24(browser.version, "52.0.0"),
                  connectionState: true,
                  mediaStreamDest: true,
                  screenSharing: true,
                  minMaxWithIdeal: true,
                  unifiedPlan: true,
                  // https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/59
                  supportTransceivers: semver_24(browser.version, "59.0.0"),
                  supportRestartICE: false,
                  getReceivers: true,
                  // Firefox 55 以后不会抛出 audioContext 构造函数错误，但是依旧还是 ignore
                  audioContextOptions: semver_24(browser.version, "55.0.0"),
                  getDisplayMedia: supportGetDisplayMedia(),
                  disconnectAudioNode: true,
              };
          default:
              return {
                  support: baseSupportCheck(),
                  supportRestartICE: true,
                  getDisplayMedia: supportGetDisplayMedia(),
                  disconnectAudioNode: true,
              };
      }
  }
  const browserReport = browserCheck();

  // adapter.js ea47dd2632e15fa77395d1d7d514802d5f0ac71b
  function mediaDevicesShim() {
      const constraintsToChrome_ = function (c) {
          if (typeof c !== "object" || c.mandatory || c.optional) {
              return c;
          }
          const cc = {};
          Object.keys(c).forEach(key => {
              if (key === "require" || key === "advanced" || key === "mediaSource") {
                  return;
              }
              const r = (typeof c[key] === "object") ? c[key] : { ideal: c[key] };
              if (r.exact !== undefined && typeof r.exact === "number") {
                  r.min = r.max = r.exact;
              }
              const oldname_ = function (prefix, name) {
                  if (prefix) {
                      return prefix + name.charAt(0).toUpperCase() + name.slice(1);
                  }
                  return (name === "deviceId") ? "sourceId" : name;
              };
              if (r.ideal !== undefined) {
                  cc.optional = cc.optional || [];
                  let oc = {};
                  if (typeof r.ideal === "number") {
                      oc[oldname_("min", key)] = r.ideal;
                      cc.optional.push(oc);
                      oc = {};
                      oc[oldname_("max", key)] = r.ideal;
                      cc.optional.push(oc);
                  }
                  else {
                      oc[oldname_("", key)] = r.ideal;
                      cc.optional.push(oc);
                  }
              }
              if (r.exact !== undefined && typeof r.exact !== "number") {
                  cc.mandatory = cc.mandatory || {};
                  cc.mandatory[oldname_("", key)] = r.exact;
              }
              else {
                  ["min", "max"].forEach(mix => {
                      if (r[mix] !== undefined) {
                          cc.mandatory = cc.mandatory || {};
                          cc.mandatory[oldname_(mix, key)] = r[mix];
                      }
                  });
              }
          });
          if (c.advanced) {
              cc.optional = (cc.optional || []).concat(c.advanced);
          }
          return cc;
      };
      const shimConstraints_ = function (constraints, func) {
          if (semver_20(browser.version, "61.0.0")) {
              return func(constraints);
          }
          constraints = JSON.parse(JSON.stringify(constraints));
          if (constraints && typeof constraints.audio === "object") {
              const remap = function (obj, a, b) {
                  if (a in obj && !(b in obj)) {
                      obj[b] = obj[a];
                      delete obj[a];
                  }
              };
              constraints = JSON.parse(JSON.stringify(constraints));
              remap(constraints.audio, "autoGainControl", "googAutoGainControl");
              remap(constraints.audio, "noiseSuppression", "googNoiseSuppression");
              constraints.audio = constraintsToChrome_(constraints.audio);
          }
          if (constraints && typeof constraints.video === "object") {
              // Shim facingMode for mobile & surface pro.
              let face = constraints.video.facingMode;
              face = face && ((typeof face === "object") ? face : { ideal: face });
              const getSupportedFacingModeLies = semver_21(browser.version, "66.0.0");
              if ((face && (face.exact === "user" || face.exact === "environment" ||
                  face.ideal === "user" || face.ideal === "environment")) &&
                  !(navigator.mediaDevices.getSupportedConstraints &&
                      navigator.mediaDevices.getSupportedConstraints().facingMode &&
                      !getSupportedFacingModeLies)) {
                  delete constraints.video.facingMode;
                  let matches = undefined;
                  if (face.exact === "environment" || face.ideal === "environment") {
                      matches = ["back", "rear"];
                  }
                  else if (face.exact === "user" || face.ideal === "user") {
                      matches = ["front"];
                  }
                  if (matches) {
                      // Look for matches in label, or use last cam for back (typical).
                      return navigator.mediaDevices.enumerateDevices()
                          .then(devices => {
                          devices = devices.filter(d => d.kind === "videoinput");
                          let dev = devices.find(d => matches.some(match => d.label.toLowerCase().includes(match)));
                          if (!dev && devices.length && matches.includes("back")) {
                              dev = devices[devices.length - 1]; // more likely the back cam
                          }
                          if (dev) {
                              constraints.video.deviceId = face.exact ? { exact: dev.deviceId } :
                                  { ideal: dev.deviceId };
                          }
                          constraints.video = constraintsToChrome_(constraints.video);
                          return func(constraints);
                      });
                  }
              }
              constraints.video = constraintsToChrome_(constraints.video);
          }
          return func(constraints);
      };
      const getUserMedia_ = function (constraints, onSuccess, onError) {
          shimConstraints_(constraints, (c) => {
              navigator.webkitGetUserMedia(c, onSuccess, (e) => {
                  if (onError) {
                      onError(e);
                  }
              });
          });
      };
      navigator.getUserMedia = getUserMedia_;
      // Returns the result of getUserMedia as a Promise.
      const getUserMediaPromise_ = function (constraints) {
          return new Promise((resolve, reject) => {
              navigator.getUserMedia(constraints, resolve, reject);
          });
      };
      if (!navigator.mediaDevices) {
          navigator.mediaDevices = {
              getUserMedia: getUserMediaPromise_,
              enumerateDevices() {
                  return new Promise(resolve => {
                      const kinds = { audio: "audioinput", video: "videoinput" };
                      return window.MediaStreamTrack.getSources((devices) => {
                          resolve(devices.map((device) => ({
                              label: device.label,
                              kind: kinds[device.kind],
                              deviceId: device.id,
                              groupId: "",
                          })));
                      });
                  });
              },
          };
      }
      if (!navigator.mediaDevices.getSupportedConstraints) {
          navigator.mediaDevices.getSupportedConstraints = () => {
              return {
                  deviceId: true, echoCancellation: true, facingMode: true,
                  frameRate: true, height: true, width: true,
              };
          };
      }
      // A shim for getUserMedia method on the mediaDevices object.
      // TODO(KaptenJansson) remove once implemented in Chrome stable.
      if (!navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia = function (constraints) {
              return getUserMediaPromise_(constraints);
          };
      }
      else {
          // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
          // function which returns a Promise, it does not accept spec-style
          // constraints.
          const origGetUserMedia = navigator.mediaDevices.getUserMedia.
              bind(navigator.mediaDevices);
          navigator.mediaDevices.getUserMedia = function (cs) {
              return shimConstraints_(cs, (c) => origGetUserMedia(c).then(stream => {
                  if (c.audio && !stream.getAudioTracks().length ||
                      c.video && !stream.getVideoTracks().length) {
                      stream.getTracks().forEach(track => {
                          track.stop();
                      });
                      throw new DOMException("", "NotFoundError");
                  }
                  return stream;
              }, e => Promise.reject(e)));
          };
      }
  }

  // adapter.js 8eca2831b0d11cc14ffb6193d0d49044c6dd9252
  function mediaDevicesShim$1() {
      const getUserMedia_ = function (constraints, onSuccess, onError) {
          constraints = JSON.parse(JSON.stringify(constraints));
          return navigator.mozGetUserMedia(constraints, onSuccess, (e) => {
              onError(e);
          });
      };
      // Returns the result of getUserMedia as a Promise.
      const getUserMediaPromise_ = function (constraints) {
          return new Promise((resolve, reject) => {
              getUserMedia_(constraints, resolve, reject);
          });
      };
      if (!navigator.mediaDevices) {
          navigator.mediaDevices = { getUserMedia: getUserMediaPromise_,
              addEventListener() { },
              removeEventListener() { },
          };
      }
      navigator.mediaDevices.enumerateDevices =
          navigator.mediaDevices.enumerateDevices || function () {
              return new Promise(resolve => {
                  const infos = [
                      { kind: "audioinput", deviceId: "default", label: "", groupId: "" },
                      { kind: "videoinput", deviceId: "default", label: "", groupId: "" },
                  ];
                  resolve(infos);
              });
          };
  }

  if (browser.name === "chrome") {
      mediaDevicesShim();
  }
  if (browser.name === "firefox") {
      mediaDevicesShim$1();
  }

  var adapter_no_edge_no_global = createCommonjsModule(function (module) {
    (function () {
      function r(e, n, t) {
        function o(i, f) {
          if (!n[i]) {
            if (!e[i]) {
              var c = "function" == typeof commonjsRequire && commonjsRequire;
              if (!f && c) return c(i, !0);
              if (u) return u(i, !0);
              var a = new Error("Cannot find module '" + i + "'");
              throw a.code = "MODULE_NOT_FOUND", a;
            }

            var p = n[i] = {
              exports: {}
            };
            e[i][0].call(p.exports, function (r) {
              var n = e[i][1][r];
              return o(n || r);
            }, p, p.exports, r, e, n, t);
          }

          return n[i].exports;
        }

        for (var u = "function" == typeof commonjsRequire && commonjsRequire, i = 0; i < t.length; i++) o(t[i]);

        return o;
      }

      return r;
    })()({
      1: [function (require, module, exports) {

        var _adapter_factory = require('./adapter_factory.js');

        var adapter = (0, _adapter_factory.adapterFactory)({
          window: window
        });
        module.exports = adapter; // this is the difference from adapter_core.
      }, {
        "./adapter_factory.js": 2
      }],
      2: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.adapterFactory = adapterFactory;

        var _utils = require('./utils');

        var utils = _interopRequireWildcard(_utils);

        var _chrome_shim = require('./chrome/chrome_shim');

        var chromeShim = _interopRequireWildcard(_chrome_shim);

        var _edge_shim = require('./edge/edge_shim');

        var edgeShim = _interopRequireWildcard(_edge_shim);

        var _firefox_shim = require('./firefox/firefox_shim');

        var firefoxShim = _interopRequireWildcard(_firefox_shim);

        var _safari_shim = require('./safari/safari_shim');

        var safariShim = _interopRequireWildcard(_safari_shim);

        var _common_shim = require('./common_shim');

        var commonShim = _interopRequireWildcard(_common_shim);

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};

            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
              }
            }

            newObj.default = obj;
            return newObj;
          }
        } // Shimming starts here.

        /*
         *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
         *
         *  Use of this source code is governed by a BSD-style license
         *  that can be found in the LICENSE file in the root of the source
         *  tree.
         */


        function adapterFactory() {
          var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              window = _ref.window;

          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
            shimChrome: true,
            shimFirefox: true,
            shimEdge: true,
            shimSafari: true
          }; // Utils.

          var logging = utils.log;
          var browserDetails = utils.detectBrowser(window);
          var adapter = {
            browserDetails: browserDetails,
            commonShim: commonShim,
            extractVersion: utils.extractVersion,
            disableLog: utils.disableLog,
            disableWarnings: utils.disableWarnings
          }; // Shim browser if found.

          switch (browserDetails.browser) {
            case 'chrome':
              if (!chromeShim || !chromeShim.shimPeerConnection || !options.shimChrome) {
                logging('Chrome shim is not included in this adapter release.');
                return adapter;
              }

              logging('adapter.js shimming chrome.'); // Export to the adapter global object visible in the browser.

              adapter.browserShim = chromeShim;
              chromeShim.shimGetUserMedia(window);
              chromeShim.shimMediaStream(window);
              chromeShim.shimPeerConnection(window);
              chromeShim.shimOnTrack(window);
              chromeShim.shimAddTrackRemoveTrack(window);
              chromeShim.shimGetSendersWithDtmf(window);
              chromeShim.shimSenderReceiverGetStats(window);
              chromeShim.fixNegotiationNeeded(window);
              commonShim.shimRTCIceCandidate(window);
              commonShim.shimConnectionState(window);
              commonShim.shimMaxMessageSize(window);
              commonShim.shimSendThrowTypeError(window);
              commonShim.removeAllowExtmapMixed(window);
              break;

            case 'firefox':
              if (!firefoxShim || !firefoxShim.shimPeerConnection || !options.shimFirefox) {
                logging('Firefox shim is not included in this adapter release.');
                return adapter;
              }

              logging('adapter.js shimming firefox.'); // Export to the adapter global object visible in the browser.

              adapter.browserShim = firefoxShim;
              firefoxShim.shimGetUserMedia(window);
              firefoxShim.shimPeerConnection(window);
              firefoxShim.shimOnTrack(window);
              firefoxShim.shimRemoveStream(window);
              firefoxShim.shimSenderGetStats(window);
              firefoxShim.shimReceiverGetStats(window);
              firefoxShim.shimRTCDataChannel(window);
              commonShim.shimRTCIceCandidate(window);
              commonShim.shimConnectionState(window);
              commonShim.shimMaxMessageSize(window);
              commonShim.shimSendThrowTypeError(window);
              break;

            case 'edge':
              if (!edgeShim || !edgeShim.shimPeerConnection || !options.shimEdge) {
                logging('MS edge shim is not included in this adapter release.');
                return adapter;
              }

              logging('adapter.js shimming edge.'); // Export to the adapter global object visible in the browser.

              adapter.browserShim = edgeShim;
              edgeShim.shimGetUserMedia(window);
              edgeShim.shimGetDisplayMedia(window);
              edgeShim.shimPeerConnection(window);
              edgeShim.shimReplaceTrack(window); // the edge shim implements the full RTCIceCandidate object.

              commonShim.shimMaxMessageSize(window);
              commonShim.shimSendThrowTypeError(window);
              break;

            case 'safari':
              if (!safariShim || !options.shimSafari) {
                logging('Safari shim is not included in this adapter release.');
                return adapter;
              }

              logging('adapter.js shimming safari.'); // Export to the adapter global object visible in the browser.

              adapter.browserShim = safariShim;
              safariShim.shimRTCIceServerUrls(window);
              safariShim.shimCreateOfferLegacy(window);
              safariShim.shimCallbacksAPI(window);
              safariShim.shimLocalStreamsAPI(window);
              safariShim.shimRemoteStreamsAPI(window);
              safariShim.shimTrackEventTransceiver(window);
              safariShim.shimGetUserMedia(window);
              commonShim.shimRTCIceCandidate(window);
              commonShim.shimMaxMessageSize(window);
              commonShim.shimSendThrowTypeError(window);
              commonShim.removeAllowExtmapMixed(window);
              break;

            default:
              logging('Unsupported browser!');
              break;
          }

          return adapter;
        } // Browser shims.

      }, {
        "./chrome/chrome_shim": 3,
        "./common_shim": 6,
        "./edge/edge_shim": 12,
        "./firefox/firefox_shim": 7,
        "./safari/safari_shim": 10,
        "./utils": 11
      }],
      3: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
          return typeof obj;
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };

        var _getusermedia = require('./getusermedia');

        Object.defineProperty(exports, 'shimGetUserMedia', {
          enumerable: true,
          get: function get() {
            return _getusermedia.shimGetUserMedia;
          }
        });

        var _getdisplaymedia = require('./getdisplaymedia');

        Object.defineProperty(exports, 'shimGetDisplayMedia', {
          enumerable: true,
          get: function get() {
            return _getdisplaymedia.shimGetDisplayMedia;
          }
        });
        exports.shimMediaStream = shimMediaStream;
        exports.shimOnTrack = shimOnTrack;
        exports.shimGetSendersWithDtmf = shimGetSendersWithDtmf;
        exports.shimSenderReceiverGetStats = shimSenderReceiverGetStats;
        exports.shimAddTrackRemoveTrackWithNative = shimAddTrackRemoveTrackWithNative;
        exports.shimAddTrackRemoveTrack = shimAddTrackRemoveTrack;
        exports.shimPeerConnection = shimPeerConnection;
        exports.fixNegotiationNeeded = fixNegotiationNeeded;

        var _utils = require('../utils.js');

        var utils = _interopRequireWildcard(_utils);

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};

            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
              }
            }

            newObj.default = obj;
            return newObj;
          }
        }
        /* iterates the stats graph recursively. */


        function walkStats(stats, base, resultSet) {
          if (!base || resultSet.has(base.id)) {
            return;
          }

          resultSet.set(base.id, base);
          Object.keys(base).forEach(function (name) {
            if (name.endsWith('Id')) {
              walkStats(stats, stats.get(base[name]), resultSet);
            } else if (name.endsWith('Ids')) {
              base[name].forEach(function (id) {
                walkStats(stats, stats.get(id), resultSet);
              });
            }
          });
        }
        /* filter getStats for a sender/receiver track. */


        function filterStats(result, track, outbound) {
          var streamStatsType = outbound ? 'outbound-rtp' : 'inbound-rtp';
          var filteredResult = new Map();

          if (track === null) {
            return filteredResult;
          }

          var trackStats = [];
          result.forEach(function (value) {
            if (value.type === 'track' && value.trackIdentifier === track.id) {
              trackStats.push(value);
            }
          });
          trackStats.forEach(function (trackStat) {
            result.forEach(function (stats) {
              if (stats.type === streamStatsType && stats.trackId === trackStat.id) {
                walkStats(result, stats, filteredResult);
              }
            });
          });
          return filteredResult;
        }

        function shimMediaStream(window) {
          window.MediaStream = window.MediaStream || window.webkitMediaStream;
        }

        function shimOnTrack(window) {
          if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && !('ontrack' in window.RTCPeerConnection.prototype)) {
            Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
              get: function get() {
                return this._ontrack;
              },
              set: function set(f) {
                if (this._ontrack) {
                  this.removeEventListener('track', this._ontrack);
                }

                this.addEventListener('track', this._ontrack = f);
              },
              enumerable: true,
              configurable: true
            });
            var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;

            window.RTCPeerConnection.prototype.setRemoteDescription = function () {
              var _this = this;

              if (!this._ontrackpoly) {
                this._ontrackpoly = function (e) {
                  // onaddstream does not fire when a track is added to an existing
                  // stream. But stream.onaddtrack is implemented so we use that.
                  e.stream.addEventListener('addtrack', function (te) {
                    var receiver = void 0;

                    if (window.RTCPeerConnection.prototype.getReceivers) {
                      receiver = _this.getReceivers().find(function (r) {
                        return r.track && r.track.id === te.track.id;
                      });
                    } else {
                      receiver = {
                        track: te.track
                      };
                    }

                    var event = new Event('track');
                    event.track = te.track;
                    event.receiver = receiver;
                    event.transceiver = {
                      receiver: receiver
                    };
                    event.streams = [e.stream];

                    _this.dispatchEvent(event);
                  });
                  e.stream.getTracks().forEach(function (track) {
                    var receiver = void 0;

                    if (window.RTCPeerConnection.prototype.getReceivers) {
                      receiver = _this.getReceivers().find(function (r) {
                        return r.track && r.track.id === track.id;
                      });
                    } else {
                      receiver = {
                        track: track
                      };
                    }

                    var event = new Event('track');
                    event.track = track;
                    event.receiver = receiver;
                    event.transceiver = {
                      receiver: receiver
                    };
                    event.streams = [e.stream];

                    _this.dispatchEvent(event);
                  });
                };

                this.addEventListener('addstream', this._ontrackpoly);
              }

              return origSetRemoteDescription.apply(this, arguments);
            };
          } else {
            // even if RTCRtpTransceiver is in window, it is only used and
            // emitted in unified-plan. Unfortunately this means we need
            // to unconditionally wrap the event.
            utils.wrapPeerConnectionEvent(window, 'track', function (e) {
              if (!e.transceiver) {
                Object.defineProperty(e, 'transceiver', {
                  value: {
                    receiver: e.receiver
                  }
                });
              }

              return e;
            });
          }
        }

        function shimGetSendersWithDtmf(window) {
          // Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
          if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && !('getSenders' in window.RTCPeerConnection.prototype) && 'createDTMFSender' in window.RTCPeerConnection.prototype) {
            var shimSenderWithDtmf = function shimSenderWithDtmf(pc, track) {
              return {
                track: track,

                get dtmf() {
                  if (this._dtmf === undefined) {
                    if (track.kind === 'audio') {
                      this._dtmf = pc.createDTMFSender(track);
                    } else {
                      this._dtmf = null;
                    }
                  }

                  return this._dtmf;
                },

                _pc: pc
              };
            }; // augment addTrack when getSenders is not available.


            if (!window.RTCPeerConnection.prototype.getSenders) {
              window.RTCPeerConnection.prototype.getSenders = function () {
                this._senders = this._senders || [];
                return this._senders.slice(); // return a copy of the internal state.
              };

              var origAddTrack = window.RTCPeerConnection.prototype.addTrack;

              window.RTCPeerConnection.prototype.addTrack = function (track, stream) {
                var sender = origAddTrack.apply(this, arguments);

                if (!sender) {
                  sender = shimSenderWithDtmf(this, track);

                  this._senders.push(sender);
                }

                return sender;
              };

              var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;

              window.RTCPeerConnection.prototype.removeTrack = function (sender) {
                origRemoveTrack.apply(this, arguments);

                var idx = this._senders.indexOf(sender);

                if (idx !== -1) {
                  this._senders.splice(idx, 1);
                }
              };
            }

            var origAddStream = window.RTCPeerConnection.prototype.addStream;

            window.RTCPeerConnection.prototype.addStream = function (stream) {
              var _this2 = this;

              this._senders = this._senders || [];
              origAddStream.apply(this, [stream]);
              stream.getTracks().forEach(function (track) {
                _this2._senders.push(shimSenderWithDtmf(_this2, track));
              });
            };

            var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;

            window.RTCPeerConnection.prototype.removeStream = function (stream) {
              var _this3 = this;

              this._senders = this._senders || [];
              origRemoveStream.apply(this, [stream]);
              stream.getTracks().forEach(function (track) {
                var sender = _this3._senders.find(function (s) {
                  return s.track === track;
                });

                if (sender) {
                  // remove sender
                  _this3._senders.splice(_this3._senders.indexOf(sender), 1);
                }
              });
            };
          } else if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && 'getSenders' in window.RTCPeerConnection.prototype && 'createDTMFSender' in window.RTCPeerConnection.prototype && window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
            var origGetSenders = window.RTCPeerConnection.prototype.getSenders;

            window.RTCPeerConnection.prototype.getSenders = function () {
              var _this4 = this;

              var senders = origGetSenders.apply(this, []);
              senders.forEach(function (sender) {
                return sender._pc = _this4;
              });
              return senders;
            };

            Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
              get: function get() {
                if (this._dtmf === undefined) {
                  if (this.track.kind === 'audio') {
                    this._dtmf = this._pc.createDTMFSender(this.track);
                  } else {
                    this._dtmf = null;
                  }
                }

                return this._dtmf;
              }
            });
          }
        }

        function shimSenderReceiverGetStats(window) {
          if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && window.RTCRtpSender && window.RTCRtpReceiver)) {
            return;
          } // shim sender stats.


          if (!('getStats' in window.RTCRtpSender.prototype)) {
            var origGetSenders = window.RTCPeerConnection.prototype.getSenders;

            if (origGetSenders) {
              window.RTCPeerConnection.prototype.getSenders = function () {
                var _this5 = this;

                var senders = origGetSenders.apply(this, []);
                senders.forEach(function (sender) {
                  return sender._pc = _this5;
                });
                return senders;
              };
            }

            var origAddTrack = window.RTCPeerConnection.prototype.addTrack;

            if (origAddTrack) {
              window.RTCPeerConnection.prototype.addTrack = function () {
                var sender = origAddTrack.apply(this, arguments);
                sender._pc = this;
                return sender;
              };
            }

            window.RTCRtpSender.prototype.getStats = function () {
              var sender = this;
              return this._pc.getStats().then(function (result) {
                return (
                  /* Note: this will include stats of all senders that
                   *   send a track with the same id as sender.track as
                   *   it is not possible to identify the RTCRtpSender.
                   */
                  filterStats(result, sender.track, true)
                );
              });
            };
          } // shim receiver stats.


          if (!('getStats' in window.RTCRtpReceiver.prototype)) {
            var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;

            if (origGetReceivers) {
              window.RTCPeerConnection.prototype.getReceivers = function () {
                var _this6 = this;

                var receivers = origGetReceivers.apply(this, []);
                receivers.forEach(function (receiver) {
                  return receiver._pc = _this6;
                });
                return receivers;
              };
            }

            utils.wrapPeerConnectionEvent(window, 'track', function (e) {
              e.receiver._pc = e.srcElement;
              return e;
            });

            window.RTCRtpReceiver.prototype.getStats = function () {
              var receiver = this;
              return this._pc.getStats().then(function (result) {
                return filterStats(result, receiver.track, false);
              });
            };
          }

          if (!('getStats' in window.RTCRtpSender.prototype && 'getStats' in window.RTCRtpReceiver.prototype)) {
            return;
          } // shim RTCPeerConnection.getStats(track).


          var origGetStats = window.RTCPeerConnection.prototype.getStats;

          window.RTCPeerConnection.prototype.getStats = function () {
            if (arguments.length > 0 && arguments[0] instanceof window.MediaStreamTrack) {
              var track = arguments[0];
              var sender = void 0;
              var receiver = void 0;
              var err = void 0;
              this.getSenders().forEach(function (s) {
                if (s.track === track) {
                  if (sender) {
                    err = true;
                  } else {
                    sender = s;
                  }
                }
              });
              this.getReceivers().forEach(function (r) {
                if (r.track === track) {
                  if (receiver) {
                    err = true;
                  } else {
                    receiver = r;
                  }
                }

                return r.track === track;
              });

              if (err || sender && receiver) {
                return Promise.reject(new DOMException('There are more than one sender or receiver for the track.', 'InvalidAccessError'));
              } else if (sender) {
                return sender.getStats();
              } else if (receiver) {
                return receiver.getStats();
              }

              return Promise.reject(new DOMException('There is no sender or receiver for the track.', 'InvalidAccessError'));
            }

            return origGetStats.apply(this, arguments);
          };
        }

        function shimAddTrackRemoveTrackWithNative(window) {
          // shim addTrack/removeTrack with native variants in order to make
          // the interactions with legacy getLocalStreams behave as in other browsers.
          // Keeps a mapping stream.id => [stream, rtpsenders...]
          window.RTCPeerConnection.prototype.getLocalStreams = function () {
            var _this7 = this;

            this._shimmedLocalStreams = this._shimmedLocalStreams || {};
            return Object.keys(this._shimmedLocalStreams).map(function (streamId) {
              return _this7._shimmedLocalStreams[streamId][0];
            });
          };

          var origAddTrack = window.RTCPeerConnection.prototype.addTrack;

          window.RTCPeerConnection.prototype.addTrack = function (track, stream) {
            if (!stream) {
              return origAddTrack.apply(this, arguments);
            }

            this._shimmedLocalStreams = this._shimmedLocalStreams || {};
            var sender = origAddTrack.apply(this, arguments);

            if (!this._shimmedLocalStreams[stream.id]) {
              this._shimmedLocalStreams[stream.id] = [stream, sender];
            } else if (this._shimmedLocalStreams[stream.id].indexOf(sender) === -1) {
              this._shimmedLocalStreams[stream.id].push(sender);
            }

            return sender;
          };

          var origAddStream = window.RTCPeerConnection.prototype.addStream;

          window.RTCPeerConnection.prototype.addStream = function (stream) {
            var _this8 = this;

            this._shimmedLocalStreams = this._shimmedLocalStreams || {};
            stream.getTracks().forEach(function (track) {
              var alreadyExists = _this8.getSenders().find(function (s) {
                return s.track === track;
              });

              if (alreadyExists) {
                throw new DOMException('Track already exists.', 'InvalidAccessError');
              }
            });
            var existingSenders = this.getSenders();
            origAddStream.apply(this, arguments);
            var newSenders = this.getSenders().filter(function (newSender) {
              return existingSenders.indexOf(newSender) === -1;
            });
            this._shimmedLocalStreams[stream.id] = [stream].concat(newSenders);
          };

          var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;

          window.RTCPeerConnection.prototype.removeStream = function (stream) {
            this._shimmedLocalStreams = this._shimmedLocalStreams || {};
            delete this._shimmedLocalStreams[stream.id];
            return origRemoveStream.apply(this, arguments);
          };

          var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;

          window.RTCPeerConnection.prototype.removeTrack = function (sender) {
            var _this9 = this;

            this._shimmedLocalStreams = this._shimmedLocalStreams || {};

            if (sender) {
              Object.keys(this._shimmedLocalStreams).forEach(function (streamId) {
                var idx = _this9._shimmedLocalStreams[streamId].indexOf(sender);

                if (idx !== -1) {
                  _this9._shimmedLocalStreams[streamId].splice(idx, 1);
                }

                if (_this9._shimmedLocalStreams[streamId].length === 1) {
                  delete _this9._shimmedLocalStreams[streamId];
                }
              });
            }

            return origRemoveTrack.apply(this, arguments);
          };
        }

        function shimAddTrackRemoveTrack(window) {
          if (!window.RTCPeerConnection) {
            return;
          }

          var browserDetails = utils.detectBrowser(window); // shim addTrack and removeTrack.

          if (window.RTCPeerConnection.prototype.addTrack && browserDetails.version >= 65) {
            return shimAddTrackRemoveTrackWithNative(window);
          } // also shim pc.getLocalStreams when addTrack is shimmed
          // to return the original streams.


          var origGetLocalStreams = window.RTCPeerConnection.prototype.getLocalStreams;

          window.RTCPeerConnection.prototype.getLocalStreams = function () {
            var _this10 = this;

            var nativeStreams = origGetLocalStreams.apply(this);
            this._reverseStreams = this._reverseStreams || {};
            return nativeStreams.map(function (stream) {
              return _this10._reverseStreams[stream.id];
            });
          };

          var origAddStream = window.RTCPeerConnection.prototype.addStream;

          window.RTCPeerConnection.prototype.addStream = function (stream) {
            var _this11 = this;

            this._streams = this._streams || {};
            this._reverseStreams = this._reverseStreams || {};
            stream.getTracks().forEach(function (track) {
              var alreadyExists = _this11.getSenders().find(function (s) {
                return s.track === track;
              });

              if (alreadyExists) {
                throw new DOMException('Track already exists.', 'InvalidAccessError');
              }
            }); // Add identity mapping for consistency with addTrack.
            // Unless this is being used with a stream from addTrack.

            if (!this._reverseStreams[stream.id]) {
              var newStream = new window.MediaStream(stream.getTracks());
              this._streams[stream.id] = newStream;
              this._reverseStreams[newStream.id] = stream;
              stream = newStream;
            }

            origAddStream.apply(this, [stream]);
          };

          var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;

          window.RTCPeerConnection.prototype.removeStream = function (stream) {
            this._streams = this._streams || {};
            this._reverseStreams = this._reverseStreams || {};
            origRemoveStream.apply(this, [this._streams[stream.id] || stream]);
            delete this._reverseStreams[this._streams[stream.id] ? this._streams[stream.id].id : stream.id];
            delete this._streams[stream.id];
          };

          window.RTCPeerConnection.prototype.addTrack = function (track, stream) {
            var _this12 = this;

            if (this.signalingState === 'closed') {
              throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
            }

            var streams = [].slice.call(arguments, 1);

            if (streams.length !== 1 || !streams[0].getTracks().find(function (t) {
              return t === track;
            })) {
              // this is not fully correct but all we can manage without
              // [[associated MediaStreams]] internal slot.
              throw new DOMException('The adapter.js addTrack polyfill only supports a single ' + ' stream which is associated with the specified track.', 'NotSupportedError');
            }

            var alreadyExists = this.getSenders().find(function (s) {
              return s.track === track;
            });

            if (alreadyExists) {
              throw new DOMException('Track already exists.', 'InvalidAccessError');
            }

            this._streams = this._streams || {};
            this._reverseStreams = this._reverseStreams || {};
            var oldStream = this._streams[stream.id];

            if (oldStream) {
              // this is using odd Chrome behaviour, use with caution:
              // https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
              // Note: we rely on the high-level addTrack/dtmf shim to
              // create the sender with a dtmf sender.
              oldStream.addTrack(track); // Trigger ONN async.

              Promise.resolve().then(function () {
                _this12.dispatchEvent(new Event('negotiationneeded'));
              });
            } else {
              var newStream = new window.MediaStream([track]);
              this._streams[stream.id] = newStream;
              this._reverseStreams[newStream.id] = stream;
              this.addStream(newStream);
            }

            return this.getSenders().find(function (s) {
              return s.track === track;
            });
          }; // replace the internal stream id with the external one and
          // vice versa.


          function replaceInternalStreamId(pc, description) {
            var sdp = description.sdp;
            Object.keys(pc._reverseStreams || []).forEach(function (internalId) {
              var externalStream = pc._reverseStreams[internalId];
              var internalStream = pc._streams[externalStream.id];
              sdp = sdp.replace(new RegExp(internalStream.id, 'g'), externalStream.id);
            });
            return new RTCSessionDescription({
              type: description.type,
              sdp: sdp
            });
          }

          function replaceExternalStreamId(pc, description) {
            var sdp = description.sdp;
            Object.keys(pc._reverseStreams || []).forEach(function (internalId) {
              var externalStream = pc._reverseStreams[internalId];
              var internalStream = pc._streams[externalStream.id];
              sdp = sdp.replace(new RegExp(externalStream.id, 'g'), internalStream.id);
            });
            return new RTCSessionDescription({
              type: description.type,
              sdp: sdp
            });
          }

          ['createOffer', 'createAnswer'].forEach(function (method) {
            var nativeMethod = window.RTCPeerConnection.prototype[method];

            window.RTCPeerConnection.prototype[method] = function () {
              var _this13 = this;

              var args = arguments;
              var isLegacyCall = arguments.length && typeof arguments[0] === 'function';

              if (isLegacyCall) {
                return nativeMethod.apply(this, [function (description) {
                  var desc = replaceInternalStreamId(_this13, description);
                  args[0].apply(null, [desc]);
                }, function (err) {
                  if (args[1]) {
                    args[1].apply(null, err);
                  }
                }, arguments[2]]);
              }

              return nativeMethod.apply(this, arguments).then(function (description) {
                return replaceInternalStreamId(_this13, description);
              });
            };
          });
          var origSetLocalDescription = window.RTCPeerConnection.prototype.setLocalDescription;

          window.RTCPeerConnection.prototype.setLocalDescription = function () {
            if (!arguments.length || !arguments[0].type) {
              return origSetLocalDescription.apply(this, arguments);
            }

            arguments[0] = replaceExternalStreamId(this, arguments[0]);
            return origSetLocalDescription.apply(this, arguments);
          }; // TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier


          var origLocalDescription = Object.getOwnPropertyDescriptor(window.RTCPeerConnection.prototype, 'localDescription');
          Object.defineProperty(window.RTCPeerConnection.prototype, 'localDescription', {
            get: function get() {
              var description = origLocalDescription.get.apply(this);

              if (description.type === '') {
                return description;
              }

              return replaceInternalStreamId(this, description);
            }
          });

          window.RTCPeerConnection.prototype.removeTrack = function (sender) {
            var _this14 = this;

            if (this.signalingState === 'closed') {
              throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
            } // We can not yet check for sender instanceof RTCRtpSender
            // since we shim RTPSender. So we check if sender._pc is set.


            if (!sender._pc) {
              throw new DOMException('Argument 1 of RTCPeerConnection.removeTrack ' + 'does not implement interface RTCRtpSender.', 'TypeError');
            }

            var isLocal = sender._pc === this;

            if (!isLocal) {
              throw new DOMException('Sender was not created by this connection.', 'InvalidAccessError');
            } // Search for the native stream the senders track belongs to.


            this._streams = this._streams || {};
            var stream = void 0;
            Object.keys(this._streams).forEach(function (streamid) {
              var hasTrack = _this14._streams[streamid].getTracks().find(function (track) {
                return sender.track === track;
              });

              if (hasTrack) {
                stream = _this14._streams[streamid];
              }
            });

            if (stream) {
              if (stream.getTracks().length === 1) {
                // if this is the last track of the stream, remove the stream. This
                // takes care of any shimmed _senders.
                this.removeStream(this._reverseStreams[stream.id]);
              } else {
                // relying on the same odd chrome behaviour as above.
                stream.removeTrack(sender.track);
              }

              this.dispatchEvent(new Event('negotiationneeded'));
            }
          };
        }

        function shimPeerConnection(window) {
          if (!window.RTCPeerConnection && window.webkitRTCPeerConnection) {
            // very basic support for old versions.
            window.RTCPeerConnection = window.webkitRTCPeerConnection;
          }

          if (!window.RTCPeerConnection) {
            return;
          }

          var origGetStats = window.RTCPeerConnection.prototype.getStats;

          window.RTCPeerConnection.prototype.getStats = function (selector, successCallback, errorCallback) {
            var _this15 = this;

            var args = arguments; // If selector is a function then we are in the old style stats so just
            // pass back the original getStats format to avoid breaking old users.

            if (arguments.length > 0 && typeof selector === 'function') {
              return origGetStats.apply(this, arguments);
            } // When spec-style getStats is supported, return those when called with
            // either no arguments or the selector argument is null.


            if (origGetStats.length === 0 && (arguments.length === 0 || typeof arguments[0] !== 'function')) {
              return origGetStats.apply(this, []);
            }

            var fixChromeStats_ = function fixChromeStats_(response) {
              var standardReport = {};
              var reports = response.result();
              reports.forEach(function (report) {
                var standardStats = {
                  id: report.id,
                  timestamp: report.timestamp,
                  type: {
                    localcandidate: 'local-candidate',
                    remotecandidate: 'remote-candidate'
                  }[report.type] || report.type
                };
                report.names().forEach(function (name) {
                  standardStats[name] = report.stat(name);
                });
                standardReport[standardStats.id] = standardStats;
              });
              return standardReport;
            }; // shim getStats with maplike support


            var makeMapStats = function makeMapStats(stats) {
              return new Map(Object.keys(stats).map(function (key) {
                return [key, stats[key]];
              }));
            };

            if (arguments.length >= 2) {
              var successCallbackWrapper_ = function successCallbackWrapper_(response) {
                args[1](makeMapStats(fixChromeStats_(response)));
              };

              return origGetStats.apply(this, [successCallbackWrapper_, arguments[0]]);
            } // promise-support


            return new Promise(function (resolve, reject) {
              origGetStats.apply(_this15, [function (response) {
                resolve(makeMapStats(fixChromeStats_(response)));
              }, reject]);
            }).then(successCallback, errorCallback);
          }; // shim implicit creation of RTCSessionDescription/RTCIceCandidate


          ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
            var nativeMethod = window.RTCPeerConnection.prototype[method];

            window.RTCPeerConnection.prototype[method] = function () {
              arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
              return nativeMethod.apply(this, arguments);
            };
          }); // support for addIceCandidate(null or undefined)

          var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;

          window.RTCPeerConnection.prototype.addIceCandidate = function () {
            if (!arguments[0]) {
              if (arguments[1]) {
                arguments[1].apply(null);
              }

              return Promise.resolve();
            }

            return nativeAddIceCandidate.apply(this, arguments);
          };
        }

        function fixNegotiationNeeded(window) {
          utils.wrapPeerConnectionEvent(window, 'negotiationneeded', function (e) {
            var pc = e.target;

            if (pc.signalingState !== 'stable') {
              return;
            }

            return e;
          });
        }
      }, {
        "../utils.js": 11,
        "./getdisplaymedia": 4,
        "./getusermedia": 5
      }],
      4: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.shimGetDisplayMedia = shimGetDisplayMedia;

        function shimGetDisplayMedia(window, getSourceId) {
          if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
            return;
          }

          if (!window.navigator.mediaDevices) {
            return;
          } // getSourceId is a function that returns a promise resolving with
          // the sourceId of the screen/window/tab to be shared.


          if (typeof getSourceId !== 'function') {
            console.error('shimGetDisplayMedia: getSourceId argument is not ' + 'a function');
            return;
          }

          window.navigator.mediaDevices.getDisplayMedia = function (constraints) {
            return getSourceId(constraints).then(function (sourceId) {
              var widthSpecified = constraints.video && constraints.video.width;
              var heightSpecified = constraints.video && constraints.video.height;
              var frameRateSpecified = constraints.video && constraints.video.frameRate;
              constraints.video = {
                mandatory: {
                  chromeMediaSource: 'desktop',
                  chromeMediaSourceId: sourceId,
                  maxFrameRate: frameRateSpecified || 3
                }
              };

              if (widthSpecified) {
                constraints.video.mandatory.maxWidth = widthSpecified;
              }

              if (heightSpecified) {
                constraints.video.mandatory.maxHeight = heightSpecified;
              }

              return window.navigator.mediaDevices.getUserMedia(constraints);
            });
          };
        }
      }, {}],
      5: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
          return typeof obj;
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };

        exports.shimGetUserMedia = shimGetUserMedia;

        var _utils = require('../utils.js');

        var utils = _interopRequireWildcard(_utils);

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};

            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
              }
            }

            newObj.default = obj;
            return newObj;
          }
        }

        var logging = utils.log;

        function shimGetUserMedia(window) {
          var navigator = window && window.navigator;

          if (!navigator.mediaDevices) {
            return;
          }

          var browserDetails = utils.detectBrowser(window);

          var constraintsToChrome_ = function constraintsToChrome_(c) {
            if ((typeof c === 'undefined' ? 'undefined' : _typeof(c)) !== 'object' || c.mandatory || c.optional) {
              return c;
            }

            var cc = {};
            Object.keys(c).forEach(function (key) {
              if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
                return;
              }

              var r = _typeof(c[key]) === 'object' ? c[key] : {
                ideal: c[key]
              };

              if (r.exact !== undefined && typeof r.exact === 'number') {
                r.min = r.max = r.exact;
              }

              var oldname_ = function oldname_(prefix, name) {
                if (prefix) {
                  return prefix + name.charAt(0).toUpperCase() + name.slice(1);
                }

                return name === 'deviceId' ? 'sourceId' : name;
              };

              if (r.ideal !== undefined) {
                cc.optional = cc.optional || [];
                var oc = {};

                if (typeof r.ideal === 'number') {
                  oc[oldname_('min', key)] = r.ideal;
                  cc.optional.push(oc);
                  oc = {};
                  oc[oldname_('max', key)] = r.ideal;
                  cc.optional.push(oc);
                } else {
                  oc[oldname_('', key)] = r.ideal;
                  cc.optional.push(oc);
                }
              }

              if (r.exact !== undefined && typeof r.exact !== 'number') {
                cc.mandatory = cc.mandatory || {};
                cc.mandatory[oldname_('', key)] = r.exact;
              } else {
                ['min', 'max'].forEach(function (mix) {
                  if (r[mix] !== undefined) {
                    cc.mandatory = cc.mandatory || {};
                    cc.mandatory[oldname_(mix, key)] = r[mix];
                  }
                });
              }
            });

            if (c.advanced) {
              cc.optional = (cc.optional || []).concat(c.advanced);
            }

            return cc;
          };

          var shimConstraints_ = function shimConstraints_(constraints, func) {
            if (browserDetails.version >= 61) {
              return func(constraints);
            }

            constraints = JSON.parse(JSON.stringify(constraints));

            if (constraints && _typeof(constraints.audio) === 'object') {
              var remap = function remap(obj, a, b) {
                if (a in obj && !(b in obj)) {
                  obj[b] = obj[a];
                  delete obj[a];
                }
              };

              constraints = JSON.parse(JSON.stringify(constraints));
              remap(constraints.audio, 'autoGainControl', 'googAutoGainControl');
              remap(constraints.audio, 'noiseSuppression', 'googNoiseSuppression');
              constraints.audio = constraintsToChrome_(constraints.audio);
            }

            if (constraints && _typeof(constraints.video) === 'object') {
              // Shim facingMode for mobile & surface pro.
              var face = constraints.video.facingMode;
              face = face && ((typeof face === 'undefined' ? 'undefined' : _typeof(face)) === 'object' ? face : {
                ideal: face
              });
              var getSupportedFacingModeLies = browserDetails.version < 66;

              if (face && (face.exact === 'user' || face.exact === 'environment' || face.ideal === 'user' || face.ideal === 'environment') && !(navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.getSupportedConstraints().facingMode && !getSupportedFacingModeLies)) {
                delete constraints.video.facingMode;
                var matches = void 0;

                if (face.exact === 'environment' || face.ideal === 'environment') {
                  matches = ['back', 'rear'];
                } else if (face.exact === 'user' || face.ideal === 'user') {
                  matches = ['front'];
                }

                if (matches) {
                  // Look for matches in label, or use last cam for back (typical).
                  return navigator.mediaDevices.enumerateDevices().then(function (devices) {
                    devices = devices.filter(function (d) {
                      return d.kind === 'videoinput';
                    });
                    var dev = devices.find(function (d) {
                      return matches.some(function (match) {
                        return d.label.toLowerCase().includes(match);
                      });
                    });

                    if (!dev && devices.length && matches.includes('back')) {
                      dev = devices[devices.length - 1]; // more likely the back cam
                    }

                    if (dev) {
                      constraints.video.deviceId = face.exact ? {
                        exact: dev.deviceId
                      } : {
                        ideal: dev.deviceId
                      };
                    }

                    constraints.video = constraintsToChrome_(constraints.video);
                    logging('chrome: ' + JSON.stringify(constraints));
                    return func(constraints);
                  });
                }
              }

              constraints.video = constraintsToChrome_(constraints.video);
            }

            logging('chrome: ' + JSON.stringify(constraints));
            return func(constraints);
          };

          var shimError_ = function shimError_(e) {
            if (browserDetails.version >= 64) {
              return e;
            }

            return {
              name: {
                PermissionDeniedError: 'NotAllowedError',
                PermissionDismissedError: 'NotAllowedError',
                InvalidStateError: 'NotAllowedError',
                DevicesNotFoundError: 'NotFoundError',
                ConstraintNotSatisfiedError: 'OverconstrainedError',
                TrackStartError: 'NotReadableError',
                MediaDeviceFailedDueToShutdown: 'NotAllowedError',
                MediaDeviceKillSwitchOn: 'NotAllowedError',
                TabCaptureError: 'AbortError',
                ScreenCaptureError: 'AbortError',
                DeviceCaptureError: 'AbortError'
              }[e.name] || e.name,
              message: e.message,
              constraint: e.constraint || e.constraintName,
              toString: function toString() {
                return this.name + (this.message && ': ') + this.message;
              }
            };
          };

          var getUserMedia_ = function getUserMedia_(constraints, onSuccess, onError) {
            shimConstraints_(constraints, function (c) {
              navigator.webkitGetUserMedia(c, onSuccess, function (e) {
                if (onError) {
                  onError(shimError_(e));
                }
              });
            });
          };

          navigator.getUserMedia = getUserMedia_.bind(navigator); // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
          // function which returns a Promise, it does not accept spec-style
          // constraints.

          var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);

          navigator.mediaDevices.getUserMedia = function (cs) {
            return shimConstraints_(cs, function (c) {
              return origGetUserMedia(c).then(function (stream) {
                if (c.audio && !stream.getAudioTracks().length || c.video && !stream.getVideoTracks().length) {
                  stream.getTracks().forEach(function (track) {
                    track.stop();
                  });
                  throw new DOMException('', 'NotFoundError');
                }

                return stream;
              }, function (e) {
                return Promise.reject(shimError_(e));
              });
            });
          };
        }
      }, {
        "../utils.js": 11
      }],
      6: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
          return typeof obj;
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };

        exports.shimRTCIceCandidate = shimRTCIceCandidate;
        exports.shimMaxMessageSize = shimMaxMessageSize;
        exports.shimSendThrowTypeError = shimSendThrowTypeError;
        exports.shimConnectionState = shimConnectionState;
        exports.removeAllowExtmapMixed = removeAllowExtmapMixed;

        var _sdp = require('sdp');

        var _sdp2 = _interopRequireDefault(_sdp);

        var _utils = require('./utils');

        var utils = _interopRequireWildcard(_utils);

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};

            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
              }
            }

            newObj.default = obj;
            return newObj;
          }
        }

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function shimRTCIceCandidate(window) {
          // foundation is arbitrarily chosen as an indicator for full support for
          // https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
          if (!window.RTCIceCandidate || window.RTCIceCandidate && 'foundation' in window.RTCIceCandidate.prototype) {
            return;
          }

          var NativeRTCIceCandidate = window.RTCIceCandidate;

          window.RTCIceCandidate = function (args) {
            // Remove the a= which shouldn't be part of the candidate string.
            if ((typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object' && args.candidate && args.candidate.indexOf('a=') === 0) {
              args = JSON.parse(JSON.stringify(args));
              args.candidate = args.candidate.substr(2);
            }

            if (args.candidate && args.candidate.length) {
              // Augment the native candidate with the parsed fields.
              var nativeCandidate = new NativeRTCIceCandidate(args);

              var parsedCandidate = _sdp2.default.parseCandidate(args.candidate);

              var augmentedCandidate = Object.assign(nativeCandidate, parsedCandidate); // Add a serializer that does not serialize the extra attributes.

              augmentedCandidate.toJSON = function () {
                return {
                  candidate: augmentedCandidate.candidate,
                  sdpMid: augmentedCandidate.sdpMid,
                  sdpMLineIndex: augmentedCandidate.sdpMLineIndex,
                  usernameFragment: augmentedCandidate.usernameFragment
                };
              };

              return augmentedCandidate;
            }

            return new NativeRTCIceCandidate(args);
          };

          window.RTCIceCandidate.prototype = NativeRTCIceCandidate.prototype; // Hook up the augmented candidate in onicecandidate and
          // addEventListener('icecandidate', ...)

          utils.wrapPeerConnectionEvent(window, 'icecandidate', function (e) {
            if (e.candidate) {
              Object.defineProperty(e, 'candidate', {
                value: new window.RTCIceCandidate(e.candidate),
                writable: 'false'
              });
            }

            return e;
          });
        }

        function shimMaxMessageSize(window) {
          if (window.RTCSctpTransport || !window.RTCPeerConnection) {
            return;
          }

          var browserDetails = utils.detectBrowser(window);

          if (!('sctp' in window.RTCPeerConnection.prototype)) {
            Object.defineProperty(window.RTCPeerConnection.prototype, 'sctp', {
              get: function get() {
                return typeof this._sctp === 'undefined' ? null : this._sctp;
              }
            });
          }

          var sctpInDescription = function sctpInDescription(description) {
            var sections = _sdp2.default.splitSections(description.sdp);

            sections.shift();
            return sections.some(function (mediaSection) {
              var mLine = _sdp2.default.parseMLine(mediaSection);

              return mLine && mLine.kind === 'application' && mLine.protocol.indexOf('SCTP') !== -1;
            });
          };

          var getRemoteFirefoxVersion = function getRemoteFirefoxVersion(description) {
            // TODO: Is there a better solution for detecting Firefox?
            var match = description.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);

            if (match === null || match.length < 2) {
              return -1;
            }

            var version = parseInt(match[1], 10); // Test for NaN (yes, this is ugly)

            return version !== version ? -1 : version;
          };

          var getCanSendMaxMessageSize = function getCanSendMaxMessageSize(remoteIsFirefox) {
            // Every implementation we know can send at least 64 KiB.
            // Note: Although Chrome is technically able to send up to 256 KiB, the
            //       data does not reach the other peer reliably.
            //       See: https://bugs.chromium.org/p/webrtc/issues/detail?id=8419
            var canSendMaxMessageSize = 65536;

            if (browserDetails.browser === 'firefox') {
              if (browserDetails.version < 57) {
                if (remoteIsFirefox === -1) {
                  // FF < 57 will send in 16 KiB chunks using the deprecated PPID
                  // fragmentation.
                  canSendMaxMessageSize = 16384;
                } else {
                  // However, other FF (and RAWRTC) can reassemble PPID-fragmented
                  // messages. Thus, supporting ~2 GiB when sending.
                  canSendMaxMessageSize = 2147483637;
                }
              } else if (browserDetails.version < 60) {
                // Currently, all FF >= 57 will reset the remote maximum message size
                // to the default value when a data channel is created at a later
                // stage. :(
                // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
                canSendMaxMessageSize = browserDetails.version === 57 ? 65535 : 65536;
              } else {
                // FF >= 60 supports sending ~2 GiB
                canSendMaxMessageSize = 2147483637;
              }
            }

            return canSendMaxMessageSize;
          };

          var getMaxMessageSize = function getMaxMessageSize(description, remoteIsFirefox) {
            // Note: 65536 bytes is the default value from the SDP spec. Also,
            //       every implementation we know supports receiving 65536 bytes.
            var maxMessageSize = 65536; // FF 57 has a slightly incorrect default remote max message size, so
            // we need to adjust it here to avoid a failure when sending.
            // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1425697

            if (browserDetails.browser === 'firefox' && browserDetails.version === 57) {
              maxMessageSize = 65535;
            }

            var match = _sdp2.default.matchPrefix(description.sdp, 'a=max-message-size:');

            if (match.length > 0) {
              maxMessageSize = parseInt(match[0].substr(19), 10);
            } else if (browserDetails.browser === 'firefox' && remoteIsFirefox !== -1) {
              // If the maximum message size is not present in the remote SDP and
              // both local and remote are Firefox, the remote peer can receive
              // ~2 GiB.
              maxMessageSize = 2147483637;
            }

            return maxMessageSize;
          };

          var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;

          window.RTCPeerConnection.prototype.setRemoteDescription = function () {
            this._sctp = null;

            if (sctpInDescription(arguments[0])) {
              // Check if the remote is FF.
              var isFirefox = getRemoteFirefoxVersion(arguments[0]); // Get the maximum message size the local peer is capable of sending

              var canSendMMS = getCanSendMaxMessageSize(isFirefox); // Get the maximum message size of the remote peer.

              var remoteMMS = getMaxMessageSize(arguments[0], isFirefox); // Determine final maximum message size

              var maxMessageSize = void 0;

              if (canSendMMS === 0 && remoteMMS === 0) {
                maxMessageSize = Number.POSITIVE_INFINITY;
              } else if (canSendMMS === 0 || remoteMMS === 0) {
                maxMessageSize = Math.max(canSendMMS, remoteMMS);
              } else {
                maxMessageSize = Math.min(canSendMMS, remoteMMS);
              } // Create a dummy RTCSctpTransport object and the 'maxMessageSize'
              // attribute.


              var sctp = {};
              Object.defineProperty(sctp, 'maxMessageSize', {
                get: function get() {
                  return maxMessageSize;
                }
              });
              this._sctp = sctp;
            }

            return origSetRemoteDescription.apply(this, arguments);
          };
        }

        function shimSendThrowTypeError(window) {
          if (!(window.RTCPeerConnection && 'createDataChannel' in window.RTCPeerConnection.prototype)) {
            return;
          } // Note: Although Firefox >= 57 has a native implementation, the maximum
          //       message size can be reset for all data channels at a later stage.
          //       See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831


          function wrapDcSend(dc, pc) {
            var origDataChannelSend = dc.send;

            dc.send = function () {
              var data = arguments[0];
              var length = data.length || data.size || data.byteLength;

              if (dc.readyState === 'open' && pc.sctp && length > pc.sctp.maxMessageSize) {
                throw new TypeError('Message too large (can send a maximum of ' + pc.sctp.maxMessageSize + ' bytes)');
              }

              return origDataChannelSend.apply(dc, arguments);
            };
          }

          var origCreateDataChannel = window.RTCPeerConnection.prototype.createDataChannel;

          window.RTCPeerConnection.prototype.createDataChannel = function () {
            var dataChannel = origCreateDataChannel.apply(this, arguments);
            wrapDcSend(dataChannel, this);
            return dataChannel;
          };

          utils.wrapPeerConnectionEvent(window, 'datachannel', function (e) {
            wrapDcSend(e.channel, e.target);
            return e;
          });
        }
        /* shims RTCConnectionState by pretending it is the same as iceConnectionState.
         * See https://bugs.chromium.org/p/webrtc/issues/detail?id=6145#c12
         * for why this is a valid hack in Chrome. In Firefox it is slightly incorrect
         * since DTLS failures would be hidden. See
         * https://bugzilla.mozilla.org/show_bug.cgi?id=1265827
         * for the Firefox tracking bug.
         */


        function shimConnectionState(window) {
          if (!window.RTCPeerConnection || 'connectionState' in window.RTCPeerConnection.prototype) {
            return;
          }

          var proto = window.RTCPeerConnection.prototype;
          Object.defineProperty(proto, 'connectionState', {
            get: function get() {
              return {
                completed: 'connected',
                checking: 'connecting'
              }[this.iceConnectionState] || this.iceConnectionState;
            },
            enumerable: true,
            configurable: true
          });
          Object.defineProperty(proto, 'onconnectionstatechange', {
            get: function get() {
              return this._onconnectionstatechange || null;
            },
            set: function set(cb) {
              if (this._onconnectionstatechange) {
                this.removeEventListener('connectionstatechange', this._onconnectionstatechange);
                delete this._onconnectionstatechange;
              }

              if (cb) {
                this.addEventListener('connectionstatechange', this._onconnectionstatechange = cb);
              }
            },
            enumerable: true,
            configurable: true
          });
          ['setLocalDescription', 'setRemoteDescription'].forEach(function (method) {
            var origMethod = proto[method];

            proto[method] = function () {
              if (!this._connectionstatechangepoly) {
                this._connectionstatechangepoly = function (e) {
                  var pc = e.target;

                  if (pc._lastConnectionState !== pc.connectionState) {
                    pc._lastConnectionState = pc.connectionState;
                    var newEvent = new Event('connectionstatechange', e);
                    pc.dispatchEvent(newEvent);
                  }

                  return e;
                };

                this.addEventListener('iceconnectionstatechange', this._connectionstatechangepoly);
              }

              return origMethod.apply(this, arguments);
            };
          });
        }

        function removeAllowExtmapMixed(window) {
          /* remove a=extmap-allow-mixed for Chrome < M71 */
          if (!window.RTCPeerConnection) {
            return;
          }

          var browserDetails = utils.detectBrowser(window);

          if (browserDetails.browser === 'chrome' && browserDetails.version >= 71) {
            return;
          }

          var nativeSRD = window.RTCPeerConnection.prototype.setRemoteDescription;

          window.RTCPeerConnection.prototype.setRemoteDescription = function (desc) {
            if (desc && desc.sdp && desc.sdp.indexOf('\na=extmap-allow-mixed') !== -1) {
              desc.sdp = desc.sdp.split('\n').filter(function (line) {
                return line.trim() !== 'a=extmap-allow-mixed';
              }).join('\n');
            }

            return nativeSRD.apply(this, arguments);
          };
        }
      }, {
        "./utils": 11,
        "sdp": 13
      }],
      7: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
          return typeof obj;
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };

        var _getusermedia = require('./getusermedia');

        Object.defineProperty(exports, 'shimGetUserMedia', {
          enumerable: true,
          get: function get() {
            return _getusermedia.shimGetUserMedia;
          }
        });

        var _getdisplaymedia = require('./getdisplaymedia');

        Object.defineProperty(exports, 'shimGetDisplayMedia', {
          enumerable: true,
          get: function get() {
            return _getdisplaymedia.shimGetDisplayMedia;
          }
        });
        exports.shimOnTrack = shimOnTrack;
        exports.shimPeerConnection = shimPeerConnection;
        exports.shimSenderGetStats = shimSenderGetStats;
        exports.shimReceiverGetStats = shimReceiverGetStats;
        exports.shimRemoveStream = shimRemoveStream;
        exports.shimRTCDataChannel = shimRTCDataChannel;

        var _utils = require('../utils');

        var utils = _interopRequireWildcard(_utils);

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};

            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
              }
            }

            newObj.default = obj;
            return newObj;
          }
        }

        function shimOnTrack(window) {
          if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCTrackEvent && 'receiver' in window.RTCTrackEvent.prototype && !('transceiver' in window.RTCTrackEvent.prototype)) {
            Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
              get: function get() {
                return {
                  receiver: this.receiver
                };
              }
            });
          }
        }

        function shimPeerConnection(window) {
          var browserDetails = utils.detectBrowser(window);

          if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !(window.RTCPeerConnection || window.mozRTCPeerConnection)) {
            return; // probably media.peerconnection.enabled=false in about:config
          }

          if (!window.RTCPeerConnection && window.mozRTCPeerConnection) {
            // very basic support for old versions.
            window.RTCPeerConnection = window.mozRTCPeerConnection;
          } // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.


          ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
            var nativeMethod = window.RTCPeerConnection.prototype[method];

            window.RTCPeerConnection.prototype[method] = function () {
              arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
              return nativeMethod.apply(this, arguments);
            };
          }); // support for addIceCandidate(null or undefined)

          var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;

          window.RTCPeerConnection.prototype.addIceCandidate = function () {
            if (!arguments[0]) {
              if (arguments[1]) {
                arguments[1].apply(null);
              }

              return Promise.resolve();
            }

            return nativeAddIceCandidate.apply(this, arguments);
          };

          var modernStatsTypes = {
            inboundrtp: 'inbound-rtp',
            outboundrtp: 'outbound-rtp',
            candidatepair: 'candidate-pair',
            localcandidate: 'local-candidate',
            remotecandidate: 'remote-candidate'
          };
          var nativeGetStats = window.RTCPeerConnection.prototype.getStats;

          window.RTCPeerConnection.prototype.getStats = function (selector, onSucc, onErr) {
            return nativeGetStats.apply(this, [selector || null]).then(function (stats) {
              if (browserDetails.version < 53 && !onSucc) {
                // Shim only promise getStats with spec-hyphens in type names
                // Leave callback version alone; misc old uses of forEach before Map
                try {
                  stats.forEach(function (stat) {
                    stat.type = modernStatsTypes[stat.type] || stat.type;
                  });
                } catch (e) {
                  if (e.name !== 'TypeError') {
                    throw e;
                  } // Avoid TypeError: "type" is read-only, in old versions. 34-43ish


                  stats.forEach(function (stat, i) {
                    stats.set(i, Object.assign({}, stat, {
                      type: modernStatsTypes[stat.type] || stat.type
                    }));
                  });
                }
              }

              return stats;
            }).then(onSucc, onErr);
          };
        }

        function shimSenderGetStats(window) {
          if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) {
            return;
          }

          if (window.RTCRtpSender && 'getStats' in window.RTCRtpSender.prototype) {
            return;
          }

          var origGetSenders = window.RTCPeerConnection.prototype.getSenders;

          if (origGetSenders) {
            window.RTCPeerConnection.prototype.getSenders = function () {
              var _this = this;

              var senders = origGetSenders.apply(this, []);
              senders.forEach(function (sender) {
                return sender._pc = _this;
              });
              return senders;
            };
          }

          var origAddTrack = window.RTCPeerConnection.prototype.addTrack;

          if (origAddTrack) {
            window.RTCPeerConnection.prototype.addTrack = function () {
              var sender = origAddTrack.apply(this, arguments);
              sender._pc = this;
              return sender;
            };
          }

          window.RTCRtpSender.prototype.getStats = function () {
            return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map());
          };
        }

        function shimReceiverGetStats(window) {
          if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) {
            return;
          }

          if (window.RTCRtpSender && 'getStats' in window.RTCRtpReceiver.prototype) {
            return;
          }

          var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;

          if (origGetReceivers) {
            window.RTCPeerConnection.prototype.getReceivers = function () {
              var _this2 = this;

              var receivers = origGetReceivers.apply(this, []);
              receivers.forEach(function (receiver) {
                return receiver._pc = _this2;
              });
              return receivers;
            };
          }

          utils.wrapPeerConnectionEvent(window, 'track', function (e) {
            e.receiver._pc = e.srcElement;
            return e;
          });

          window.RTCRtpReceiver.prototype.getStats = function () {
            return this._pc.getStats(this.track);
          };
        }

        function shimRemoveStream(window) {
          if (!window.RTCPeerConnection || 'removeStream' in window.RTCPeerConnection.prototype) {
            return;
          }

          window.RTCPeerConnection.prototype.removeStream = function (stream) {
            var _this3 = this;

            utils.deprecated('removeStream', 'removeTrack');
            this.getSenders().forEach(function (sender) {
              if (sender.track && stream.getTracks().includes(sender.track)) {
                _this3.removeTrack(sender);
              }
            });
          };
        }

        function shimRTCDataChannel(window) {
          // rename DataChannel to RTCDataChannel (native fix in FF60):
          // https://bugzilla.mozilla.org/show_bug.cgi?id=1173851
          if (window.DataChannel && !window.RTCDataChannel) {
            window.RTCDataChannel = window.DataChannel;
          }
        }
      }, {
        "../utils": 11,
        "./getdisplaymedia": 8,
        "./getusermedia": 9
      }],
      8: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.shimGetDisplayMedia = shimGetDisplayMedia;

        function shimGetDisplayMedia(window, preferredMediaSource) {
          if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
            return;
          }

          if (!window.navigator.mediaDevices) {
            return;
          }

          window.navigator.mediaDevices.getDisplayMedia = function (constraints) {
            if (!(constraints && constraints.video)) {
              var err = new DOMException('getDisplayMedia without video ' + 'constraints is undefined');
              err.name = 'NotFoundError'; // from https://heycam.github.io/webidl/#idl-DOMException-error-names

              err.code = 8;
              return Promise.reject(err);
            }

            if (constraints.video === true) {
              constraints.video = {
                mediaSource: preferredMediaSource
              };
            } else {
              constraints.video.mediaSource = preferredMediaSource;
            }

            return window.navigator.mediaDevices.getUserMedia(constraints);
          };
        }
      }, {}],
      9: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
          return typeof obj;
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };

        exports.shimGetUserMedia = shimGetUserMedia;

        var _utils = require('../utils');

        var utils = _interopRequireWildcard(_utils);

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};

            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
              }
            }

            newObj.default = obj;
            return newObj;
          }
        }

        function shimGetUserMedia(window) {
          var browserDetails = utils.detectBrowser(window);
          var navigator = window && window.navigator;
          var MediaStreamTrack = window && window.MediaStreamTrack;

          navigator.getUserMedia = function (constraints, onSuccess, onError) {
            // Replace Firefox 44+'s deprecation warning with unprefixed version.
            utils.deprecated('navigator.getUserMedia', 'navigator.mediaDevices.getUserMedia');
            navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
          };

          if (!(browserDetails.version > 55 && 'autoGainControl' in navigator.mediaDevices.getSupportedConstraints())) {
            var remap = function remap(obj, a, b) {
              if (a in obj && !(b in obj)) {
                obj[b] = obj[a];
                delete obj[a];
              }
            };

            var nativeGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);

            navigator.mediaDevices.getUserMedia = function (c) {
              if ((typeof c === 'undefined' ? 'undefined' : _typeof(c)) === 'object' && _typeof(c.audio) === 'object') {
                c = JSON.parse(JSON.stringify(c));
                remap(c.audio, 'autoGainControl', 'mozAutoGainControl');
                remap(c.audio, 'noiseSuppression', 'mozNoiseSuppression');
              }

              return nativeGetUserMedia(c);
            };

            if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
              var nativeGetSettings = MediaStreamTrack.prototype.getSettings;

              MediaStreamTrack.prototype.getSettings = function () {
                var obj = nativeGetSettings.apply(this, arguments);
                remap(obj, 'mozAutoGainControl', 'autoGainControl');
                remap(obj, 'mozNoiseSuppression', 'noiseSuppression');
                return obj;
              };
            }

            if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
              var nativeApplyConstraints = MediaStreamTrack.prototype.applyConstraints;

              MediaStreamTrack.prototype.applyConstraints = function (c) {
                if (this.kind === 'audio' && (typeof c === 'undefined' ? 'undefined' : _typeof(c)) === 'object') {
                  c = JSON.parse(JSON.stringify(c));
                  remap(c, 'autoGainControl', 'mozAutoGainControl');
                  remap(c, 'noiseSuppression', 'mozNoiseSuppression');
                }

                return nativeApplyConstraints.apply(this, [c]);
              };
            }
          }
        }
      }, {
        "../utils": 11
      }],
      10: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
          return typeof obj;
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };

        exports.shimLocalStreamsAPI = shimLocalStreamsAPI;
        exports.shimRemoteStreamsAPI = shimRemoteStreamsAPI;
        exports.shimCallbacksAPI = shimCallbacksAPI;
        exports.shimGetUserMedia = shimGetUserMedia;
        exports.shimConstraints = shimConstraints;
        exports.shimRTCIceServerUrls = shimRTCIceServerUrls;
        exports.shimTrackEventTransceiver = shimTrackEventTransceiver;
        exports.shimCreateOfferLegacy = shimCreateOfferLegacy;

        var _utils = require('../utils');

        var utils = _interopRequireWildcard(_utils);

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};

            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
              }
            }

            newObj.default = obj;
            return newObj;
          }
        }

        function shimLocalStreamsAPI(window) {
          if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !window.RTCPeerConnection) {
            return;
          }

          if (!('getLocalStreams' in window.RTCPeerConnection.prototype)) {
            window.RTCPeerConnection.prototype.getLocalStreams = function () {
              if (!this._localStreams) {
                this._localStreams = [];
              }

              return this._localStreams;
            };
          }

          if (!('addStream' in window.RTCPeerConnection.prototype)) {
            var _addTrack = window.RTCPeerConnection.prototype.addTrack;

            window.RTCPeerConnection.prototype.addStream = function (stream) {
              var _this = this;

              if (!this._localStreams) {
                this._localStreams = [];
              }

              if (!this._localStreams.includes(stream)) {
                this._localStreams.push(stream);
              }

              stream.getTracks().forEach(function (track) {
                return _addTrack.call(_this, track, stream);
              });
            };

            window.RTCPeerConnection.prototype.addTrack = function (track, stream) {
              if (stream) {
                if (!this._localStreams) {
                  this._localStreams = [stream];
                } else if (!this._localStreams.includes(stream)) {
                  this._localStreams.push(stream);
                }
              }

              return _addTrack.call(this, track, stream);
            };
          }

          if (!('removeStream' in window.RTCPeerConnection.prototype)) {
            window.RTCPeerConnection.prototype.removeStream = function (stream) {
              var _this2 = this;

              if (!this._localStreams) {
                this._localStreams = [];
              }

              var index = this._localStreams.indexOf(stream);

              if (index === -1) {
                return;
              }

              this._localStreams.splice(index, 1);

              var tracks = stream.getTracks();
              this.getSenders().forEach(function (sender) {
                if (tracks.includes(sender.track)) {
                  _this2.removeTrack(sender);
                }
              });
            };
          }
        }

        function shimRemoteStreamsAPI(window) {
          if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !window.RTCPeerConnection) {
            return;
          }

          if (!('getRemoteStreams' in window.RTCPeerConnection.prototype)) {
            window.RTCPeerConnection.prototype.getRemoteStreams = function () {
              return this._remoteStreams ? this._remoteStreams : [];
            };
          }

          if (!('onaddstream' in window.RTCPeerConnection.prototype)) {
            Object.defineProperty(window.RTCPeerConnection.prototype, 'onaddstream', {
              get: function get() {
                return this._onaddstream;
              },
              set: function set(f) {
                var _this3 = this;

                if (this._onaddstream) {
                  this.removeEventListener('addstream', this._onaddstream);
                  this.removeEventListener('track', this._onaddstreampoly);
                }

                this.addEventListener('addstream', this._onaddstream = f);
                this.addEventListener('track', this._onaddstreampoly = function (e) {
                  e.streams.forEach(function (stream) {
                    if (!_this3._remoteStreams) {
                      _this3._remoteStreams = [];
                    }

                    if (_this3._remoteStreams.includes(stream)) {
                      return;
                    }

                    _this3._remoteStreams.push(stream);

                    var event = new Event('addstream');
                    event.stream = stream;

                    _this3.dispatchEvent(event);
                  });
                });
              }
            });
            var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;

            window.RTCPeerConnection.prototype.setRemoteDescription = function () {
              var pc = this;

              if (!this._onaddstreampoly) {
                this.addEventListener('track', this._onaddstreampoly = function (e) {
                  e.streams.forEach(function (stream) {
                    if (!pc._remoteStreams) {
                      pc._remoteStreams = [];
                    }

                    if (pc._remoteStreams.indexOf(stream) >= 0) {
                      return;
                    }

                    pc._remoteStreams.push(stream);

                    var event = new Event('addstream');
                    event.stream = stream;
                    pc.dispatchEvent(event);
                  });
                });
              }

              return origSetRemoteDescription.apply(pc, arguments);
            };
          }
        }

        function shimCallbacksAPI(window) {
          if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !window.RTCPeerConnection) {
            return;
          }

          var prototype = window.RTCPeerConnection.prototype;
          var createOffer = prototype.createOffer;
          var createAnswer = prototype.createAnswer;
          var setLocalDescription = prototype.setLocalDescription;
          var setRemoteDescription = prototype.setRemoteDescription;
          var addIceCandidate = prototype.addIceCandidate;

          prototype.createOffer = function (successCallback, failureCallback) {
            var options = arguments.length >= 2 ? arguments[2] : arguments[0];
            var promise = createOffer.apply(this, [options]);

            if (!failureCallback) {
              return promise;
            }

            promise.then(successCallback, failureCallback);
            return Promise.resolve();
          };

          prototype.createAnswer = function (successCallback, failureCallback) {
            var options = arguments.length >= 2 ? arguments[2] : arguments[0];
            var promise = createAnswer.apply(this, [options]);

            if (!failureCallback) {
              return promise;
            }

            promise.then(successCallback, failureCallback);
            return Promise.resolve();
          };

          var withCallback = function withCallback(description, successCallback, failureCallback) {
            var promise = setLocalDescription.apply(this, [description]);

            if (!failureCallback) {
              return promise;
            }

            promise.then(successCallback, failureCallback);
            return Promise.resolve();
          };

          prototype.setLocalDescription = withCallback;

          withCallback = function withCallback(description, successCallback, failureCallback) {
            var promise = setRemoteDescription.apply(this, [description]);

            if (!failureCallback) {
              return promise;
            }

            promise.then(successCallback, failureCallback);
            return Promise.resolve();
          };

          prototype.setRemoteDescription = withCallback;

          withCallback = function withCallback(candidate, successCallback, failureCallback) {
            var promise = addIceCandidate.apply(this, [candidate]);

            if (!failureCallback) {
              return promise;
            }

            promise.then(successCallback, failureCallback);
            return Promise.resolve();
          };

          prototype.addIceCandidate = withCallback;
        }

        function shimGetUserMedia(window) {
          var navigator = window && window.navigator;

          if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // shim not needed in Safari 12.1
            var mediaDevices = navigator.mediaDevices;

            var _getUserMedia = mediaDevices.getUserMedia.bind(mediaDevices);

            navigator.mediaDevices.getUserMedia = function (constraints) {
              return _getUserMedia(shimConstraints(constraints));
            };
          }

          if (!navigator.getUserMedia && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.getUserMedia = function (constraints, cb, errcb) {
              navigator.mediaDevices.getUserMedia(constraints).then(cb, errcb);
            }.bind(navigator);
          }
        }

        function shimConstraints(constraints) {
          if (constraints && constraints.video !== undefined) {
            return Object.assign({}, constraints, {
              video: utils.compactObject(constraints.video)
            });
          }

          return constraints;
        }

        function shimRTCIceServerUrls(window) {
          // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
          var OrigPeerConnection = window.RTCPeerConnection;

          window.RTCPeerConnection = function (pcConfig, pcConstraints) {
            if (pcConfig && pcConfig.iceServers) {
              var newIceServers = [];

              for (var i = 0; i < pcConfig.iceServers.length; i++) {
                var server = pcConfig.iceServers[i];

                if (!server.hasOwnProperty('urls') && server.hasOwnProperty('url')) {
                  utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
                  server = JSON.parse(JSON.stringify(server));
                  server.urls = server.url;
                  delete server.url;
                  newIceServers.push(server);
                } else {
                  newIceServers.push(pcConfig.iceServers[i]);
                }
              }

              pcConfig.iceServers = newIceServers;
            }

            return new OrigPeerConnection(pcConfig, pcConstraints);
          };

          window.RTCPeerConnection.prototype = OrigPeerConnection.prototype; // wrap static methods. Currently just generateCertificate.

          if ('generateCertificate' in window.RTCPeerConnection) {
            Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
              get: function get() {
                return OrigPeerConnection.generateCertificate;
              }
            });
          }
        }

        function shimTrackEventTransceiver(window) {
          // Add event.transceiver member over deprecated event.receiver
          if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && 'receiver' in window.RTCTrackEvent.prototype && // can't check 'transceiver' in window.RTCTrackEvent.prototype, as it is
          // defined for some reason even when window.RTCTransceiver is not.
          !window.RTCTransceiver) {
            Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
              get: function get() {
                return {
                  receiver: this.receiver
                };
              }
            });
          }
        }

        function shimCreateOfferLegacy(window) {
          var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;

          window.RTCPeerConnection.prototype.createOffer = function (offerOptions) {
            if (offerOptions) {
              if (typeof offerOptions.offerToReceiveAudio !== 'undefined') {
                // support bit values
                offerOptions.offerToReceiveAudio = !!offerOptions.offerToReceiveAudio;
              }

              var audioTransceiver = this.getTransceivers().find(function (transceiver) {
                return transceiver.sender.track && transceiver.sender.track.kind === 'audio';
              });

              if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
                if (audioTransceiver.direction === 'sendrecv') {
                  if (audioTransceiver.setDirection) {
                    audioTransceiver.setDirection('sendonly');
                  } else {
                    audioTransceiver.direction = 'sendonly';
                  }
                } else if (audioTransceiver.direction === 'recvonly') {
                  if (audioTransceiver.setDirection) {
                    audioTransceiver.setDirection('inactive');
                  } else {
                    audioTransceiver.direction = 'inactive';
                  }
                }
              } else if (offerOptions.offerToReceiveAudio === true && !audioTransceiver) {
                this.addTransceiver('audio');
              }

              if (typeof offerOptions.offerToReceiveVideo !== 'undefined') {
                // support bit values
                offerOptions.offerToReceiveVideo = !!offerOptions.offerToReceiveVideo;
              }

              var videoTransceiver = this.getTransceivers().find(function (transceiver) {
                return transceiver.sender.track && transceiver.sender.track.kind === 'video';
              });

              if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
                if (videoTransceiver.direction === 'sendrecv') {
                  if (videoTransceiver.setDirection) {
                    videoTransceiver.setDirection('sendonly');
                  } else {
                    videoTransceiver.direction = 'sendonly';
                  }
                } else if (videoTransceiver.direction === 'recvonly') {
                  if (videoTransceiver.setDirection) {
                    videoTransceiver.setDirection('inactive');
                  } else {
                    videoTransceiver.direction = 'inactive';
                  }
                }
              } else if (offerOptions.offerToReceiveVideo === true && !videoTransceiver) {
                this.addTransceiver('video');
              }
            }

            return origCreateOffer.apply(this, arguments);
          };
        }
      }, {
        "../utils": 11
      }],
      11: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
          return typeof obj;
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };

        exports.extractVersion = extractVersion;
        exports.wrapPeerConnectionEvent = wrapPeerConnectionEvent;
        exports.disableLog = disableLog;
        exports.disableWarnings = disableWarnings;
        exports.log = log;
        exports.deprecated = deprecated;
        exports.detectBrowser = detectBrowser;
        exports.compactObject = compactObject;

        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }

          return obj;
        }

        var logDisabled_ = true;
        var deprecationWarnings_ = true;
        /**
         * Extract browser version out of the provided user agent string.
         *
         * @param {!string} uastring userAgent string.
         * @param {!string} expr Regular expression used as match criteria.
         * @param {!number} pos position in the version string to be returned.
         * @return {!number} browser version.
         */

        function extractVersion(uastring, expr, pos) {
          var match = uastring.match(expr);
          return match && match.length >= pos && parseInt(match[pos], 10);
        } // Wraps the peerconnection event eventNameToWrap in a function
        // which returns the modified event object (or false to prevent
        // the event).


        function wrapPeerConnectionEvent(window, eventNameToWrap, wrapper) {
          if (!window.RTCPeerConnection) {
            return;
          }

          var proto = window.RTCPeerConnection.prototype;
          var nativeAddEventListener = proto.addEventListener;

          proto.addEventListener = function (nativeEventName, cb) {
            if (nativeEventName !== eventNameToWrap) {
              return nativeAddEventListener.apply(this, arguments);
            }

            var wrappedCallback = function wrappedCallback(e) {
              var modifiedEvent = wrapper(e);

              if (modifiedEvent) {
                cb(modifiedEvent);
              }
            };

            this._eventMap = this._eventMap || {};
            this._eventMap[cb] = wrappedCallback;
            return nativeAddEventListener.apply(this, [nativeEventName, wrappedCallback]);
          };

          var nativeRemoveEventListener = proto.removeEventListener;

          proto.removeEventListener = function (nativeEventName, cb) {
            if (nativeEventName !== eventNameToWrap || !this._eventMap || !this._eventMap[cb]) {
              return nativeRemoveEventListener.apply(this, arguments);
            }

            var unwrappedCb = this._eventMap[cb];
            delete this._eventMap[cb];
            return nativeRemoveEventListener.apply(this, [nativeEventName, unwrappedCb]);
          };

          Object.defineProperty(proto, 'on' + eventNameToWrap, {
            get: function get() {
              return this['_on' + eventNameToWrap];
            },
            set: function set(cb) {
              if (this['_on' + eventNameToWrap]) {
                this.removeEventListener(eventNameToWrap, this['_on' + eventNameToWrap]);
                delete this['_on' + eventNameToWrap];
              }

              if (cb) {
                this.addEventListener(eventNameToWrap, this['_on' + eventNameToWrap] = cb);
              }
            },
            enumerable: true,
            configurable: true
          });
        }

        function disableLog(bool) {
          if (typeof bool !== 'boolean') {
            return new Error('Argument type: ' + (typeof bool === 'undefined' ? 'undefined' : _typeof(bool)) + '. Please use a boolean.');
          }

          logDisabled_ = bool;
          return bool ? 'adapter.js logging disabled' : 'adapter.js logging enabled';
        }
        /**
         * Disable or enable deprecation warnings
         * @param {!boolean} bool set to true to disable warnings.
         */


        function disableWarnings(bool) {
          if (typeof bool !== 'boolean') {
            return new Error('Argument type: ' + (typeof bool === 'undefined' ? 'undefined' : _typeof(bool)) + '. Please use a boolean.');
          }

          deprecationWarnings_ = !bool;
          return 'adapter.js deprecation warnings ' + (bool ? 'disabled' : 'enabled');
        }

        function log() {
          if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
            if (logDisabled_) {
              return;
            }

            if (typeof console !== 'undefined' && typeof console.log === 'function') {
              console.log.apply(console, arguments);
            }
          }
        }
        /**
         * Shows a deprecation warning suggesting the modern and spec-compatible API.
         */


        function deprecated(oldMethod, newMethod) {
          if (!deprecationWarnings_) {
            return;
          }

          console.warn(oldMethod + ' is deprecated, please use ' + newMethod + ' instead.');
        }
        /**
         * Browser detector.
         *
         * @return {object} result containing browser and version
         *     properties.
         */


        function detectBrowser(window) {
          var navigator = window.navigator; // Returned result object.

          var result = {
            browser: null,
            version: null
          }; // Fail early if it's not a browser

          if (typeof window === 'undefined' || !window.navigator) {
            result.browser = 'Not a browser.';
            return result;
          }

          if (navigator.mozGetUserMedia) {
            // Firefox.
            result.browser = 'firefox';
            result.version = extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1);
          } else if (navigator.webkitGetUserMedia) {
            // Chrome, Chromium, Webview, Opera.
            // Version matches Chrome/WebRTC version.
            result.browser = 'chrome';
            result.version = extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
          } else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
            // Edge.
            result.browser = 'edge';
            result.version = extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2);
          } else if (window.RTCPeerConnection && navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) {
            // Safari.
            result.browser = 'safari';
            result.version = extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
          } else {
            // Default fallthrough: not supported.
            result.browser = 'Not a supported browser.';
            return result;
          }

          return result;
        }
        /**
         * Remove all empty objects and undefined values
         * from a nested object -- an enhanced and vanilla version
         * of Lodash's `compact`.
         */


        function compactObject(data) {
          if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
            return data;
          }

          return Object.keys(data).reduce(function (accumulator, key) {
            var isObject = _typeof(data[key]) === 'object';
            var value = isObject ? compactObject(data[key]) : data[key];
            var isEmptyObject = isObject && !Object.keys(value).length;

            if (value === undefined || isEmptyObject) {
              return accumulator;
            }

            return Object.assign(accumulator, _defineProperty({}, key, value));
          }, {});
        }
      }, {}],
      12: [function (require, module, exports) {}, {}],
      13: [function (require, module, exports) {

        var SDPUtils = {}; // Generate an alphanumeric identifier for cname or mids.
        // TODO: use UUIDs instead? https://gist.github.com/jed/982883

        SDPUtils.generateIdentifier = function () {
          return Math.random().toString(36).substr(2, 10);
        }; // The RTCP CNAME used by all peerconnections from the same JS.


        SDPUtils.localCName = SDPUtils.generateIdentifier(); // Splits SDP into lines, dealing with both CRLF and LF.

        SDPUtils.splitLines = function (blob) {
          return blob.trim().split('\n').map(function (line) {
            return line.trim();
          });
        }; // Splits SDP into sessionpart and mediasections. Ensures CRLF.


        SDPUtils.splitSections = function (blob) {
          var parts = blob.split('\nm=');
          return parts.map(function (part, index) {
            return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
          });
        }; // returns the session description.


        SDPUtils.getDescription = function (blob) {
          var sections = SDPUtils.splitSections(blob);
          return sections && sections[0];
        }; // returns the individual media sections.


        SDPUtils.getMediaSections = function (blob) {
          var sections = SDPUtils.splitSections(blob);
          sections.shift();
          return sections;
        }; // Returns lines that start with a certain prefix.


        SDPUtils.matchPrefix = function (blob, prefix) {
          return SDPUtils.splitLines(blob).filter(function (line) {
            return line.indexOf(prefix) === 0;
          });
        }; // Parses an ICE candidate line. Sample input:
        // candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
        // rport 55996"


        SDPUtils.parseCandidate = function (line) {
          var parts; // Parse both variants.

          if (line.indexOf('a=candidate:') === 0) {
            parts = line.substring(12).split(' ');
          } else {
            parts = line.substring(10).split(' ');
          }

          var candidate = {
            foundation: parts[0],
            component: parseInt(parts[1], 10),
            protocol: parts[2].toLowerCase(),
            priority: parseInt(parts[3], 10),
            ip: parts[4],
            address: parts[4],
            // address is an alias for ip.
            port: parseInt(parts[5], 10),
            // skip parts[6] == 'typ'
            type: parts[7]
          };

          for (var i = 8; i < parts.length; i += 2) {
            switch (parts[i]) {
              case 'raddr':
                candidate.relatedAddress = parts[i + 1];
                break;

              case 'rport':
                candidate.relatedPort = parseInt(parts[i + 1], 10);
                break;

              case 'tcptype':
                candidate.tcpType = parts[i + 1];
                break;

              case 'ufrag':
                candidate.ufrag = parts[i + 1]; // for backward compability.

                candidate.usernameFragment = parts[i + 1];
                break;

              default:
                // extension handling, in particular ufrag
                candidate[parts[i]] = parts[i + 1];
                break;
            }
          }

          return candidate;
        }; // Translates a candidate object into SDP candidate attribute.


        SDPUtils.writeCandidate = function (candidate) {
          var sdp = [];
          sdp.push(candidate.foundation);
          sdp.push(candidate.component);
          sdp.push(candidate.protocol.toUpperCase());
          sdp.push(candidate.priority);
          sdp.push(candidate.address || candidate.ip);
          sdp.push(candidate.port);
          var type = candidate.type;
          sdp.push('typ');
          sdp.push(type);

          if (type !== 'host' && candidate.relatedAddress && candidate.relatedPort) {
            sdp.push('raddr');
            sdp.push(candidate.relatedAddress);
            sdp.push('rport');
            sdp.push(candidate.relatedPort);
          }

          if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
            sdp.push('tcptype');
            sdp.push(candidate.tcpType);
          }

          if (candidate.usernameFragment || candidate.ufrag) {
            sdp.push('ufrag');
            sdp.push(candidate.usernameFragment || candidate.ufrag);
          }

          return 'candidate:' + sdp.join(' ');
        }; // Parses an ice-options line, returns an array of option tags.
        // a=ice-options:foo bar


        SDPUtils.parseIceOptions = function (line) {
          return line.substr(14).split(' ');
        }; // Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
        // a=rtpmap:111 opus/48000/2


        SDPUtils.parseRtpMap = function (line) {
          var parts = line.substr(9).split(' ');
          var parsed = {
            payloadType: parseInt(parts.shift(), 10) // was: id

          };
          parts = parts[0].split('/');
          parsed.name = parts[0];
          parsed.clockRate = parseInt(parts[1], 10); // was: clockrate

          parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1; // legacy alias, got renamed back to channels in ORTC.

          parsed.numChannels = parsed.channels;
          return parsed;
        }; // Generate an a=rtpmap line from RTCRtpCodecCapability or
        // RTCRtpCodecParameters.


        SDPUtils.writeRtpMap = function (codec) {
          var pt = codec.payloadType;

          if (codec.preferredPayloadType !== undefined) {
            pt = codec.preferredPayloadType;
          }

          var channels = codec.channels || codec.numChannels || 1;
          return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate + (channels !== 1 ? '/' + channels : '') + '\r\n';
        }; // Parses an a=extmap line (headerextension from RFC 5285). Sample input:
        // a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
        // a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset


        SDPUtils.parseExtmap = function (line) {
          var parts = line.substr(9).split(' ');
          return {
            id: parseInt(parts[0], 10),
            direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
            uri: parts[1]
          };
        }; // Generates a=extmap line from RTCRtpHeaderExtensionParameters or
        // RTCRtpHeaderExtension.


        SDPUtils.writeExtmap = function (headerExtension) {
          return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) + (headerExtension.direction && headerExtension.direction !== 'sendrecv' ? '/' + headerExtension.direction : '') + ' ' + headerExtension.uri + '\r\n';
        }; // Parses an ftmp line, returns dictionary. Sample input:
        // a=fmtp:96 vbr=on;cng=on
        // Also deals with vbr=on; cng=on


        SDPUtils.parseFmtp = function (line) {
          var parsed = {};
          var kv;
          var parts = line.substr(line.indexOf(' ') + 1).split(';');

          for (var j = 0; j < parts.length; j++) {
            kv = parts[j].trim().split('=');
            parsed[kv[0].trim()] = kv[1];
          }

          return parsed;
        }; // Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.


        SDPUtils.writeFmtp = function (codec) {
          var line = '';
          var pt = codec.payloadType;

          if (codec.preferredPayloadType !== undefined) {
            pt = codec.preferredPayloadType;
          }

          if (codec.parameters && Object.keys(codec.parameters).length) {
            var params = [];
            Object.keys(codec.parameters).forEach(function (param) {
              if (codec.parameters[param]) {
                params.push(param + '=' + codec.parameters[param]);
              } else {
                params.push(param);
              }
            });
            line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
          }

          return line;
        }; // Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
        // a=rtcp-fb:98 nack rpsi


        SDPUtils.parseRtcpFb = function (line) {
          var parts = line.substr(line.indexOf(' ') + 1).split(' ');
          return {
            type: parts.shift(),
            parameter: parts.join(' ')
          };
        }; // Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.


        SDPUtils.writeRtcpFb = function (codec) {
          var lines = '';
          var pt = codec.payloadType;

          if (codec.preferredPayloadType !== undefined) {
            pt = codec.preferredPayloadType;
          }

          if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
            // FIXME: special handling for trr-int?
            codec.rtcpFeedback.forEach(function (fb) {
              lines += 'a=rtcp-fb:' + pt + ' ' + fb.type + (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') + '\r\n';
            });
          }

          return lines;
        }; // Parses an RFC 5576 ssrc media attribute. Sample input:
        // a=ssrc:3735928559 cname:something


        SDPUtils.parseSsrcMedia = function (line) {
          var sp = line.indexOf(' ');
          var parts = {
            ssrc: parseInt(line.substr(7, sp - 7), 10)
          };
          var colon = line.indexOf(':', sp);

          if (colon > -1) {
            parts.attribute = line.substr(sp + 1, colon - sp - 1);
            parts.value = line.substr(colon + 1);
          } else {
            parts.attribute = line.substr(sp + 1);
          }

          return parts;
        };

        SDPUtils.parseSsrcGroup = function (line) {
          var parts = line.substr(13).split(' ');
          return {
            semantics: parts.shift(),
            ssrcs: parts.map(function (ssrc) {
              return parseInt(ssrc, 10);
            })
          };
        }; // Extracts the MID (RFC 5888) from a media section.
        // returns the MID or undefined if no mid line was found.


        SDPUtils.getMid = function (mediaSection) {
          var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];

          if (mid) {
            return mid.substr(6);
          }
        };

        SDPUtils.parseFingerprint = function (line) {
          var parts = line.substr(14).split(' ');
          return {
            algorithm: parts[0].toLowerCase(),
            // algorithm is case-sensitive in Edge.
            value: parts[1]
          };
        }; // Extracts DTLS parameters from SDP media section or sessionpart.
        // FIXME: for consistency with other functions this should only
        //   get the fingerprint line as input. See also getIceParameters.


        SDPUtils.getDtlsParameters = function (mediaSection, sessionpart) {
          var lines = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=fingerprint:'); // Note: a=setup line is ignored since we use the 'auto' role.
          // Note2: 'algorithm' is not case sensitive except in Edge.

          return {
            role: 'auto',
            fingerprints: lines.map(SDPUtils.parseFingerprint)
          };
        }; // Serializes DTLS parameters to SDP.


        SDPUtils.writeDtlsParameters = function (params, setupType) {
          var sdp = 'a=setup:' + setupType + '\r\n';
          params.fingerprints.forEach(function (fp) {
            sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
          });
          return sdp;
        }; // Parses ICE information from SDP media section or sessionpart.
        // FIXME: for consistency with other functions this should only
        //   get the ice-ufrag and ice-pwd lines as input.


        SDPUtils.getIceParameters = function (mediaSection, sessionpart) {
          var lines = SDPUtils.splitLines(mediaSection); // Search in session part, too.

          lines = lines.concat(SDPUtils.splitLines(sessionpart));
          var iceParameters = {
            usernameFragment: lines.filter(function (line) {
              return line.indexOf('a=ice-ufrag:') === 0;
            })[0].substr(12),
            password: lines.filter(function (line) {
              return line.indexOf('a=ice-pwd:') === 0;
            })[0].substr(10)
          };
          return iceParameters;
        }; // Serializes ICE parameters to SDP.


        SDPUtils.writeIceParameters = function (params) {
          return 'a=ice-ufrag:' + params.usernameFragment + '\r\n' + 'a=ice-pwd:' + params.password + '\r\n';
        }; // Parses the SDP media section and returns RTCRtpParameters.


        SDPUtils.parseRtpParameters = function (mediaSection) {
          var description = {
            codecs: [],
            headerExtensions: [],
            fecMechanisms: [],
            rtcp: []
          };
          var lines = SDPUtils.splitLines(mediaSection);
          var mline = lines[0].split(' ');

          for (var i = 3; i < mline.length; i++) {
            // find all codecs from mline[3..]
            var pt = mline[i];
            var rtpmapline = SDPUtils.matchPrefix(mediaSection, 'a=rtpmap:' + pt + ' ')[0];

            if (rtpmapline) {
              var codec = SDPUtils.parseRtpMap(rtpmapline);
              var fmtps = SDPUtils.matchPrefix(mediaSection, 'a=fmtp:' + pt + ' '); // Only the first a=fmtp:<pt> is considered.

              codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
              codec.rtcpFeedback = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-fb:' + pt + ' ').map(SDPUtils.parseRtcpFb);
              description.codecs.push(codec); // parse FEC mechanisms from rtpmap lines.

              switch (codec.name.toUpperCase()) {
                case 'RED':
                case 'ULPFEC':
                  description.fecMechanisms.push(codec.name.toUpperCase());
                  break;

                default:
                  // only RED and ULPFEC are recognized as FEC mechanisms.
                  break;
              }
            }
          }

          SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function (line) {
            description.headerExtensions.push(SDPUtils.parseExtmap(line));
          }); // FIXME: parse rtcp.

          return description;
        }; // Generates parts of the SDP media section describing the capabilities /
        // parameters.


        SDPUtils.writeRtpDescription = function (kind, caps) {
          var sdp = ''; // Build the mline.

          sdp += 'm=' + kind + ' ';
          sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.

          sdp += ' UDP/TLS/RTP/SAVPF ';
          sdp += caps.codecs.map(function (codec) {
            if (codec.preferredPayloadType !== undefined) {
              return codec.preferredPayloadType;
            }

            return codec.payloadType;
          }).join(' ') + '\r\n';
          sdp += 'c=IN IP4 0.0.0.0\r\n';
          sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n'; // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.

          caps.codecs.forEach(function (codec) {
            sdp += SDPUtils.writeRtpMap(codec);
            sdp += SDPUtils.writeFmtp(codec);
            sdp += SDPUtils.writeRtcpFb(codec);
          });
          var maxptime = 0;
          caps.codecs.forEach(function (codec) {
            if (codec.maxptime > maxptime) {
              maxptime = codec.maxptime;
            }
          });

          if (maxptime > 0) {
            sdp += 'a=maxptime:' + maxptime + '\r\n';
          }

          sdp += 'a=rtcp-mux\r\n';

          if (caps.headerExtensions) {
            caps.headerExtensions.forEach(function (extension) {
              sdp += SDPUtils.writeExtmap(extension);
            });
          } // FIXME: write fecMechanisms.


          return sdp;
        }; // Parses the SDP media section and returns an array of
        // RTCRtpEncodingParameters.


        SDPUtils.parseRtpEncodingParameters = function (mediaSection) {
          var encodingParameters = [];
          var description = SDPUtils.parseRtpParameters(mediaSection);
          var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
          var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1; // filter a=ssrc:... cname:, ignore PlanB-msid

          var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function (line) {
            return SDPUtils.parseSsrcMedia(line);
          }).filter(function (parts) {
            return parts.attribute === 'cname';
          });
          var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
          var secondarySsrc;
          var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID').map(function (line) {
            var parts = line.substr(17).split(' ');
            return parts.map(function (part) {
              return parseInt(part, 10);
            });
          });

          if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
            secondarySsrc = flows[0][1];
          }

          description.codecs.forEach(function (codec) {
            if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
              var encParam = {
                ssrc: primarySsrc,
                codecPayloadType: parseInt(codec.parameters.apt, 10)
              };

              if (primarySsrc && secondarySsrc) {
                encParam.rtx = {
                  ssrc: secondarySsrc
                };
              }

              encodingParameters.push(encParam);

              if (hasRed) {
                encParam = JSON.parse(JSON.stringify(encParam));
                encParam.fec = {
                  ssrc: primarySsrc,
                  mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
                };
                encodingParameters.push(encParam);
              }
            }
          });

          if (encodingParameters.length === 0 && primarySsrc) {
            encodingParameters.push({
              ssrc: primarySsrc
            });
          } // we support both b=AS and b=TIAS but interpret AS as TIAS.


          var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');

          if (bandwidth.length) {
            if (bandwidth[0].indexOf('b=TIAS:') === 0) {
              bandwidth = parseInt(bandwidth[0].substr(7), 10);
            } else if (bandwidth[0].indexOf('b=AS:') === 0) {
              // use formula from JSEP to convert b=AS to TIAS value.
              bandwidth = parseInt(bandwidth[0].substr(5), 10) * 1000 * 0.95 - 50 * 40 * 8;
            } else {
              bandwidth = undefined;
            }

            encodingParameters.forEach(function (params) {
              params.maxBitrate = bandwidth;
            });
          }

          return encodingParameters;
        }; // parses http://draft.ortc.org/#rtcrtcpparameters*


        SDPUtils.parseRtcpParameters = function (mediaSection) {
          var rtcpParameters = {}; // Gets the first SSRC. Note tha with RTX there might be multiple
          // SSRCs.

          var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function (line) {
            return SDPUtils.parseSsrcMedia(line);
          }).filter(function (obj) {
            return obj.attribute === 'cname';
          })[0];

          if (remoteSsrc) {
            rtcpParameters.cname = remoteSsrc.value;
            rtcpParameters.ssrc = remoteSsrc.ssrc;
          } // Edge uses the compound attribute instead of reducedSize
          // compound is !reducedSize


          var rsize = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-rsize');
          rtcpParameters.reducedSize = rsize.length > 0;
          rtcpParameters.compound = rsize.length === 0; // parses the rtcp-mux attrіbute.
          // Note that Edge does not support unmuxed RTCP.

          var mux = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-mux');
          rtcpParameters.mux = mux.length > 0;
          return rtcpParameters;
        }; // parses either a=msid: or a=ssrc:... msid lines and returns
        // the id of the MediaStream and MediaStreamTrack.


        SDPUtils.parseMsid = function (mediaSection) {
          var parts;
          var spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');

          if (spec.length === 1) {
            parts = spec[0].substr(7).split(' ');
            return {
              stream: parts[0],
              track: parts[1]
            };
          }

          var planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function (line) {
            return SDPUtils.parseSsrcMedia(line);
          }).filter(function (msidParts) {
            return msidParts.attribute === 'msid';
          });

          if (planB.length > 0) {
            parts = planB[0].value.split(' ');
            return {
              stream: parts[0],
              track: parts[1]
            };
          }
        }; // Generate a session ID for SDP.
        // https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
        // recommends using a cryptographically random +ve 64-bit value
        // but right now this should be acceptable and within the right range


        SDPUtils.generateSessionId = function () {
          return Math.random().toString().substr(2, 21);
        }; // Write boilder plate for start of SDP
        // sessId argument is optional - if not supplied it will
        // be generated randomly
        // sessVersion is optional and defaults to 2
        // sessUser is optional and defaults to 'thisisadapterortc'


        SDPUtils.writeSessionBoilerplate = function (sessId, sessVer, sessUser) {
          var sessionId;
          var version = sessVer !== undefined ? sessVer : 2;

          if (sessId) {
            sessionId = sessId;
          } else {
            sessionId = SDPUtils.generateSessionId();
          }

          var user = sessUser || 'thisisadapterortc'; // FIXME: sess-id should be an NTP timestamp.

          return 'v=0\r\n' + 'o=' + user + ' ' + sessionId + ' ' + version + ' IN IP4 127.0.0.1\r\n' + 's=-\r\n' + 't=0 0\r\n';
        };

        SDPUtils.writeMediaSection = function (transceiver, caps, type, stream) {
          var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps); // Map ICE parameters (ufrag, pwd) to SDP.

          sdp += SDPUtils.writeIceParameters(transceiver.iceGatherer.getLocalParameters()); // Map DTLS parameters to SDP.

          sdp += SDPUtils.writeDtlsParameters(transceiver.dtlsTransport.getLocalParameters(), type === 'offer' ? 'actpass' : 'active');
          sdp += 'a=mid:' + transceiver.mid + '\r\n';

          if (transceiver.direction) {
            sdp += 'a=' + transceiver.direction + '\r\n';
          } else if (transceiver.rtpSender && transceiver.rtpReceiver) {
            sdp += 'a=sendrecv\r\n';
          } else if (transceiver.rtpSender) {
            sdp += 'a=sendonly\r\n';
          } else if (transceiver.rtpReceiver) {
            sdp += 'a=recvonly\r\n';
          } else {
            sdp += 'a=inactive\r\n';
          }

          if (transceiver.rtpSender) {
            // spec.
            var msid = 'msid:' + stream.id + ' ' + transceiver.rtpSender.track.id + '\r\n';
            sdp += 'a=' + msid; // for Chrome.

            sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' ' + msid;

            if (transceiver.sendEncodingParameters[0].rtx) {
              sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' ' + msid;
              sdp += 'a=ssrc-group:FID ' + transceiver.sendEncodingParameters[0].ssrc + ' ' + transceiver.sendEncodingParameters[0].rtx.ssrc + '\r\n';
            }
          } // FIXME: this should be written by writeRtpDescription.


          sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' cname:' + SDPUtils.localCName + '\r\n';

          if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
            sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
          }

          return sdp;
        }; // Gets the direction from the mediaSection or the sessionpart.


        SDPUtils.getDirection = function (mediaSection, sessionpart) {
          // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
          var lines = SDPUtils.splitLines(mediaSection);

          for (var i = 0; i < lines.length; i++) {
            switch (lines[i]) {
              case 'a=sendrecv':
              case 'a=sendonly':
              case 'a=recvonly':
              case 'a=inactive':
                return lines[i].substr(2);

              default: // FIXME: What should happen here?

            }
          }

          if (sessionpart) {
            return SDPUtils.getDirection(sessionpart);
          }

          return 'sendrecv';
        };

        SDPUtils.getKind = function (mediaSection) {
          var lines = SDPUtils.splitLines(mediaSection);
          var mline = lines[0].split(' ');
          return mline[0].substr(2);
        };

        SDPUtils.isRejected = function (mediaSection) {
          return mediaSection.split(' ', 2)[1] === '0';
        };

        SDPUtils.parseMLine = function (mediaSection) {
          var lines = SDPUtils.splitLines(mediaSection);
          var parts = lines[0].substr(2).split(' ');
          return {
            kind: parts[0],
            port: parseInt(parts[1], 10),
            protocol: parts[2],
            fmt: parts.slice(3).join(' ')
          };
        };

        SDPUtils.parseOLine = function (mediaSection) {
          var line = SDPUtils.matchPrefix(mediaSection, 'o=')[0];
          var parts = line.substr(2).split(' ');
          return {
            username: parts[0],
            sessionId: parts[1],
            sessionVersion: parseInt(parts[2], 10),
            netType: parts[3],
            addressType: parts[4],
            address: parts[5]
          };
        }; // a very naive interpretation of a valid SDP.


        SDPUtils.isValidSDP = function (blob) {
          if (typeof blob !== 'string' || blob.length === 0) {
            return false;
          }

          var lines = SDPUtils.splitLines(blob);

          for (var i = 0; i < lines.length; i++) {
            if (lines[i].length < 2 || lines[i].charAt(1) !== '=') {
              return false;
            } // TODO: check the modifier a bit more.

          }

          return true;
        }; // Expose public methods.


        if (typeof module === 'object') {
          module.exports = SDPUtils;
        }
      }, {}]
    }, {}, [1]);
  });
  unwrapExports(adapter_no_edge_no_global);

  var EventEmitter = createCommonjsModule(function (module) {

    (function (exports) {
      /**
       * Class for managing events.
       * Can be extended to provide event functionality in other classes.
       *
       * @class EventEmitter Manages event registering and emitting.
       */

      function EventEmitter() {} // Shortcuts to improve speed and size


      var proto = EventEmitter.prototype;
      var originalGlobalValue = exports.EventEmitter;
      /**
       * Finds the index of the listener for the event in its storage array.
       *
       * @param {Function[]} listeners Array of listeners to search through.
       * @param {Function} listener Method to look for.
       * @return {Number} Index of the specified listener, -1 if not found
       * @api private
       */

      function indexOfListener(listeners, listener) {
        var i = listeners.length;

        while (i--) {
          if (listeners[i].listener === listener) {
            return i;
          }
        }

        return -1;
      }
      /**
       * Alias a method while keeping the context correct, to allow for overwriting of target method.
       *
       * @param {String} name The name of the target method.
       * @return {Function} The aliased method
       * @api private
       */


      function alias(name) {
        return function aliasClosure() {
          return this[name].apply(this, arguments);
        };
      }
      /**
       * Returns the listener array for the specified event.
       * Will initialise the event object and listener arrays if required.
       * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
       * Each property in the object response is an array of listener functions.
       *
       * @param {String|RegExp} evt Name of the event to return the listeners from.
       * @return {Function[]|Object} All listener functions for the event.
       */


      proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();

        var response;
        var key; // Return a concatenated array of all matching events if
        // the selector is a regular expression.

        if (evt instanceof RegExp) {
          response = {};

          for (key in events) {
            if (events.hasOwnProperty(key) && evt.test(key)) {
              response[key] = events[key];
            }
          }
        } else {
          response = events[evt] || (events[evt] = []);
        }

        return response;
      };
      /**
       * Takes a list of listener objects and flattens it into a list of listener functions.
       *
       * @param {Object[]} listeners Raw listener objects.
       * @return {Function[]} Just the listener functions.
       */


      proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;

        for (i = 0; i < listeners.length; i += 1) {
          flatListeners.push(listeners[i].listener);
        }

        return flatListeners;
      };
      /**
       * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
       *
       * @param {String|RegExp} evt Name of the event to return the listeners from.
       * @return {Object} All listener functions for an event in an object.
       */


      proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;

        if (listeners instanceof Array) {
          response = {};
          response[evt] = listeners;
        }

        return response || listeners;
      };

      function isValidListener(listener) {
        if (typeof listener === 'function' || listener instanceof RegExp) {
          return true;
        } else if (listener && typeof listener === 'object') {
          return isValidListener(listener.listener);
        } else {
          return false;
        }
      }
      /**
       * Adds a listener function to the specified event.
       * The listener will not be added if it is a duplicate.
       * If the listener returns true then it will be removed after it is called.
       * If you pass a regular expression as the event name then the listener will be added to all events that match it.
       *
       * @param {String|RegExp} evt Name of the event to attach the listener to.
       * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
       * @return {Object} Current instance of EventEmitter for chaining.
       */


      proto.addListener = function addListener(evt, listener) {
        if (!isValidListener(listener)) {
          throw new TypeError('listener must be a function');
        }

        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === 'object';
        var key;

        for (key in listeners) {
          if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
            listeners[key].push(listenerIsWrapped ? listener : {
              listener: listener,
              once: false
            });
          }
        }

        return this;
      };
      /**
       * Alias of addListener
       */


      proto.on = alias('addListener');
      /**
       * Semi-alias of addListener. It will add a listener that will be
       * automatically removed after its first execution.
       *
       * @param {String|RegExp} evt Name of the event to attach the listener to.
       * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
       * @return {Object} Current instance of EventEmitter for chaining.
       */

      proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
          listener: listener,
          once: true
        });
      };
      /**
       * Alias of addOnceListener.
       */


      proto.once = alias('addOnceListener');
      /**
       * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
       * You need to tell it what event names should be matched by a regex.
       *
       * @param {String} evt Name of the event to create.
       * @return {Object} Current instance of EventEmitter for chaining.
       */

      proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this;
      };
      /**
       * Uses defineEvent to define multiple events.
       *
       * @param {String[]} evts An array of event names to define.
       * @return {Object} Current instance of EventEmitter for chaining.
       */


      proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
          this.defineEvent(evts[i]);
        }

        return this;
      };
      /**
       * Removes a listener function from the specified event.
       * When passed a regular expression as the event name, it will remove the listener from all events that match it.
       *
       * @param {String|RegExp} evt Name of the event to remove the listener from.
       * @param {Function} listener Method to remove from the event.
       * @return {Object} Current instance of EventEmitter for chaining.
       */


      proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;

        for (key in listeners) {
          if (listeners.hasOwnProperty(key)) {
            index = indexOfListener(listeners[key], listener);

            if (index !== -1) {
              listeners[key].splice(index, 1);
            }
          }
        }

        return this;
      };
      /**
       * Alias of removeListener
       */


      proto.off = alias('removeListener');
      /**
       * Adds listeners in bulk using the manipulateListeners method.
       * If you pass an object as the first argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
       * You can also pass it a regular expression to add the array of listeners to all events that match it.
       * Yeah, this function does quite a bit. That's probably a bad thing.
       *
       * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
       * @param {Function[]} [listeners] An optional array of listener functions to add.
       * @return {Object} Current instance of EventEmitter for chaining.
       */

      proto.addListeners = function addListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
      };
      /**
       * Removes listeners in bulk using the manipulateListeners method.
       * If you pass an object as the first argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
       * You can also pass it an event name and an array of listeners to be removed.
       * You can also pass it a regular expression to remove the listeners from all events that match it.
       *
       * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
       * @param {Function[]} [listeners] An optional array of listener functions to remove.
       * @return {Object} Current instance of EventEmitter for chaining.
       */


      proto.removeListeners = function removeListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
      };
      /**
       * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
       * The first argument will determine if the listeners are removed (true) or added (false).
       * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
       * You can also pass it an event name and an array of listeners to be added/removed.
       * You can also pass it a regular expression to manipulate the listeners of all events that match it.
       *
       * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
       * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
       * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
       * @return {Object} Current instance of EventEmitter for chaining.
       */


      proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners; // If evt is an object then pass each of its properties to this method

        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
          for (i in evt) {
            if (evt.hasOwnProperty(i) && (value = evt[i])) {
              // Pass the single listener straight through to the singular method
              if (typeof value === 'function') {
                single.call(this, i, value);
              } else {
                // Otherwise pass back to the multiple function
                multiple.call(this, i, value);
              }
            }
          }
        } else {
          // So evt must be a string
          // And listeners must be an array of listeners
          // Loop over it and pass each one to the multiple method
          i = listeners.length;

          while (i--) {
            single.call(this, evt, listeners[i]);
          }
        }

        return this;
      };
      /**
       * Removes all listeners from a specified event.
       * If you do not specify an event then all listeners will be removed.
       * That means every event will be emptied.
       * You can also pass a regex to remove all events that match it.
       *
       * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
       * @return {Object} Current instance of EventEmitter for chaining.
       */


      proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;

        var events = this._getEvents();

        var key; // Remove different things depending on the state of evt

        if (type === 'string') {
          // Remove all listeners for the specified event
          delete events[evt];
        } else if (evt instanceof RegExp) {
          // Remove all events matching the regex.
          for (key in events) {
            if (events.hasOwnProperty(key) && evt.test(key)) {
              delete events[key];
            }
          }
        } else {
          // Remove all listeners in all events
          delete this._events;
        }

        return this;
      };
      /**
       * Alias of removeEvent.
       *
       * Added to mirror the node API.
       */


      proto.removeAllListeners = alias('removeEvent');
      /**
       * Emits an event of your choice.
       * When emitted, every listener attached to that event will be executed.
       * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
       * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
       * So they will not arrive within the array on the other side, they will be separate.
       * You can also pass a regular expression to emit to all events that match it.
       *
       * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
       * @param {Array} [args] Optional array of arguments to be passed to each listener.
       * @return {Object} Current instance of EventEmitter for chaining.
       */

      proto.emitEvent = function emitEvent(evt, args) {
        var listenersMap = this.getListenersAsObject(evt);
        var listeners;
        var listener;
        var i;
        var key;
        var response;

        for (key in listenersMap) {
          if (listenersMap.hasOwnProperty(key)) {
            listeners = listenersMap[key].slice(0);

            for (i = 0; i < listeners.length; i++) {
              // If the listener returns true then it shall be removed from the event
              // The function is executed either with a basic call or an apply if there is an args array
              listener = listeners[i];

              if (listener.once === true) {
                this.removeListener(evt, listener.listener);
              }

              response = listener.listener.apply(this, args || []);

              if (response === this._getOnceReturnValue()) {
                this.removeListener(evt, listener.listener);
              }
            }
          }
        }

        return this;
      };
      /**
       * Alias of emitEvent
       */


      proto.trigger = alias('emitEvent');
      /**
       * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
       * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
       *
       * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
       * @param {...*} Optional additional arguments to be passed to each listener.
       * @return {Object} Current instance of EventEmitter for chaining.
       */

      proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
      };
      /**
       * Sets the current value to check against when executing listeners. If a
       * listeners return value matches the one set here then it will be removed
       * after execution. This value defaults to true.
       *
       * @param {*} value The new value to check for when executing listeners.
       * @return {Object} Current instance of EventEmitter for chaining.
       */


      proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
      };
      /**
       * Fetches the current value to check against when executing listeners. If
       * the listeners return value matches this one then it should be removed
       * automatically. It will return true by default.
       *
       * @return {*|Boolean} The current value to check for or the default, true.
       * @api private
       */


      proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty('_onceReturnValue')) {
          return this._onceReturnValue;
        } else {
          return true;
        }
      };
      /**
       * Fetches the events object and creates one if required.
       *
       * @return {Object} The events storage object.
       * @api private
       */


      proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
      };
      /**
       * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
       *
       * @return {Function} Non conflicting EventEmitter class.
       */


      EventEmitter.noConflict = function noConflict() {
        exports.EventEmitter = originalGlobalValue;
        return EventEmitter;
      }; // Expose the class either via AMD, CommonJS or the global object


      if (module.exports) {
        module.exports = EventEmitter;
      } else {
        exports.EventEmitter = EventEmitter;
      }
    })(typeof window !== 'undefined' ? window : commonjsGlobal || {});
  });

  var lodash_uniqby = createCommonjsModule(function (module, exports) {
    /**
     * lodash (Custom Build) <https://lodash.com/>
     * Build: `lodash modularize exports="npm" -o ./`
     * Copyright jQuery Foundation and other contributors <https://jquery.org/>
     * Released under MIT license <https://lodash.com/license>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     */

    /** Used as the size to enable large array optimizations. */
    var LARGE_ARRAY_SIZE = 200;
    /** Used as the `TypeError` message for "Functions" methods. */

    var FUNC_ERROR_TEXT = 'Expected a function';
    /** Used to stand-in for `undefined` hash values. */

    var HASH_UNDEFINED = '__lodash_hash_undefined__';
    /** Used to compose bitmasks for comparison styles. */

    var UNORDERED_COMPARE_FLAG = 1,
        PARTIAL_COMPARE_FLAG = 2;
    /** Used as references for various `Number` constants. */

    var INFINITY = 1 / 0,
        MAX_SAFE_INTEGER = 9007199254740991;
    /** `Object#toString` result references. */

    var argsTag = '[object Arguments]',
        arrayTag = '[object Array]',
        boolTag = '[object Boolean]',
        dateTag = '[object Date]',
        errorTag = '[object Error]',
        funcTag = '[object Function]',
        genTag = '[object GeneratorFunction]',
        mapTag = '[object Map]',
        numberTag = '[object Number]',
        objectTag = '[object Object]',
        promiseTag = '[object Promise]',
        regexpTag = '[object RegExp]',
        setTag = '[object Set]',
        stringTag = '[object String]',
        symbolTag = '[object Symbol]',
        weakMapTag = '[object WeakMap]';
    var arrayBufferTag = '[object ArrayBuffer]',
        dataViewTag = '[object DataView]',
        float32Tag = '[object Float32Array]',
        float64Tag = '[object Float64Array]',
        int8Tag = '[object Int8Array]',
        int16Tag = '[object Int16Array]',
        int32Tag = '[object Int32Array]',
        uint8Tag = '[object Uint8Array]',
        uint8ClampedTag = '[object Uint8ClampedArray]',
        uint16Tag = '[object Uint16Array]',
        uint32Tag = '[object Uint32Array]';
    /** Used to match property names within property paths. */

    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
        reIsPlainProp = /^\w*$/,
        reLeadingDot = /^\./,
        rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    /**
     * Used to match `RegExp`
     * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
     */

    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    /** Used to match backslashes in property paths. */

    var reEscapeChar = /\\(\\)?/g;
    /** Used to detect host constructors (Safari). */

    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    /** Used to detect unsigned integer values. */

    var reIsUint = /^(?:0|[1-9]\d*)$/;
    /** Used to identify `toStringTag` values of typed arrays. */

    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    /** Detect free variable `global` from Node.js. */

    var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
    /** Detect free variable `self`. */

    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
    /** Used as a reference to the global object. */

    var root = freeGlobal || freeSelf || Function('return this')();
    /** Detect free variable `exports`. */

    var freeExports = exports && !exports.nodeType && exports;
    /** Detect free variable `module`. */

    var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
    /** Detect the popular CommonJS extension `module.exports`. */

    var moduleExports = freeModule && freeModule.exports === freeExports;
    /** Detect free variable `process` from Node.js. */

    var freeProcess = moduleExports && freeGlobal.process;
    /** Used to access faster Node.js helpers. */

    var nodeUtil = function () {
      try {
        return freeProcess && freeProcess.binding('util');
      } catch (e) {}
    }();
    /* Node.js helper references. */


    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    /**
     * A specialized version of `_.includes` for arrays without support for
     * specifying an index to search from.
     *
     * @private
     * @param {Array} [array] The array to inspect.
     * @param {*} target The value to search for.
     * @returns {boolean} Returns `true` if `target` is found, else `false`.
     */

    function arrayIncludes(array, value) {
      var length = array ? array.length : 0;
      return !!length && baseIndexOf(array, value, 0) > -1;
    }
    /**
     * This function is like `arrayIncludes` except that it accepts a comparator.
     *
     * @private
     * @param {Array} [array] The array to inspect.
     * @param {*} target The value to search for.
     * @param {Function} comparator The comparator invoked per element.
     * @returns {boolean} Returns `true` if `target` is found, else `false`.
     */


    function arrayIncludesWith(array, value, comparator) {
      var index = -1,
          length = array ? array.length : 0;

      while (++index < length) {
        if (comparator(value, array[index])) {
          return true;
        }
      }

      return false;
    }
    /**
     * A specialized version of `_.some` for arrays without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */


    function arraySome(array, predicate) {
      var index = -1,
          length = array ? array.length : 0;

      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }

      return false;
    }
    /**
     * The base implementation of `_.findIndex` and `_.findLastIndex` without
     * support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} predicate The function invoked per iteration.
     * @param {number} fromIndex The index to search from.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */


    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length,
          index = fromIndex + (fromRight ? 1 : -1);

      while (fromRight ? index-- : ++index < length) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }

      return -1;
    }
    /**
     * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} fromIndex The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */


    function baseIndexOf(array, value, fromIndex) {
      if (value !== value) {
        return baseFindIndex(array, baseIsNaN, fromIndex);
      }

      var index = fromIndex - 1,
          length = array.length;

      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }

      return -1;
    }
    /**
     * The base implementation of `_.isNaN` without support for number objects.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
     */


    function baseIsNaN(value) {
      return value !== value;
    }
    /**
     * The base implementation of `_.property` without support for deep paths.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @returns {Function} Returns the new accessor function.
     */


    function baseProperty(key) {
      return function (object) {
        return object == null ? undefined : object[key];
      };
    }
    /**
     * The base implementation of `_.times` without support for iteratee shorthands
     * or max array length checks.
     *
     * @private
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     */


    function baseTimes(n, iteratee) {
      var index = -1,
          result = Array(n);

      while (++index < n) {
        result[index] = iteratee(index);
      }

      return result;
    }
    /**
     * The base implementation of `_.unary` without support for storing metadata.
     *
     * @private
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new capped function.
     */


    function baseUnary(func) {
      return function (value) {
        return func(value);
      };
    }
    /**
     * Checks if a cache value for `key` exists.
     *
     * @private
     * @param {Object} cache The cache to query.
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */


    function cacheHas(cache, key) {
      return cache.has(key);
    }
    /**
     * Gets the value at `key` of `object`.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */


    function getValue(object, key) {
      return object == null ? undefined : object[key];
    }
    /**
     * Checks if `value` is a host object in IE < 9.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
     */


    function isHostObject(value) {
      // Many host objects are `Object` objects that can coerce to strings
      // despite having improperly defined `toString` methods.
      var result = false;

      if (value != null && typeof value.toString != 'function') {
        try {
          result = !!(value + '');
        } catch (e) {}
      }

      return result;
    }
    /**
     * Converts `map` to its key-value pairs.
     *
     * @private
     * @param {Object} map The map to convert.
     * @returns {Array} Returns the key-value pairs.
     */


    function mapToArray(map) {
      var index = -1,
          result = Array(map.size);
      map.forEach(function (value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    /**
     * Creates a unary function that invokes `func` with its argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */


    function overArg(func, transform) {
      return function (arg) {
        return func(transform(arg));
      };
    }
    /**
     * Converts `set` to an array of its values.
     *
     * @private
     * @param {Object} set The set to convert.
     * @returns {Array} Returns the values.
     */


    function setToArray(set) {
      var index = -1,
          result = Array(set.size);
      set.forEach(function (value) {
        result[++index] = value;
      });
      return result;
    }
    /** Used for built-in method references. */


    var arrayProto = Array.prototype,
        funcProto = Function.prototype,
        objectProto = Object.prototype;
    /** Used to detect overreaching core-js shims. */

    var coreJsData = root['__core-js_shared__'];
    /** Used to detect methods masquerading as native. */

    var maskSrcKey = function () {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
      return uid ? 'Symbol(src)_1.' + uid : '';
    }();
    /** Used to resolve the decompiled source of functions. */


    var funcToString = funcProto.toString;
    /** Used to check objects for own properties. */

    var hasOwnProperty = objectProto.hasOwnProperty;
    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */

    var objectToString = objectProto.toString;
    /** Used to detect if a method is native. */

    var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
    /** Built-in value references. */

    var Symbol = root.Symbol,
        Uint8Array = root.Uint8Array,
        propertyIsEnumerable = objectProto.propertyIsEnumerable,
        splice = arrayProto.splice;
    /* Built-in method references for those with the same name as other `lodash` methods. */

    var nativeKeys = overArg(Object.keys, Object);
    /* Built-in method references that are verified to be native. */

    var DataView = getNative(root, 'DataView'),
        Map = getNative(root, 'Map'),
        Promise = getNative(root, 'Promise'),
        Set = getNative(root, 'Set'),
        WeakMap = getNative(root, 'WeakMap'),
        nativeCreate = getNative(Object, 'create');
    /** Used to detect maps, sets, and weakmaps. */

    var dataViewCtorString = toSource(DataView),
        mapCtorString = toSource(Map),
        promiseCtorString = toSource(Promise),
        setCtorString = toSource(Set),
        weakMapCtorString = toSource(WeakMap);
    /** Used to convert symbols to primitives and strings. */

    var symbolProto = Symbol ? Symbol.prototype : undefined,
        symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
        symbolToString = symbolProto ? symbolProto.toString : undefined;
    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */

    function Hash(entries) {
      var index = -1,
          length = entries ? entries.length : 0;
      this.clear();

      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */


    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }
    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */


    function hashDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }
    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */


    function hashGet(key) {
      var data = this.__data__;

      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
      }

      return hasOwnProperty.call(data, key) ? data[key] : undefined;
    }
    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */


    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
    }
    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */


    function hashSet(key, value) {
      var data = this.__data__;
      data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
      return this;
    } // Add methods to `Hash`.


    Hash.prototype.clear = hashClear;
    Hash.prototype['delete'] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */

    function ListCache(entries) {
      var index = -1,
          length = entries ? entries.length : 0;
      this.clear();

      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */


    function listCacheClear() {
      this.__data__ = [];
    }
    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */


    function listCacheDelete(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        return false;
      }

      var lastIndex = data.length - 1;

      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }

      return true;
    }
    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */


    function listCacheGet(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);
      return index < 0 ? undefined : data[index][1];
    }
    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */


    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */


    function listCacheSet(key, value) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }

      return this;
    } // Add methods to `ListCache`.


    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype['delete'] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */

    function MapCache(entries) {
      var index = -1,
          length = entries ? entries.length : 0;
      this.clear();

      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */


    function mapCacheClear() {
      this.__data__ = {
        'hash': new Hash(),
        'map': new (Map || ListCache)(),
        'string': new Hash()
      };
    }
    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */


    function mapCacheDelete(key) {
      return getMapData(this, key)['delete'](key);
    }
    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */


    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */


    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */


    function mapCacheSet(key, value) {
      getMapData(this, key).set(key, value);
      return this;
    } // Add methods to `MapCache`.


    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype['delete'] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    /**
     *
     * Creates an array cache object to store unique values.
     *
     * @private
     * @constructor
     * @param {Array} [values] The values to cache.
     */

    function SetCache(values) {
      var index = -1,
          length = values ? values.length : 0;
      this.__data__ = new MapCache();

      while (++index < length) {
        this.add(values[index]);
      }
    }
    /**
     * Adds `value` to the array cache.
     *
     * @private
     * @name add
     * @memberOf SetCache
     * @alias push
     * @param {*} value The value to cache.
     * @returns {Object} Returns the cache instance.
     */


    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);

      return this;
    }
    /**
     * Checks if `value` is in the array cache.
     *
     * @private
     * @name has
     * @memberOf SetCache
     * @param {*} value The value to search for.
     * @returns {number} Returns `true` if `value` is found, else `false`.
     */


    function setCacheHas(value) {
      return this.__data__.has(value);
    } // Add methods to `SetCache`.


    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */

    function Stack(entries) {
      this.__data__ = new ListCache(entries);
    }
    /**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */


    function stackClear() {
      this.__data__ = new ListCache();
    }
    /**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */


    function stackDelete(key) {
      return this.__data__['delete'](key);
    }
    /**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */


    function stackGet(key) {
      return this.__data__.get(key);
    }
    /**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */


    function stackHas(key) {
      return this.__data__.has(key);
    }
    /**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */


    function stackSet(key, value) {
      var cache = this.__data__;

      if (cache instanceof ListCache) {
        var pairs = cache.__data__;

        if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          return this;
        }

        cache = this.__data__ = new MapCache(pairs);
      }

      cache.set(key, value);
      return this;
    } // Add methods to `Stack`.


    Stack.prototype.clear = stackClear;
    Stack.prototype['delete'] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */

    function arrayLikeKeys(value, inherited) {
      // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
      // Safari 9 makes `arguments.length` enumerable in strict mode.
      var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
      var length = result.length,
          skipIndexes = !!length;

      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
          result.push(key);
        }
      }

      return result;
    }
    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */


    function assocIndexOf(array, key) {
      var length = array.length;

      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }

      return -1;
    }
    /**
     * The base implementation of `_.get` without support for default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @returns {*} Returns the resolved value.
     */


    function baseGet(object, path) {
      path = isKey(path, object) ? [path] : castPath(path);
      var index = 0,
          length = path.length;

      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }

      return index && index == length ? object : undefined;
    }
    /**
     * The base implementation of `getTag`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */


    function baseGetTag(value) {
      return objectToString.call(value);
    }
    /**
     * The base implementation of `_.hasIn` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */


    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }
    /**
     * The base implementation of `_.isEqual` which supports partial comparisons
     * and tracks traversed objects.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {Function} [customizer] The function to customize comparisons.
     * @param {boolean} [bitmask] The bitmask of comparison flags.
     *  The bitmask may be composed of the following flags:
     *     1 - Unordered comparison
     *     2 - Partial comparison
     * @param {Object} [stack] Tracks traversed `value` and `other` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */


    function baseIsEqual(value, other, customizer, bitmask, stack) {
      if (value === other) {
        return true;
      }

      if (value == null || other == null || !isObject(value) && !isObjectLike(other)) {
        return value !== value && other !== other;
      }

      return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
    }
    /**
     * A specialized version of `baseIsEqual` for arrays and objects which performs
     * deep comparisons and tracks traversed objects enabling objects with circular
     * references to be compared.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} [customizer] The function to customize comparisons.
     * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
     *  for more details.
     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */


    function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
      var objIsArr = isArray(object),
          othIsArr = isArray(other),
          objTag = arrayTag,
          othTag = arrayTag;

      if (!objIsArr) {
        objTag = getTag(object);
        objTag = objTag == argsTag ? objectTag : objTag;
      }

      if (!othIsArr) {
        othTag = getTag(other);
        othTag = othTag == argsTag ? objectTag : othTag;
      }

      var objIsObj = objTag == objectTag && !isHostObject(object),
          othIsObj = othTag == objectTag && !isHostObject(other),
          isSameTag = objTag == othTag;

      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack());
        return objIsArr || isTypedArray(object) ? equalArrays(object, other, equalFunc, customizer, bitmask, stack) : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
      }

      if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object,
              othUnwrapped = othIsWrapped ? other.value() : other;
          stack || (stack = new Stack());
          return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
        }
      }

      if (!isSameTag) {
        return false;
      }

      stack || (stack = new Stack());
      return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
    }
    /**
     * The base implementation of `_.isMatch` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Array} matchData The property names, values, and compare flags to match.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     */


    function baseIsMatch(object, source, matchData, customizer) {
      var index = matchData.length,
          length = index,
          noCustomizer = !customizer;

      if (object == null) {
        return !length;
      }

      object = Object(object);

      while (index--) {
        var data = matchData[index];

        if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
          return false;
        }
      }

      while (++index < length) {
        data = matchData[index];
        var key = data[0],
            objValue = object[key],
            srcValue = data[1];

        if (noCustomizer && data[2]) {
          if (objValue === undefined && !(key in object)) {
            return false;
          }
        } else {
          var stack = new Stack();

          if (customizer) {
            var result = customizer(objValue, srcValue, key, object, source, stack);
          }

          if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack) : result)) {
            return false;
          }
        }
      }

      return true;
    }
    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */


    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }

      var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    /**
     * The base implementation of `_.isTypedArray` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     */


    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
    }
    /**
     * The base implementation of `_.iteratee`.
     *
     * @private
     * @param {*} [value=_.identity] The value to convert to an iteratee.
     * @returns {Function} Returns the iteratee.
     */


    function baseIteratee(value) {
      // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
      // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
      if (typeof value == 'function') {
        return value;
      }

      if (value == null) {
        return identity;
      }

      if (typeof value == 'object') {
        return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
      }

      return property(value);
    }
    /**
     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */


    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }

      var result = [];

      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != 'constructor') {
          result.push(key);
        }
      }

      return result;
    }
    /**
     * The base implementation of `_.matches` which doesn't clone `source`.
     *
     * @private
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new spec function.
     */


    function baseMatches(source) {
      var matchData = getMatchData(source);

      if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }

      return function (object) {
        return object === source || baseIsMatch(object, source, matchData);
      };
    }
    /**
     * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
     *
     * @private
     * @param {string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */


    function baseMatchesProperty(path, srcValue) {
      if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
      }

      return function (object) {
        var objValue = get(object, path);
        return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
      };
    }
    /**
     * A specialized version of `baseProperty` which supports deep paths.
     *
     * @private
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     */


    function basePropertyDeep(path) {
      return function (object) {
        return baseGet(object, path);
      };
    }
    /**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */


    function baseToString(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }

      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : '';
      }

      var result = value + '';
      return result == '0' && 1 / value == -INFINITY ? '-0' : result;
    }
    /**
     * The base implementation of `_.uniqBy` without support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     */


    function baseUniq(array, iteratee, comparator) {
      var index = -1,
          includes = arrayIncludes,
          length = array.length,
          isCommon = true,
          result = [],
          seen = result;

      if (comparator) {
        isCommon = false;
        includes = arrayIncludesWith;
      } else if (length >= LARGE_ARRAY_SIZE) {
        var set = iteratee ? null : createSet(array);

        if (set) {
          return setToArray(set);
        }

        isCommon = false;
        includes = cacheHas;
        seen = new SetCache();
      } else {
        seen = iteratee ? [] : result;
      }

      outer: while (++index < length) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;
        value = comparator || value !== 0 ? value : 0;

        if (isCommon && computed === computed) {
          var seenIndex = seen.length;

          while (seenIndex--) {
            if (seen[seenIndex] === computed) {
              continue outer;
            }
          }

          if (iteratee) {
            seen.push(computed);
          }

          result.push(value);
        } else if (!includes(seen, computed, comparator)) {
          if (seen !== result) {
            seen.push(computed);
          }

          result.push(value);
        }
      }

      return result;
    }
    /**
     * Casts `value` to a path array if it's not one.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {Array} Returns the cast property path array.
     */


    function castPath(value) {
      return isArray(value) ? value : stringToPath(value);
    }
    /**
     * Creates a set object of `values`.
     *
     * @private
     * @param {Array} values The values to add to the set.
     * @returns {Object} Returns the new set.
     */


    var createSet = !(Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY) ? noop : function (values) {
      return new Set(values);
    };
    /**
     * A specialized version of `baseIsEqualDeep` for arrays with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Array} array The array to compare.
     * @param {Array} other The other array to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} customizer The function to customize comparisons.
     * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
     *  for more details.
     * @param {Object} stack Tracks traversed `array` and `other` objects.
     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
     */

    function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
          arrLength = array.length,
          othLength = other.length;

      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      } // Assume cyclic values are equal.


      var stacked = stack.get(array);

      if (stacked && stack.get(other)) {
        return stacked == other;
      }

      var index = -1,
          result = true,
          seen = bitmask & UNORDERED_COMPARE_FLAG ? new SetCache() : undefined;
      stack.set(array, other);
      stack.set(other, array); // Ignore non-index properties.

      while (++index < arrLength) {
        var arrValue = array[index],
            othValue = other[index];

        if (customizer) {
          var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
        }

        if (compared !== undefined) {
          if (compared) {
            continue;
          }

          result = false;
          break;
        } // Recursively compare arrays (susceptible to call stack limits).


        if (seen) {
          if (!arraySome(other, function (othValue, othIndex) {
            if (!seen.has(othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
              return seen.add(othIndex);
            }
          })) {
            result = false;
            break;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
          result = false;
          break;
        }
      }

      stack['delete'](array);
      stack['delete'](other);
      return result;
    }
    /**
     * A specialized version of `baseIsEqualDeep` for comparing objects of
     * the same `toStringTag`.
     *
     * **Note:** This function only supports comparing values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {string} tag The `toStringTag` of the objects to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} customizer The function to customize comparisons.
     * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
     *  for more details.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */


    function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
      switch (tag) {
        case dataViewTag:
          if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
            return false;
          }

          object = object.buffer;
          other = other.buffer;

        case arrayBufferTag:
          if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
            return false;
          }

          return true;

        case boolTag:
        case dateTag:
        case numberTag:
          // Coerce booleans to `1` or `0` and dates to milliseconds.
          // Invalid dates are coerced to `NaN`.
          return eq(+object, +other);

        case errorTag:
          return object.name == other.name && object.message == other.message;

        case regexpTag:
        case stringTag:
          // Coerce regexes to strings and treat strings, primitives and objects,
          // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
          // for more details.
          return object == other + '';

        case mapTag:
          var convert = mapToArray;

        case setTag:
          var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
          convert || (convert = setToArray);

          if (object.size != other.size && !isPartial) {
            return false;
          } // Assume cyclic values are equal.


          var stacked = stack.get(object);

          if (stacked) {
            return stacked == other;
          }

          bitmask |= UNORDERED_COMPARE_FLAG; // Recursively compare objects (susceptible to call stack limits).

          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
          stack['delete'](object);
          return result;

        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }

      }

      return false;
    }
    /**
     * A specialized version of `baseIsEqualDeep` for objects with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} customizer The function to customize comparisons.
     * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
     *  for more details.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */


    function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
          objProps = keys(object),
          objLength = objProps.length,
          othProps = keys(other),
          othLength = othProps.length;

      if (objLength != othLength && !isPartial) {
        return false;
      }

      var index = objLength;

      while (index--) {
        var key = objProps[index];

        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      } // Assume cyclic values are equal.


      var stacked = stack.get(object);

      if (stacked && stack.get(other)) {
        return stacked == other;
      }

      var result = true;
      stack.set(object, other);
      stack.set(other, object);
      var skipCtor = isPartial;

      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key],
            othValue = other[key];

        if (customizer) {
          var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
        } // Recursively compare objects (susceptible to call stack limits).


        if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack) : compared)) {
          result = false;
          break;
        }

        skipCtor || (skipCtor = key == 'constructor');
      }

      if (result && !skipCtor) {
        var objCtor = object.constructor,
            othCtor = other.constructor; // Non `Object` object instances with different constructors are not equal.

        if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
          result = false;
        }
      }

      stack['delete'](object);
      stack['delete'](other);
      return result;
    }
    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */


    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
    }
    /**
     * Gets the property names, values, and compare flags of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the match data of `object`.
     */


    function getMatchData(object) {
      var result = keys(object),
          length = result.length;

      while (length--) {
        var key = result[length],
            value = object[key];
        result[length] = [key, value, isStrictComparable(value)];
      }

      return result;
    }
    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */


    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : undefined;
    }
    /**
     * Gets the `toStringTag` of `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */


    var getTag = baseGetTag; // Fallback for data views, maps, sets, and weak maps in IE 11,
    // for data views in Edge < 14, and promises in Node.js.

    if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
      getTag = function (value) {
        var result = objectToString.call(value),
            Ctor = result == objectTag ? value.constructor : undefined,
            ctorString = Ctor ? toSource(Ctor) : undefined;

        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;

            case mapCtorString:
              return mapTag;

            case promiseCtorString:
              return promiseTag;

            case setCtorString:
              return setTag;

            case weakMapCtorString:
              return weakMapTag;
          }
        }

        return result;
      };
    }
    /**
     * Checks if `path` exists on `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @param {Function} hasFunc The function to check properties.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     */


    function hasPath(object, path, hasFunc) {
      path = isKey(path, object) ? [path] : castPath(path);
      var result,
          index = -1,
          length = path.length;

      while (++index < length) {
        var key = toKey(path[index]);

        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }

        object = object[key];
      }

      if (result) {
        return result;
      }

      var length = object ? object.length : 0;
      return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
    }
    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */


    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
    }
    /**
     * Checks if `value` is a property name and not a property path.
     *
     * @private
     * @param {*} value The value to check.
     * @param {Object} [object] The object to query keys on.
     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
     */


    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }

      var type = typeof value;

      if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
        return true;
      }

      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
    }
    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */


    function isKeyable(value) {
      var type = typeof value;
      return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
    }
    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */


    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */


    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
      return value === proto;
    }
    /**
     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` if suitable for strict
     *  equality comparisons, else `false`.
     */


    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }
    /**
     * A specialized version of `matchesProperty` for source values suitable
     * for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */


    function matchesStrictComparable(key, srcValue) {
      return function (object) {
        if (object == null) {
          return false;
        }

        return object[key] === srcValue && (srcValue !== undefined || key in Object(object));
      };
    }
    /**
     * Converts `string` to a property path array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the property path array.
     */


    var stringToPath = memoize(function (string) {
      string = toString(string);
      var result = [];

      if (reLeadingDot.test(string)) {
        result.push('');
      }

      string.replace(rePropName, function (match, number, quote, string) {
        result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
      });
      return result;
    });
    /**
     * Converts `value` to a string key if it's not a string or symbol.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {string|symbol} Returns the key.
     */

    function toKey(value) {
      if (typeof value == 'string' || isSymbol(value)) {
        return value;
      }

      var result = value + '';
      return result == '0' && 1 / value == -INFINITY ? '-0' : result;
    }
    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to process.
     * @returns {string} Returns the source code.
     */


    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {}

        try {
          return func + '';
        } catch (e) {}
      }

      return '';
    }
    /**
     * This method is like `_.uniq` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * uniqueness is computed. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee=_.identity]
     *  The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
     * // => [2.1, 1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */


    function uniqBy(array, iteratee) {
      return array && array.length ? baseUniq(array, baseIteratee(iteratee, 2)) : [];
    }
    /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided, it determines the cache key for storing the result based on the
     * arguments provided to the memoized function. By default, the first argument
     * provided to the memoized function is used as the map cache key. The `func`
     * is invoked with the `this` binding of the memoized function.
     *
     * **Note:** The cache is exposed as the `cache` property on the memoized
     * function. Its creation may be customized by replacing the `_.memoize.Cache`
     * constructor with one whose instances implement the
     * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
     * method interface of `delete`, `get`, `has`, and `set`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] The function to resolve the cache key.
     * @returns {Function} Returns the new memoized function.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     * var other = { 'c': 3, 'd': 4 };
     *
     * var values = _.memoize(_.values);
     * values(object);
     * // => [1, 2]
     *
     * values(other);
     * // => [3, 4]
     *
     * object.a = 2;
     * values(object);
     * // => [1, 2]
     *
     * // Modify the result cache.
     * values.cache.set(object, ['a', 'b']);
     * values(object);
     * // => ['a', 'b']
     *
     * // Replace `_.memoize.Cache`.
     * _.memoize.Cache = WeakMap;
     */


    function memoize(func, resolver) {
      if (typeof func != 'function' || resolver && typeof resolver != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }

      var memoized = function () {
        var args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            cache = memoized.cache;

        if (cache.has(key)) {
          return cache.get(key);
        }

        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result);
        return result;
      };

      memoized.cache = new (memoize.Cache || MapCache)();
      return memoized;
    } // Assign cache to `_.memoize`.


    memoize.Cache = MapCache;
    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */

    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */


    function isArguments(value) {
      // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
      return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
    }
    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */


    var isArray = Array.isArray;
    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */

    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    /**
     * This method is like `_.isArrayLike` except that it also checks if `value`
     * is an object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array-like object,
     *  else `false`.
     * @example
     *
     * _.isArrayLikeObject([1, 2, 3]);
     * // => true
     *
     * _.isArrayLikeObject(document.body.children);
     * // => true
     *
     * _.isArrayLikeObject('abc');
     * // => false
     *
     * _.isArrayLikeObject(_.noop);
     * // => false
     */


    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */


    function isFunction(value) {
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 8-9 which returns 'object' for typed array and other constructors.
      var tag = isObject(value) ? objectToString.call(value) : '';
      return tag == funcTag || tag == genTag;
    }
    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */


    function isLength(value) {
      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */


    function isObject(value) {
      var type = typeof value;
      return !!value && (type == 'object' || type == 'function');
    }
    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */


    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }
    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */


    function isSymbol(value) {
      return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */


    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */

    function toString(value) {
      return value == null ? '' : baseToString(value);
    }
    /**
     * Gets the value at `path` of `object`. If the resolved value is
     * `undefined`, the `defaultValue` is returned in its place.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */


    function get(object, path, defaultValue) {
      var result = object == null ? undefined : baseGet(object, path);
      return result === undefined ? defaultValue : result;
    }
    /**
     * Checks if `path` is a direct or inherited property of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.hasIn(object, 'a');
     * // => true
     *
     * _.hasIn(object, 'a.b');
     * // => true
     *
     * _.hasIn(object, ['a', 'b']);
     * // => true
     *
     * _.hasIn(object, 'b');
     * // => false
     */


    function hasIn(object, path) {
      return object != null && hasPath(object, path, baseHasIn);
    }
    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */


    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    /**
     * This method returns the first argument it receives.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'a': 1 };
     *
     * console.log(_.identity(object) === object);
     * // => true
     */


    function identity(value) {
      return value;
    }
    /**
     * This method returns `undefined`.
     *
     * @static
     * @memberOf _
     * @since 2.3.0
     * @category Util
     * @example
     *
     * _.times(2, _.noop);
     * // => [undefined, undefined]
     */


    function noop() {} // No operation performed.

    /**
     * Creates a function that returns the value at `path` of a given object.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': 2 } },
     *   { 'a': { 'b': 1 } }
     * ];
     *
     * _.map(objects, _.property('a.b'));
     * // => [2, 1]
     *
     * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
     * // => [1, 2]
     */


    function property(path) {
      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
    }

    module.exports = uniqBy;
  });

  var lodash_remove = createCommonjsModule(function (module, exports) {
    /**
     * lodash (Custom Build) <https://lodash.com/>
     * Build: `lodash modularize exports="npm" -o ./`
     * Copyright jQuery Foundation and other contributors <https://jquery.org/>
     * Released under MIT license <https://lodash.com/license>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     */

    /** Used as the size to enable large array optimizations. */
    var LARGE_ARRAY_SIZE = 200;
    /** Used as the `TypeError` message for "Functions" methods. */

    var FUNC_ERROR_TEXT = 'Expected a function';
    /** Used to stand-in for `undefined` hash values. */

    var HASH_UNDEFINED = '__lodash_hash_undefined__';
    /** Used to compose bitmasks for comparison styles. */

    var UNORDERED_COMPARE_FLAG = 1,
        PARTIAL_COMPARE_FLAG = 2;
    /** Used as references for various `Number` constants. */

    var INFINITY = 1 / 0,
        MAX_SAFE_INTEGER = 9007199254740991;
    /** `Object#toString` result references. */

    var argsTag = '[object Arguments]',
        arrayTag = '[object Array]',
        boolTag = '[object Boolean]',
        dateTag = '[object Date]',
        errorTag = '[object Error]',
        funcTag = '[object Function]',
        genTag = '[object GeneratorFunction]',
        mapTag = '[object Map]',
        numberTag = '[object Number]',
        objectTag = '[object Object]',
        promiseTag = '[object Promise]',
        regexpTag = '[object RegExp]',
        setTag = '[object Set]',
        stringTag = '[object String]',
        symbolTag = '[object Symbol]',
        weakMapTag = '[object WeakMap]';
    var arrayBufferTag = '[object ArrayBuffer]',
        dataViewTag = '[object DataView]',
        float32Tag = '[object Float32Array]',
        float64Tag = '[object Float64Array]',
        int8Tag = '[object Int8Array]',
        int16Tag = '[object Int16Array]',
        int32Tag = '[object Int32Array]',
        uint8Tag = '[object Uint8Array]',
        uint8ClampedTag = '[object Uint8ClampedArray]',
        uint16Tag = '[object Uint16Array]',
        uint32Tag = '[object Uint32Array]';
    /** Used to match property names within property paths. */

    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
        reIsPlainProp = /^\w*$/,
        reLeadingDot = /^\./,
        rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    /**
     * Used to match `RegExp`
     * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
     */

    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    /** Used to match backslashes in property paths. */

    var reEscapeChar = /\\(\\)?/g;
    /** Used to detect host constructors (Safari). */

    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    /** Used to detect unsigned integer values. */

    var reIsUint = /^(?:0|[1-9]\d*)$/;
    /** Used to identify `toStringTag` values of typed arrays. */

    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    /** Detect free variable `global` from Node.js. */

    var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
    /** Detect free variable `self`. */

    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
    /** Used as a reference to the global object. */

    var root = freeGlobal || freeSelf || Function('return this')();
    /** Detect free variable `exports`. */

    var freeExports = exports && !exports.nodeType && exports;
    /** Detect free variable `module`. */

    var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
    /** Detect the popular CommonJS extension `module.exports`. */

    var moduleExports = freeModule && freeModule.exports === freeExports;
    /** Detect free variable `process` from Node.js. */

    var freeProcess = moduleExports && freeGlobal.process;
    /** Used to access faster Node.js helpers. */

    var nodeUtil = function () {
      try {
        return freeProcess && freeProcess.binding('util');
      } catch (e) {}
    }();
    /* Node.js helper references. */


    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    /**
     * A specialized version of `_.some` for arrays without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */

    function arraySome(array, predicate) {
      var index = -1,
          length = array ? array.length : 0;

      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }

      return false;
    }
    /**
     * The base implementation of `_.property` without support for deep paths.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @returns {Function} Returns the new accessor function.
     */


    function baseProperty(key) {
      return function (object) {
        return object == null ? undefined : object[key];
      };
    }
    /**
     * The base implementation of `_.times` without support for iteratee shorthands
     * or max array length checks.
     *
     * @private
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     */


    function baseTimes(n, iteratee) {
      var index = -1,
          result = Array(n);

      while (++index < n) {
        result[index] = iteratee(index);
      }

      return result;
    }
    /**
     * The base implementation of `_.unary` without support for storing metadata.
     *
     * @private
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new capped function.
     */


    function baseUnary(func) {
      return function (value) {
        return func(value);
      };
    }
    /**
     * Gets the value at `key` of `object`.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */


    function getValue(object, key) {
      return object == null ? undefined : object[key];
    }
    /**
     * Checks if `value` is a host object in IE < 9.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
     */


    function isHostObject(value) {
      // Many host objects are `Object` objects that can coerce to strings
      // despite having improperly defined `toString` methods.
      var result = false;

      if (value != null && typeof value.toString != 'function') {
        try {
          result = !!(value + '');
        } catch (e) {}
      }

      return result;
    }
    /**
     * Converts `map` to its key-value pairs.
     *
     * @private
     * @param {Object} map The map to convert.
     * @returns {Array} Returns the key-value pairs.
     */


    function mapToArray(map) {
      var index = -1,
          result = Array(map.size);
      map.forEach(function (value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    /**
     * Creates a unary function that invokes `func` with its argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */


    function overArg(func, transform) {
      return function (arg) {
        return func(transform(arg));
      };
    }
    /**
     * Converts `set` to an array of its values.
     *
     * @private
     * @param {Object} set The set to convert.
     * @returns {Array} Returns the values.
     */


    function setToArray(set) {
      var index = -1,
          result = Array(set.size);
      set.forEach(function (value) {
        result[++index] = value;
      });
      return result;
    }
    /** Used for built-in method references. */


    var arrayProto = Array.prototype,
        funcProto = Function.prototype,
        objectProto = Object.prototype;
    /** Used to detect overreaching core-js shims. */

    var coreJsData = root['__core-js_shared__'];
    /** Used to detect methods masquerading as native. */

    var maskSrcKey = function () {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
      return uid ? 'Symbol(src)_1.' + uid : '';
    }();
    /** Used to resolve the decompiled source of functions. */


    var funcToString = funcProto.toString;
    /** Used to check objects for own properties. */

    var hasOwnProperty = objectProto.hasOwnProperty;
    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */

    var objectToString = objectProto.toString;
    /** Used to detect if a method is native. */

    var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
    /** Built-in value references. */

    var Symbol = root.Symbol,
        Uint8Array = root.Uint8Array,
        propertyIsEnumerable = objectProto.propertyIsEnumerable,
        splice = arrayProto.splice;
    /* Built-in method references for those with the same name as other `lodash` methods. */

    var nativeKeys = overArg(Object.keys, Object);
    /* Built-in method references that are verified to be native. */

    var DataView = getNative(root, 'DataView'),
        Map = getNative(root, 'Map'),
        Promise = getNative(root, 'Promise'),
        Set = getNative(root, 'Set'),
        WeakMap = getNative(root, 'WeakMap'),
        nativeCreate = getNative(Object, 'create');
    /** Used to detect maps, sets, and weakmaps. */

    var dataViewCtorString = toSource(DataView),
        mapCtorString = toSource(Map),
        promiseCtorString = toSource(Promise),
        setCtorString = toSource(Set),
        weakMapCtorString = toSource(WeakMap);
    /** Used to convert symbols to primitives and strings. */

    var symbolProto = Symbol ? Symbol.prototype : undefined,
        symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
        symbolToString = symbolProto ? symbolProto.toString : undefined;
    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */

    function Hash(entries) {
      var index = -1,
          length = entries ? entries.length : 0;
      this.clear();

      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */


    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }
    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */


    function hashDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }
    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */


    function hashGet(key) {
      var data = this.__data__;

      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
      }

      return hasOwnProperty.call(data, key) ? data[key] : undefined;
    }
    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */


    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
    }
    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */


    function hashSet(key, value) {
      var data = this.__data__;
      data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
      return this;
    } // Add methods to `Hash`.


    Hash.prototype.clear = hashClear;
    Hash.prototype['delete'] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */

    function ListCache(entries) {
      var index = -1,
          length = entries ? entries.length : 0;
      this.clear();

      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */


    function listCacheClear() {
      this.__data__ = [];
    }
    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */


    function listCacheDelete(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        return false;
      }

      var lastIndex = data.length - 1;

      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }

      return true;
    }
    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */


    function listCacheGet(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);
      return index < 0 ? undefined : data[index][1];
    }
    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */


    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */


    function listCacheSet(key, value) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }

      return this;
    } // Add methods to `ListCache`.


    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype['delete'] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */

    function MapCache(entries) {
      var index = -1,
          length = entries ? entries.length : 0;
      this.clear();

      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */


    function mapCacheClear() {
      this.__data__ = {
        'hash': new Hash(),
        'map': new (Map || ListCache)(),
        'string': new Hash()
      };
    }
    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */


    function mapCacheDelete(key) {
      return getMapData(this, key)['delete'](key);
    }
    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */


    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */


    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */


    function mapCacheSet(key, value) {
      getMapData(this, key).set(key, value);
      return this;
    } // Add methods to `MapCache`.


    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype['delete'] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    /**
     *
     * Creates an array cache object to store unique values.
     *
     * @private
     * @constructor
     * @param {Array} [values] The values to cache.
     */

    function SetCache(values) {
      var index = -1,
          length = values ? values.length : 0;
      this.__data__ = new MapCache();

      while (++index < length) {
        this.add(values[index]);
      }
    }
    /**
     * Adds `value` to the array cache.
     *
     * @private
     * @name add
     * @memberOf SetCache
     * @alias push
     * @param {*} value The value to cache.
     * @returns {Object} Returns the cache instance.
     */


    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);

      return this;
    }
    /**
     * Checks if `value` is in the array cache.
     *
     * @private
     * @name has
     * @memberOf SetCache
     * @param {*} value The value to search for.
     * @returns {number} Returns `true` if `value` is found, else `false`.
     */


    function setCacheHas(value) {
      return this.__data__.has(value);
    } // Add methods to `SetCache`.


    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */

    function Stack(entries) {
      this.__data__ = new ListCache(entries);
    }
    /**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */


    function stackClear() {
      this.__data__ = new ListCache();
    }
    /**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */


    function stackDelete(key) {
      return this.__data__['delete'](key);
    }
    /**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */


    function stackGet(key) {
      return this.__data__.get(key);
    }
    /**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */


    function stackHas(key) {
      return this.__data__.has(key);
    }
    /**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */


    function stackSet(key, value) {
      var cache = this.__data__;

      if (cache instanceof ListCache) {
        var pairs = cache.__data__;

        if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          return this;
        }

        cache = this.__data__ = new MapCache(pairs);
      }

      cache.set(key, value);
      return this;
    } // Add methods to `Stack`.


    Stack.prototype.clear = stackClear;
    Stack.prototype['delete'] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */

    function arrayLikeKeys(value, inherited) {
      // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
      // Safari 9 makes `arguments.length` enumerable in strict mode.
      var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
      var length = result.length,
          skipIndexes = !!length;

      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
          result.push(key);
        }
      }

      return result;
    }
    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */


    function assocIndexOf(array, key) {
      var length = array.length;

      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }

      return -1;
    }
    /**
     * The base implementation of `_.get` without support for default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @returns {*} Returns the resolved value.
     */


    function baseGet(object, path) {
      path = isKey(path, object) ? [path] : castPath(path);
      var index = 0,
          length = path.length;

      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }

      return index && index == length ? object : undefined;
    }
    /**
     * The base implementation of `getTag`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */


    function baseGetTag(value) {
      return objectToString.call(value);
    }
    /**
     * The base implementation of `_.hasIn` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */


    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }
    /**
     * The base implementation of `_.isEqual` which supports partial comparisons
     * and tracks traversed objects.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {Function} [customizer] The function to customize comparisons.
     * @param {boolean} [bitmask] The bitmask of comparison flags.
     *  The bitmask may be composed of the following flags:
     *     1 - Unordered comparison
     *     2 - Partial comparison
     * @param {Object} [stack] Tracks traversed `value` and `other` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */


    function baseIsEqual(value, other, customizer, bitmask, stack) {
      if (value === other) {
        return true;
      }

      if (value == null || other == null || !isObject(value) && !isObjectLike(other)) {
        return value !== value && other !== other;
      }

      return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
    }
    /**
     * A specialized version of `baseIsEqual` for arrays and objects which performs
     * deep comparisons and tracks traversed objects enabling objects with circular
     * references to be compared.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} [customizer] The function to customize comparisons.
     * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
     *  for more details.
     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */


    function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
      var objIsArr = isArray(object),
          othIsArr = isArray(other),
          objTag = arrayTag,
          othTag = arrayTag;

      if (!objIsArr) {
        objTag = getTag(object);
        objTag = objTag == argsTag ? objectTag : objTag;
      }

      if (!othIsArr) {
        othTag = getTag(other);
        othTag = othTag == argsTag ? objectTag : othTag;
      }

      var objIsObj = objTag == objectTag && !isHostObject(object),
          othIsObj = othTag == objectTag && !isHostObject(other),
          isSameTag = objTag == othTag;

      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack());
        return objIsArr || isTypedArray(object) ? equalArrays(object, other, equalFunc, customizer, bitmask, stack) : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
      }

      if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object,
              othUnwrapped = othIsWrapped ? other.value() : other;
          stack || (stack = new Stack());
          return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
        }
      }

      if (!isSameTag) {
        return false;
      }

      stack || (stack = new Stack());
      return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
    }
    /**
     * The base implementation of `_.isMatch` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Array} matchData The property names, values, and compare flags to match.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     */


    function baseIsMatch(object, source, matchData, customizer) {
      var index = matchData.length,
          length = index,
          noCustomizer = !customizer;

      if (object == null) {
        return !length;
      }

      object = Object(object);

      while (index--) {
        var data = matchData[index];

        if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
          return false;
        }
      }

      while (++index < length) {
        data = matchData[index];
        var key = data[0],
            objValue = object[key],
            srcValue = data[1];

        if (noCustomizer && data[2]) {
          if (objValue === undefined && !(key in object)) {
            return false;
          }
        } else {
          var stack = new Stack();

          if (customizer) {
            var result = customizer(objValue, srcValue, key, object, source, stack);
          }

          if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack) : result)) {
            return false;
          }
        }
      }

      return true;
    }
    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */


    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }

      var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    /**
     * The base implementation of `_.isTypedArray` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     */


    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
    }
    /**
     * The base implementation of `_.iteratee`.
     *
     * @private
     * @param {*} [value=_.identity] The value to convert to an iteratee.
     * @returns {Function} Returns the iteratee.
     */


    function baseIteratee(value) {
      // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
      // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
      if (typeof value == 'function') {
        return value;
      }

      if (value == null) {
        return identity;
      }

      if (typeof value == 'object') {
        return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
      }

      return property(value);
    }
    /**
     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */


    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }

      var result = [];

      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != 'constructor') {
          result.push(key);
        }
      }

      return result;
    }
    /**
     * The base implementation of `_.matches` which doesn't clone `source`.
     *
     * @private
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new spec function.
     */


    function baseMatches(source) {
      var matchData = getMatchData(source);

      if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }

      return function (object) {
        return object === source || baseIsMatch(object, source, matchData);
      };
    }
    /**
     * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
     *
     * @private
     * @param {string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */


    function baseMatchesProperty(path, srcValue) {
      if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
      }

      return function (object) {
        var objValue = get(object, path);
        return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
      };
    }
    /**
     * A specialized version of `baseProperty` which supports deep paths.
     *
     * @private
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     */


    function basePropertyDeep(path) {
      return function (object) {
        return baseGet(object, path);
      };
    }
    /**
     * The base implementation of `_.pullAt` without support for individual
     * indexes or capturing the removed elements.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {number[]} indexes The indexes of elements to remove.
     * @returns {Array} Returns `array`.
     */


    function basePullAt(array, indexes) {
      var length = array ? indexes.length : 0,
          lastIndex = length - 1;

      while (length--) {
        var index = indexes[length];

        if (length == lastIndex || index !== previous) {
          var previous = index;

          if (isIndex(index)) {
            splice.call(array, index, 1);
          } else if (!isKey(index, array)) {
            var path = castPath(index),
                object = parent(array, path);

            if (object != null) {
              delete object[toKey(last(path))];
            }
          } else {
            delete array[toKey(index)];
          }
        }
      }

      return array;
    }
    /**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */


    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;

      if (start < 0) {
        start = -start > length ? 0 : length + start;
      }

      end = end > length ? length : end;

      if (end < 0) {
        end += length;
      }

      length = start > end ? 0 : end - start >>> 0;
      start >>>= 0;
      var result = Array(length);

      while (++index < length) {
        result[index] = array[index + start];
      }

      return result;
    }
    /**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */


    function baseToString(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }

      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : '';
      }

      var result = value + '';
      return result == '0' && 1 / value == -INFINITY ? '-0' : result;
    }
    /**
     * Casts `value` to a path array if it's not one.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {Array} Returns the cast property path array.
     */


    function castPath(value) {
      return isArray(value) ? value : stringToPath(value);
    }
    /**
     * A specialized version of `baseIsEqualDeep` for arrays with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Array} array The array to compare.
     * @param {Array} other The other array to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} customizer The function to customize comparisons.
     * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
     *  for more details.
     * @param {Object} stack Tracks traversed `array` and `other` objects.
     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
     */


    function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
          arrLength = array.length,
          othLength = other.length;

      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      } // Assume cyclic values are equal.


      var stacked = stack.get(array);

      if (stacked && stack.get(other)) {
        return stacked == other;
      }

      var index = -1,
          result = true,
          seen = bitmask & UNORDERED_COMPARE_FLAG ? new SetCache() : undefined;
      stack.set(array, other);
      stack.set(other, array); // Ignore non-index properties.

      while (++index < arrLength) {
        var arrValue = array[index],
            othValue = other[index];

        if (customizer) {
          var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
        }

        if (compared !== undefined) {
          if (compared) {
            continue;
          }

          result = false;
          break;
        } // Recursively compare arrays (susceptible to call stack limits).


        if (seen) {
          if (!arraySome(other, function (othValue, othIndex) {
            if (!seen.has(othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
              return seen.add(othIndex);
            }
          })) {
            result = false;
            break;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
          result = false;
          break;
        }
      }

      stack['delete'](array);
      stack['delete'](other);
      return result;
    }
    /**
     * A specialized version of `baseIsEqualDeep` for comparing objects of
     * the same `toStringTag`.
     *
     * **Note:** This function only supports comparing values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {string} tag The `toStringTag` of the objects to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} customizer The function to customize comparisons.
     * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
     *  for more details.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */


    function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
      switch (tag) {
        case dataViewTag:
          if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
            return false;
          }

          object = object.buffer;
          other = other.buffer;

        case arrayBufferTag:
          if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
            return false;
          }

          return true;

        case boolTag:
        case dateTag:
        case numberTag:
          // Coerce booleans to `1` or `0` and dates to milliseconds.
          // Invalid dates are coerced to `NaN`.
          return eq(+object, +other);

        case errorTag:
          return object.name == other.name && object.message == other.message;

        case regexpTag:
        case stringTag:
          // Coerce regexes to strings and treat strings, primitives and objects,
          // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
          // for more details.
          return object == other + '';

        case mapTag:
          var convert = mapToArray;

        case setTag:
          var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
          convert || (convert = setToArray);

          if (object.size != other.size && !isPartial) {
            return false;
          } // Assume cyclic values are equal.


          var stacked = stack.get(object);

          if (stacked) {
            return stacked == other;
          }

          bitmask |= UNORDERED_COMPARE_FLAG; // Recursively compare objects (susceptible to call stack limits).

          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
          stack['delete'](object);
          return result;

        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }

      }

      return false;
    }
    /**
     * A specialized version of `baseIsEqualDeep` for objects with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} customizer The function to customize comparisons.
     * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
     *  for more details.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */


    function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
          objProps = keys(object),
          objLength = objProps.length,
          othProps = keys(other),
          othLength = othProps.length;

      if (objLength != othLength && !isPartial) {
        return false;
      }

      var index = objLength;

      while (index--) {
        var key = objProps[index];

        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      } // Assume cyclic values are equal.


      var stacked = stack.get(object);

      if (stacked && stack.get(other)) {
        return stacked == other;
      }

      var result = true;
      stack.set(object, other);
      stack.set(other, object);
      var skipCtor = isPartial;

      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key],
            othValue = other[key];

        if (customizer) {
          var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
        } // Recursively compare objects (susceptible to call stack limits).


        if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack) : compared)) {
          result = false;
          break;
        }

        skipCtor || (skipCtor = key == 'constructor');
      }

      if (result && !skipCtor) {
        var objCtor = object.constructor,
            othCtor = other.constructor; // Non `Object` object instances with different constructors are not equal.

        if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
          result = false;
        }
      }

      stack['delete'](object);
      stack['delete'](other);
      return result;
    }
    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */


    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
    }
    /**
     * Gets the property names, values, and compare flags of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the match data of `object`.
     */


    function getMatchData(object) {
      var result = keys(object),
          length = result.length;

      while (length--) {
        var key = result[length],
            value = object[key];
        result[length] = [key, value, isStrictComparable(value)];
      }

      return result;
    }
    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */


    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : undefined;
    }
    /**
     * Gets the `toStringTag` of `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */


    var getTag = baseGetTag; // Fallback for data views, maps, sets, and weak maps in IE 11,
    // for data views in Edge < 14, and promises in Node.js.

    if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
      getTag = function (value) {
        var result = objectToString.call(value),
            Ctor = result == objectTag ? value.constructor : undefined,
            ctorString = Ctor ? toSource(Ctor) : undefined;

        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;

            case mapCtorString:
              return mapTag;

            case promiseCtorString:
              return promiseTag;

            case setCtorString:
              return setTag;

            case weakMapCtorString:
              return weakMapTag;
          }
        }

        return result;
      };
    }
    /**
     * Checks if `path` exists on `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @param {Function} hasFunc The function to check properties.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     */


    function hasPath(object, path, hasFunc) {
      path = isKey(path, object) ? [path] : castPath(path);
      var result,
          index = -1,
          length = path.length;

      while (++index < length) {
        var key = toKey(path[index]);

        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }

        object = object[key];
      }

      if (result) {
        return result;
      }

      var length = object ? object.length : 0;
      return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
    }
    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */


    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
    }
    /**
     * Checks if `value` is a property name and not a property path.
     *
     * @private
     * @param {*} value The value to check.
     * @param {Object} [object] The object to query keys on.
     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
     */


    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }

      var type = typeof value;

      if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
        return true;
      }

      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
    }
    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */


    function isKeyable(value) {
      var type = typeof value;
      return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
    }
    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */


    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */


    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
      return value === proto;
    }
    /**
     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` if suitable for strict
     *  equality comparisons, else `false`.
     */


    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }
    /**
     * A specialized version of `matchesProperty` for source values suitable
     * for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */


    function matchesStrictComparable(key, srcValue) {
      return function (object) {
        if (object == null) {
          return false;
        }

        return object[key] === srcValue && (srcValue !== undefined || key in Object(object));
      };
    }
    /**
     * Gets the parent value at `path` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} path The path to get the parent value of.
     * @returns {*} Returns the parent value.
     */


    function parent(object, path) {
      return path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
    }
    /**
     * Converts `string` to a property path array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the property path array.
     */


    var stringToPath = memoize(function (string) {
      string = toString(string);
      var result = [];

      if (reLeadingDot.test(string)) {
        result.push('');
      }

      string.replace(rePropName, function (match, number, quote, string) {
        result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
      });
      return result;
    });
    /**
     * Converts `value` to a string key if it's not a string or symbol.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {string|symbol} Returns the key.
     */

    function toKey(value) {
      if (typeof value == 'string' || isSymbol(value)) {
        return value;
      }

      var result = value + '';
      return result == '0' && 1 / value == -INFINITY ? '-0' : result;
    }
    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to process.
     * @returns {string} Returns the source code.
     */


    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {}

        try {
          return func + '';
        } catch (e) {}
      }

      return '';
    }
    /**
     * Gets the last element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the last element of `array`.
     * @example
     *
     * _.last([1, 2, 3]);
     * // => 3
     */


    function last(array) {
      var length = array ? array.length : 0;
      return length ? array[length - 1] : undefined;
    }
    /**
     * Removes all elements from `array` that `predicate` returns truthy for
     * and returns an array of the removed elements. The predicate is invoked
     * with three arguments: (value, index, array).
     *
     * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
     * to pull elements from an array by value.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Function} [predicate=_.identity]
     *  The function invoked per iteration.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = [1, 2, 3, 4];
     * var evens = _.remove(array, function(n) {
     *   return n % 2 == 0;
     * });
     *
     * console.log(array);
     * // => [1, 3]
     *
     * console.log(evens);
     * // => [2, 4]
     */


    function remove(array, predicate) {
      var result = [];

      if (!(array && array.length)) {
        return result;
      }

      var index = -1,
          indexes = [],
          length = array.length;
      predicate = baseIteratee(predicate, 3);

      while (++index < length) {
        var value = array[index];

        if (predicate(value, index, array)) {
          result.push(value);
          indexes.push(index);
        }
      }

      basePullAt(array, indexes);
      return result;
    }
    /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided, it determines the cache key for storing the result based on the
     * arguments provided to the memoized function. By default, the first argument
     * provided to the memoized function is used as the map cache key. The `func`
     * is invoked with the `this` binding of the memoized function.
     *
     * **Note:** The cache is exposed as the `cache` property on the memoized
     * function. Its creation may be customized by replacing the `_.memoize.Cache`
     * constructor with one whose instances implement the
     * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
     * method interface of `delete`, `get`, `has`, and `set`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] The function to resolve the cache key.
     * @returns {Function} Returns the new memoized function.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     * var other = { 'c': 3, 'd': 4 };
     *
     * var values = _.memoize(_.values);
     * values(object);
     * // => [1, 2]
     *
     * values(other);
     * // => [3, 4]
     *
     * object.a = 2;
     * values(object);
     * // => [1, 2]
     *
     * // Modify the result cache.
     * values.cache.set(object, ['a', 'b']);
     * values(object);
     * // => ['a', 'b']
     *
     * // Replace `_.memoize.Cache`.
     * _.memoize.Cache = WeakMap;
     */


    function memoize(func, resolver) {
      if (typeof func != 'function' || resolver && typeof resolver != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }

      var memoized = function () {
        var args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            cache = memoized.cache;

        if (cache.has(key)) {
          return cache.get(key);
        }

        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result);
        return result;
      };

      memoized.cache = new (memoize.Cache || MapCache)();
      return memoized;
    } // Assign cache to `_.memoize`.


    memoize.Cache = MapCache;
    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */

    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */


    function isArguments(value) {
      // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
      return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
    }
    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */


    var isArray = Array.isArray;
    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */

    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    /**
     * This method is like `_.isArrayLike` except that it also checks if `value`
     * is an object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array-like object,
     *  else `false`.
     * @example
     *
     * _.isArrayLikeObject([1, 2, 3]);
     * // => true
     *
     * _.isArrayLikeObject(document.body.children);
     * // => true
     *
     * _.isArrayLikeObject('abc');
     * // => false
     *
     * _.isArrayLikeObject(_.noop);
     * // => false
     */


    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */


    function isFunction(value) {
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 8-9 which returns 'object' for typed array and other constructors.
      var tag = isObject(value) ? objectToString.call(value) : '';
      return tag == funcTag || tag == genTag;
    }
    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */


    function isLength(value) {
      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */


    function isObject(value) {
      var type = typeof value;
      return !!value && (type == 'object' || type == 'function');
    }
    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */


    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }
    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */


    function isSymbol(value) {
      return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */


    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */

    function toString(value) {
      return value == null ? '' : baseToString(value);
    }
    /**
     * Gets the value at `path` of `object`. If the resolved value is
     * `undefined`, the `defaultValue` is returned in its place.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */


    function get(object, path, defaultValue) {
      var result = object == null ? undefined : baseGet(object, path);
      return result === undefined ? defaultValue : result;
    }
    /**
     * Checks if `path` is a direct or inherited property of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.hasIn(object, 'a');
     * // => true
     *
     * _.hasIn(object, 'a.b');
     * // => true
     *
     * _.hasIn(object, ['a', 'b']);
     * // => true
     *
     * _.hasIn(object, 'b');
     * // => false
     */


    function hasIn(object, path) {
      return object != null && hasPath(object, path, baseHasIn);
    }
    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */


    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    /**
     * This method returns the first argument it receives.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'a': 1 };
     *
     * console.log(_.identity(object) === object);
     * // => true
     */


    function identity(value) {
      return value;
    }
    /**
     * Creates a function that returns the value at `path` of a given object.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': 2 } },
     *   { 'a': { 'b': 1 } }
     * ];
     *
     * _.map(objects, _.property('a.b'));
     * // => [2, 1]
     *
     * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
     * // => [1, 2]
     */


    function property(path) {
      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
    }

    module.exports = remove;
  });

  /*
   * error.ts
   * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
   *
   * Distributed under terms of the MIT license.
  */
  class QNRTCError extends Error {
      constructor(code, message) {
          super(message);
          this.code = code;
          this.error = message;
      }
  }
  const UNEXPECTED_ERROR = (msg) => new QNRTCError(11000, `piliRTC: unexpected error ${msg}`);
  const AUTH_ENTER_ROOM_ERROR = (msg) => new QNRTCError(11001, `enterRoom error, can not get accessToken. Error: ${msg}\n please check enterRoom arguments`);
  const PUBLISH_ERROR = (code, msg) => new QNRTCError(code, `publish error, signaling code: ${code}, msg: ${msg}`);
  const CREATE_MERGE_JOB_ERROR = (code, msg) => new QNRTCError(code, `create merge job error, signaling code: ${code}, msg: ${msg}`);
  const PUBLISH_ICE_ERROR = () => new QNRTCError(11002, `publish faild, ice not ready`);
  const SUB_ICE_ERROR = () => new QNRTCError(11003, `subscribe faild, ice not ready`);
  const SUB_ERROR_NO_STREAM = (userId) => new QNRTCError(11004, `subscribe faild, can not find this player in streams, userId: ${userId}`);
  const SUB_P2P_ERROR = (msg) => new QNRTCError(11005, `subscribe faild, can not create p2p connection, ${msg}`);
  const PUB_P2P_ERROR = (msg) => new QNRTCError(11006, `publish faild, can not create p2p connection, ${msg}`);
  const UNSUPPORT_FMT = (msg) => new QNRTCError(11007, `media format not support, ${msg}`);
  const JOIN_ROOM_ERROR = (code, msg) => new QNRTCError(code, `joinRoom error, code: ${code}, ${msg}`);
  const SUB_ERROR = (code, msg) => new QNRTCError(code, `subscribe error, signaling code: ${code}, msg: ${msg}`);
  const UNPUBLISH_ERROR = (code, msg) => new QNRTCError(code, "unpublish error, code: ${code}, msg: ${msg}");
  const UNSUB_ERROR = (code, msg) => new QNRTCError(code, "unsubscribe error, code: ${code}, msg: ${msg}");
  const CONTROL_ERROR = (code, msg) => new QNRTCError(code, `send control error, code: ${code}, msg: ${msg}`);
  const NOT_SUPPORT_ERROR = (msg) => new QNRTCError(11008, `not support! ${msg}`);
  const SERVER_UNAVAILABLE = () => new QNRTCError(10052, "server unavailable");
  const PLUGIN_NOT_AVALIABLE = (msg) => new QNRTCError(11009, `plugin not avaliable! ${msg}`);
  const DEVICE_NOT_ALLOWED = (msg) => new QNRTCError(11010, `NotAllowedError: no permission to access media device. ${msg}`);
  const SUB_ERROR_NO_USER = (userId) => new QNRTCError(11011, `subscribe faild, can not find this user in room, userId: ${userId}`);
  const NO_MERGE_JOB = (id) => new QNRTCError(11012, `can not set merge layout stream, no merge job id ${id}`);
  const SCREEN_PERMISSION_DENIED = () => new QNRTCError(11013, `can not sharing screen/window on chrome`);
  const SUB_PUB_ABORT = () => new QNRTCError(11014, `subscribe/publish operation is aborted`);
  const AUDIO_DECODE_ERROR = (e) => new QNRTCError(11015, `can not decode audio data, ${e.toString()}`);
  const AUTO_SWITCH_ERROR = (msg) => new QNRTCError(20001, `deviceManager auto switch error. ${msg}`);
  const WS_ABORT = () => new QNRTCError(30001, `websocket abort`);
  /**
   * Error produced when calling a method in an invalid state.
   */
  class InvalidStateError extends Error {
      constructor(message) {
          super(message);
          this.name = "InvalidStateError";
          if (Error.hasOwnProperty("captureStackTrace")) { // Just in V8.
              Error.captureStackTrace(this, InvalidStateError);
          }
          else {
              this.stack = (new Error(message)).stack;
          }
      }
  }

  var error = /*#__PURE__*/Object.freeze({
    QNRTCError: QNRTCError,
    UNEXPECTED_ERROR: UNEXPECTED_ERROR,
    AUTH_ENTER_ROOM_ERROR: AUTH_ENTER_ROOM_ERROR,
    PUBLISH_ERROR: PUBLISH_ERROR,
    CREATE_MERGE_JOB_ERROR: CREATE_MERGE_JOB_ERROR,
    PUBLISH_ICE_ERROR: PUBLISH_ICE_ERROR,
    SUB_ICE_ERROR: SUB_ICE_ERROR,
    SUB_ERROR_NO_STREAM: SUB_ERROR_NO_STREAM,
    SUB_P2P_ERROR: SUB_P2P_ERROR,
    PUB_P2P_ERROR: PUB_P2P_ERROR,
    UNSUPPORT_FMT: UNSUPPORT_FMT,
    JOIN_ROOM_ERROR: JOIN_ROOM_ERROR,
    SUB_ERROR: SUB_ERROR,
    UNPUBLISH_ERROR: UNPUBLISH_ERROR,
    UNSUB_ERROR: UNSUB_ERROR,
    CONTROL_ERROR: CONTROL_ERROR,
    NOT_SUPPORT_ERROR: NOT_SUPPORT_ERROR,
    SERVER_UNAVAILABLE: SERVER_UNAVAILABLE,
    PLUGIN_NOT_AVALIABLE: PLUGIN_NOT_AVALIABLE,
    DEVICE_NOT_ALLOWED: DEVICE_NOT_ALLOWED,
    SUB_ERROR_NO_USER: SUB_ERROR_NO_USER,
    NO_MERGE_JOB: NO_MERGE_JOB,
    SCREEN_PERMISSION_DENIED: SCREEN_PERMISSION_DENIED,
    SUB_PUB_ABORT: SUB_PUB_ABORT,
    AUDIO_DECODE_ERROR: AUDIO_DECODE_ERROR,
    AUTO_SWITCH_ERROR: AUTO_SWITCH_ERROR,
    WS_ABORT: WS_ABORT,
    InvalidStateError: InvalidStateError
  });

  class LogModel {
      constructor(level) {
          this.level = level;
      }
      setLevel(level) {
          this.level = level;
      }
      log(...args) {
          if (this.level !== "log") {
              return;
          }
          const pretitle = "%cLOG-QNRTC";
          const style = "color: #66ccff; font-weight: bold;";
          console.info(pretitle, style, ...args);
      }
      debug(...args) {
          if (this.level !== "log" && this.level !== "debug") {
              return;
          }
          const pretitle = "%cDEBUG-QNRTC";
          const style = "color: #A28148; font-weight: bold;";
          console.info(pretitle, style, ...args);
      }
      warning(...args) {
          if (this.level === "disable") {
              return;
          }
          const pretitle = "%cWARNING-QNRTC";
          const style = "color: #E44F44; font-weight: bold;";
          console.warn(pretitle, style, ...args);
      }
  }
  const log = new LogModel("log");

  function getPayloadFromJwt(jwttoken) {
      const payloadString = jwttoken.split(".")[1];
      if (!payloadString) {
          throw new Error("parse jwt error, can not find payload string.");
      }
      const decoedString = atob(payloadString);
      return JSON.parse(decoedString);
  }
  function getRoomAccessFromToken(roomToken) {
      try {
          const roomAccessString = roomToken.split(":")[2];
          const decoedString = atob(roomAccessString);
          return JSON.parse(decoedString);
      }
      catch (e) {
          throw UNEXPECTED_ERROR(`can not parse roomToken, ${e}`);
      }
  }
  function removeElementFromArray(array, key, value) {
      const newArray = [];
      let removeElement = null;
      for (let i = 0; i < array.length; i += 1) {
          const element = array[i];
          if (element[key] === value) {
              removeElement = array[i];
              continue;
          }
          newArray.push(array[i]);
      }
      return { removeElement, newArray };
  }
  function getElementFromArray(array, key, value) {
      if (!value) {
          return null;
      }
      for (let i = 0; i < array.length; i += 1) {
          const item = array[i];
          if (item[key] === value) {
              return item;
          }
      }
      return null;
  }
  function removeUndefinedKey(obj, depth = 0) {
      if (depth >= 4) {
          return obj;
      }
      for (const key in obj) {
          if (obj[key] === undefined) {
              delete obj[key];
          }
          if (typeof obj[key] === "object") {
              obj[key] = removeUndefinedKey(obj[key], depth + 1);
          }
      }
      return obj;
  }
  function nextTick(func) {
      const p = Promise.resolve();
      p.then(func);
  }
  function getMissingUserEvent(currentUserId, lastTracksInfo, currentTracksInfo, lastUsers, currentUsers) {
      const missingEvent = {
          join: [],
          leave: [],
          add: [],
          remove: [],
          mute: [],
      };
      const lastTracksIds = lastTracksInfo.map(info => info.trackid);
      const currentTracksIds = currentTracksInfo.map(info => info.trackid);
      lastTracksIds.forEach((trackId, i) => {
          if (lastTracksInfo[i].playerid === currentUserId) {
              return;
          }
          if (currentTracksIds.indexOf(trackId) === -1) {
              missingEvent.remove.push(lastTracksInfo[i]);
          }
          else {
              const currentTracksInfoItem = currentTracksInfo.find(t => t.trackid === trackId);
              const lastTrackInfoItem = lastTracksInfo[i];
              // 如果重连后 trackid 相同但是 versionid 不同，抛出 track-remove 和 track-add
              if (currentTracksInfoItem.versionid !== lastTrackInfoItem.versionid) {
                  missingEvent.remove.push(lastTrackInfoItem);
                  missingEvent.add.push(currentTracksInfoItem);
              }
          }
      });
      currentTracksIds.forEach((trackId, i) => {
          if (currentTracksInfo[i].playerid === currentUserId) {
              return;
          }
          const index = lastTracksIds.indexOf(trackId);
          if (index === -1) {
              missingEvent.add.push(currentTracksInfo[i]);
              missingEvent.mute.push({
                  trackid: trackId,
                  muted: currentTracksInfo[i].muted,
              });
          }
          else {
              if (currentTracksInfo[i].muted !== lastTracksInfo[index].muted) {
                  missingEvent.mute.push({
                      trackid: trackId,
                      muted: currentTracksInfo[i].muted,
                  });
              }
          }
      });
      lastUsers.forEach(userId => {
          if (userId === currentUserId) {
              return;
          }
          if (currentUsers.indexOf(userId) === -1) {
              missingEvent.leave.push({ playerid: userId });
          }
      });
      currentUsers.forEach(userId => {
          if (userId === currentUserId) {
              return;
          }
          if (lastUsers.indexOf(userId) === -1) {
              missingEvent.join.push({ playerid: userId });
          }
      });
      return missingEvent;
  }
  function dec2hex(dec) {
      return ("0" + dec.toString(16)).substr(-2);
  }
  function randomStringGen(strLength = 5) {
      const arr = new Uint8Array((strLength || 40) / 2);
      window.crypto.getRandomValues(arr);
      return Array.from(arr, dec2hex).join("");
  }
  function timeout(ms) {
      return new Promise(resolve => {
          setTimeout(() => {
              resolve();
          }, ms);
      });
  }
  const runOnceFlag = {};
  /**
   * 对于相同 key 的调用，只会执行一次
   */
  function runOnce(func, key) {
      if (!runOnceFlag[key]) {
          runOnceFlag[key] = true;
          return func();
      }
  }
  function showPlayWarn() {
      log.warning("play failed due to browser security policy, see: http://s.qnsdk.com/s/Txsdz");
  }

  /*
   * http.js
   * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
   *
   * Distributed under terms of the MIT license.
   */
  async function request(url) {
      const res = await fetch(url);
      if (res.status >= 400 && res.status < 500) {
          throw { retry: false, message: res.status.toString() };
      }
      if (res.status !== 200) {
          throw { retry: true, message: res.status.toString() };
      }
      const data = await res.json();
      return data;
  }
  async function resolveIceHost(host) {
      const ipv6Match = host.match(/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/);
      const ipv4Match = host.match(/^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/);
      if (!!ipv4Match || !!ipv6Match)
          return host;
      try {
          const res = await fetch(`https://${host}/ip`);
          const data = await res.json();
          return data.ip;
      }
      catch (e) {
          log.warning("resolve ice failed, retry", e);
          await timeout(1000);
          return await resolveIceHost(host);
      }
  }

  const defaultTrackStatsReport = () => ({
      packetLossRate: 0,
      bitrate: 0,
      bytes: 0,
      packets: 0,
      packetLoss: 0,
      timestamp: Date.now(),
  });
  async function getStats(pc, track, pctype) {
      const statsReport = defaultTrackStatsReport();
      let report;
      try {
          report = await pc.getStats(track);
      }
      catch (e) {
          log.debug("get stats error, fallback to default", e);
          return defaultTrackStatsReport();
      }
      if (!report) {
          log.debug("get null stats, fallback to default");
          return defaultTrackStatsReport();
      }
      for (const item of report.values()) {
          if ((pctype === "send" && item.type === "outbound-rtp" && !item.isRemote) ||
              (pctype === "recv" && item.type === "inbound-rtp" && !item.isRemote)) {
              const remoteItem = report.get(item.remoteId);
              const packets = pctype === "send" ? item.packetsSent : item.packetsReceived;
              const bytes = pctype === "send" ? item.bytesSent : item.bytesReceived;
              let packetLoss = 0;
              if (remoteItem) {
                  const remotePackets = pctype === "send" ? remoteItem.packetsReceived : remoteItem.packetsSent;
                  packetLoss = pctype === "send" ? remoteItem.packetsLost : remotePackets - packets;
              }
              statsReport.bytes = bytes;
              statsReport.packets = packets;
              statsReport.packetLoss = packetLoss;
          }
      }
      return statsReport;
  }

  function createPC() {
      const rtcOptions = {
          bundlePolicy: "max-bundle",
          rtcpMuxPolicy: "require",
          iceServers: [],
      };
      if (browserReport.unifiedPlan) {
          rtcOptions.sdpSemantics = "unified-plan";
      }
      else {
          rtcOptions.sdpSemantics = "plan-b";
      }
      const pc = new RTCPeerConnection(rtcOptions);
      return pc;
  }
  async function addTransceiver(track, pc) {
      const transceiver = pc.getTransceivers().find(t => t.direction === "inactive" && t.receiver.track.kind === track.kind);
      if (transceiver) {
          transceiver.direction = "sendonly";
          await transceiver.sender.replaceTrack(track);
          return transceiver;
      }
      else {
          return await pc.addTransceiver(track, { direction: "sendonly" });
      }
  }
  async function getPCStats(pc, track, pctype, lastReport) {
      if (browserReport.stats) {
          const stats = await getStats(pc, track, pctype);
          return getRateStats(stats, lastReport);
      }
      else {
          runOnce(() => {
              log.warning("your browser does not support getStats");
          }, "not-support-stats-warning");
          return defaultTrackStatsReport();
      }
  }
  function getRateStats(report, lastReport) {
      if (!lastReport) {
          return report;
      }
      const newReport = { ...report };
      const packetTrans = report.packets - lastReport.packets;
      const packetLoss = report.packetLoss - lastReport.packetLoss;
      if (packetLoss > 0) {
          newReport.packetLossRate = packetLoss / packetTrans;
          if (newReport.packetLossRate > 1) {
              newReport.packetLossRate = 1;
          }
      }
      const time = (report.timestamp - lastReport.timestamp) / 1000;
      if (time <= 0) {
          return report;
      }
      newReport.bitrate = 8 * (report.bytes - lastReport.bytes) / time;
      if (newReport.bitrate < 0) {
          return lastReport;
      }
      return newReport;
  }

  /*
   * device.ts
   * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
   *
   * Distributed under terms of the MIT license.
  */
  const REC_AUDIO_ENABLE = (config) => {
      return !!config && !!config.audio && config.audio.enabled;
  };
  const REC_VIDEO_ENABLE = (config) => {
      return !!config && !!config.video && config.video.enabled;
  };
  const REC_SCREEN_ENABLE = (config) => {
      return !!config && !!config.screen && config.screen.enabled;
  };

  /*
   * stream.ts
   * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
   *
   * Distributed under terms of the MIT license.
  */
  (function (TrackConnectStatus) {
      TrackConnectStatus[TrackConnectStatus["Idle"] = 0] = "Idle";
      TrackConnectStatus[TrackConnectStatus["Connecting"] = 1] = "Connecting";
      TrackConnectStatus[TrackConnectStatus["Connect"] = 2] = "Connect";
  })(exports.TrackConnectStatus || (exports.TrackConnectStatus = {}));

  /*
   * merger.ts
   * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
   *
   * Distributed under terms of the MIT license.
  */
  const defaultMergeJob = {
      publishUrl: "",
      height: 720,
      width: 1080,
      fps: 25,
      kbps: 1000,
      audioOnly: false,
      stretchMode: "aspectFill",
  };

  (function (AudioSourceState) {
      AudioSourceState["IDLE"] = "idle";
      AudioSourceState["LOADING"] = "loading";
      AudioSourceState["PLAY"] = "play";
      AudioSourceState["PAUSE"] = "pause";
      AudioSourceState["END"] = "end";
  })(exports.AudioSourceState || (exports.AudioSourceState = {}));

  /*
   * screen.ts
   * 屏幕共享
   * Copyright (C) 2018 disoul <disoul@DiSouldeMBP.lan>
   *
   * Distributed under terms of the MIT license.
  */
  window.addEventListener("message", e => {
      if (e.origin !== window.location.origin) {
          return;
      }
      onMessageCallback(e.data);
  });
  // and the function that handles received messages
  function onMessageCallback(data) {
      // "cancel" button is clicked
      if (data === "PermissionDeniedError") {
          chromeMediaSource = "PermissionDeniedError";
          if (screenCallback) {
              return screenCallback("PermissionDeniedError");
          }
          else {
              throw SCREEN_PERMISSION_DENIED();
          }
      }
      // extension notified his presence
      if (data === "qnrtc:rtcmulticonnection-extension-loaded") {
          chromeMediaSource = "desktop";
      }
      // old plugin version
      if (data === "rtcmulticonnection-extension-loaded") {
          log.warning("your chrome screen sharing plugin is not the latest version, or you have other screen sharing plugins.");
      }
      // extension shared temp sourceId
      if (data.sourceId && screenCallback) {
          screenCallback(sourceId = data.sourceId, data.canRequestAudioTrack === true);
      }
  }
  // global variables
  let chromeMediaSource = "screen";
  let sourceId;
  let screenCallback;
  async function isChromeExtensionAvailable() {
      const promise = () => new Promise((resolve, reject) => {
          if (chromeMediaSource === "desktop") {
              resolve(true);
              return;
          }
          // ask extension if it is available
          window.postMessage("qnrtc:are-you-there", "*");
          setTimeout(() => {
              if (chromeMediaSource === "screen") {
                  resolve(false);
              }
              else {
                  resolve(true);
              }
          }, 2000);
      });
      return await promise();
  }
  // this function can be used to get "source-id" from the extension
  function getSourceId(callback, screenOnly = false, windowOnly = false) {
      screenCallback = callback;
      if (screenOnly) {
          window.postMessage("qnrtc:get-sourceId-screen", "*");
          return;
      }
      if (windowOnly) {
          window.postMessage("qnrtc:get-sourceId-window", "*");
          return;
      }
      window.postMessage("qnrtc:get-sourceId", "*");
  }
  // this function can be used to get "source-id" from the extension
  function getSourceIdWithAudio(callback) {
      if (sourceId) {
          return callback(sourceId);
      }
      screenCallback = callback;
      window.postMessage("qnrtc:audio-plus-tab", "*");
  }
  // this function explains how to use above methods/objects
  async function getScreenConstraints(captureSourceIdWithAudio, screen) {
      const source = screen.source;
      const contraintPromise = () => new Promise((resolve, reject) => {
          const firefoxScreenConstraints = {
              mozMediaSource: source || "window",
              mediaSource: source || "window",
              height: screen.height,
              width: screen.width,
          };
          if (isFirefox) {
              resolve(firefoxScreenConstraints);
              return;
          }
          // this statement defines getUserMedia constraints
          // that will be used to capture content of screen
          const screen_constraints = {
              mandatory: {
                  chromeMediaSource: chromeMediaSource,
                  maxWidth: getNumberRangeMax(screen.width),
                  maxHeight: getNumberRangeMax(screen.height),
              },
              optional: [],
          };
          // this statement verifies chrome extension availability
          // if installed and available then it will invoke extension API
          // otherwise it will fallback to command-line based screen capturing API
          if (chromeMediaSource === "desktop") {
              if (captureSourceIdWithAudio) {
                  getSourceIdWithAudio(function (sourceId, canRequestAudioTrack) {
                      screen_constraints.mandatory.chromeMediaSourceId = sourceId;
                      if (canRequestAudioTrack) {
                          screen_constraints.canRequestAudioTrack = true;
                      }
                      if (sourceId === "PermissionDeniedError") {
                          reject(SCREEN_PERMISSION_DENIED());
                          return;
                      }
                      resolve(screen_constraints);
                      return;
                  });
              }
              else {
                  getSourceId(function (sourceId) {
                      screen_constraints.mandatory.chromeMediaSourceId = sourceId;
                      if (sourceId === "PermissionDeniedError") {
                          reject(SCREEN_PERMISSION_DENIED());
                          return;
                      }
                      resolve(screen_constraints);
                      return;
                  }, source === "screen", source === "window");
              }
              return;
          }
          resolve(screen_constraints);
      });
      return await contraintPromise();
  }

  class User {
      constructor(userId, userData) {
          /**
           * 指这个用户在本地的 Track 对象，一般用来播放
           */
          this.tracks = [];
          /**
           * 指这个用户在这个房间内已经发布的流信息，一般用来发起订阅
           */
          this.publishedTrackInfo = [];
          this.userId = userId;
          this.userData = userData;
      }
      /**
       * 只要有 track 就认为其已经发布
       */
      get published() {
          return this.publishedTrackInfo.length > 0;
      }
      /* @internal */
      addTracks(tracks) {
          this.tracks = this.tracks.concat(tracks);
          this.tracks = lodash_uniqby(this.tracks, "mediaTrack");
          for (const track of this.tracks) {
              track.once("release", () => {
                  lodash_remove(this.tracks, t => t === track);
              });
          }
      }
      /* @internal */
      removeTracksByTrackId(trackIds) {
          lodash_remove(this.tracks, track => {
              if (!track.info.trackId)
                  return false;
              return trackIds.indexOf(track.info.trackId) !== -1;
          });
      }
      /* @internal */
      addPublishedTrackInfo(info) {
          this.publishedTrackInfo = this.publishedTrackInfo.concat(info);
          this.publishedTrackInfo = lodash_uniqby(this.publishedTrackInfo, "trackId");
      }
      /* @internal */
      removePublishedTrackInfo(trackIds) {
          lodash_remove(this.publishedTrackInfo, info => trackIds.indexOf(info.trackId) !== -1);
      }
  }

  function createAudioElement(track) {
      const audio = document.createElement("audio");
      const stream = new MediaStream([track]);
      audio.style.visibility = "hidden";
      audio.className = `qnrtc-audio-player qnrtc-stream-player`;
      audio.dataset.localid = track.id;
      audio.srcObject = stream;
      return audio;
  }
  function createVideoElement(track) {
      const video = document.createElement("video");
      const stream = new MediaStream([track]);
      video.style.width = "100%";
      video.style.height = "100%";
      video.style.objectFit = "contain";
      video.muted = true;
      video.className = `qnrtc-video-player qnrtc-stream-player`;
      video.dataset.localid = track.id;
      video.setAttribute("playsinline", true);
      video.autoplay = true;
      video.srcObject = stream;
      if (isIOS) {
          video.setAttribute("controls", true);
          nextTick(() => {
              if (video && video.srcObject) {
                  video.removeAttribute("controls");
              }
          });
      }
      return video;
  }
  function webAudioUnlock(context) {
      return new Promise((resolve, reject) => {
          if (context.state === "suspended") {
              log.log("audio context state is suspended");
              const unlock = () => {
                  context.resume().then(() => {
                      document.body.removeEventListener("touchstart", unlock);
                      document.body.removeEventListener("touchend", unlock);
                      document.body.removeEventListener("mousedown", unlock);
                      document.body.removeEventListener("mouseup", unlock);
                      resolve(true);
                  }).catch(reject);
              };
              document.body.addEventListener("touchstart", unlock, true);
              document.body.addEventListener("touchend", unlock, true);
              document.body.addEventListener("mousedown", unlock, true);
              document.body.addEventListener("mouseup", unlock, true);
          }
          else {
              resolve(false);
          }
      });
  }

  function getFrameFromVideo(video) {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
          return "data:,";
      }
      ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      return canvas.toDataURL();
  }

  class EnhancedEventEmitter extends EventEmitter {
      safeEmit(event, ...args) {
          try {
              this.emit(event, ...args);
          }
          catch (error) {
              log.warning("safeEmit() | event listener threw an error [event:%s]:%o", event, error);
          }
      }
      safeEmitAsPromise(event, ...args) {
          return new Promise((resolve, reject) => {
              const callback = resolve;
              const errback = (error) => {
                  log.warning("safeEmitAsPromise() | errback called [event:%s]:%o", event, error);
                  reject(error);
              };
              this.safeEmit(event, ...args, callback, errback);
          });
      }
  }

  class Track extends EnhancedEventEmitter {
      constructor(track, userId, direction) {
          super();
          this.master = false;
          this.stats = defaultTrackStatsReport();
          /**
           * @internal
           */
          this.direction = "local";
          /* @internal */
          this.onended = (event) => {
              log.warning("track ended", this.mediaTrack, this.info.trackId);
              // 如果是订阅下来的流触发 ended，只触发内部事件
              if (this.direction === "local") {
                  this.emit("ended", event);
              }
              else {
                  this.emit("@ended", event);
              }
          };
          this.mediaTrack = track;
          this.mediaTrack.addEventListener("ended", this.onended);
          this.userId = userId;
          if (direction) {
              this.direction = direction;
          }
          this.info = {
              kind: track.kind,
              muted: !track.enabled,
              userId: this.userId,
              versionid: 0,
          };
      }
      play(container, muted) {
          this.removeMediaElement();
          const createEleFunc = this.info.kind === "video" ? createVideoElement : createAudioElement;
          this.mediaElement = createEleFunc(this.mediaTrack);
          if (this.info.kind === "audio" && muted) {
              this.mediaElement.muted = true;
          }
          container.appendChild(this.mediaElement);
          this.mediaElement.play()
              .catch(showPlayWarn);
      }
      /**
       * @internal
       */
      resume(track) {
          this.mediaTrack.removeEventListener("ended", this.onended);
          this.mediaTrack.stop();
          this.mediaTrack = track;
          this.mediaTrack.addEventListener("ended", this.onended);
          if (this.mediaElement) {
              const stream = new MediaStream([track]);
              this.mediaElement.dataset.localid = track.id;
              this.mediaElement.srcObject = stream;
          }
          this.removeEvent("@get-stats");
          this.resetStats();
      }
      getStats() {
          if (!this.statsInterval) {
              this.startGetStatsInterval();
          }
          return this.stats;
      }
      getCurrentFrameDataURL() {
          if (!this.mediaElement || !(this.mediaElement instanceof HTMLVideoElement)) {
              return "data:,";
          }
          return getFrameFromVideo(this.mediaElement);
      }
      /**
       * 设置 Track 为 Master SDK只允许发布一路 Audio Track 和一路 Video Track
       * @param master 是否为master
       */
      setMaster(master) {
          this.master = master;
      }
      /**
       * @internal
       */
      setMute(muted) {
          this.info.muted = muted;
          this.mediaTrack.enabled = !muted;
          this.emit("mute", muted);
      }
      /**
       * @internal
       */
      setKbps(v) {
          this.info.kbps = v;
      }
      /**
       * @internal
       */
      setInfo(info) {
          this.info = {
              ...this.info,
              ...info,
          };
      }
      /**
       * @internal
       */
      removeMediaElement() {
          if (this.mediaElement) {
              this.mediaElement.remove();
              this.mediaElement = undefined;
          }
      }
      release() {
          this.emit("release");
          this.removeEvent();
          if (this.statsInterval) {
              window.clearInterval(this.statsInterval);
          }
          this.mediaTrack.stop();
          this.removeMediaElement();
      }
      /**
       * @internal
       * 重置 trackId 和 userId，在 unpublish 的时候会自动调用
       */
      reset() {
          this.info.trackId = undefined;
          this.info.userId = undefined;
          this.info.versionid = 0;
          this.userId = undefined;
          this.resetStats();
      }
      /**
       * @internal
       * 重置 stats，每当 pc 重新构建的时候调用
       */
      resetStats() {
          this.stats = defaultTrackStatsReport();
          this.lastStats = undefined;
      }
      /**
       * @internal
       */
      async startGetStatsInterval() {
          const getStatsFunc = async () => {
              const handlers = this.getListeners("@get-stats");
              if (!handlers || handlers.length === 0)
                  return defaultTrackStatsReport();
              this.stats = await this.safeEmitAsPromise("@get-stats", this.lastStats);
              this.lastStats = { ...this.stats };
          };
          this.statsInterval = window.setInterval(getStatsFunc, 1000);
      }
      /**
       * @abstract
       */
      onAudioBuffer(cb, bufferSize) {
          log.warning("not implement");
      }
      /**
       * @abstract
       */
      setVolume(value) {
          log.warning("not implement");
      }
      /**
       * @abstract
       */
      getCurrentTimeDomainData() {
          log.warning("not implement");
          return new Uint8Array();
      }
      /**
       * @abstract
       */
      getCurrentFrequencyData() {
          log.warning("not implement");
          return new Uint8Array();
      }
      /**
       * @abstract
       */
      getVolume() {
          log.warning("not implement");
          return 0;
      }
      /**
       * @abstract
       */
      getCurrentVolumeLevel() {
          log.warning("not implement");
          return 0;
      }
      /**
       * @abstract
       */
      setLoop(loop) {
          log.warning("not implement");
      }
      /**
       * @abstract
       */
      startAudioSource() {
          log.warning("not implement");
      }
      /**
       * @abstract
       */
      pauseAudioSource() {
          log.warning("not implement");
      }
      /**
       * @abstract
       */
      resumeAudioSource() {
          log.warning("not implement");
      }
      /**
       * @abstract
       */
      stopAudioSource() {
          log.warning("not implement");
      }
      /**
       * @abstract
       */
      getCurrentTime() {
          log.warning("not implement");
          return 0;
      }
      /**
       * @abstract
       */
      setCurrentTime(val) {
          log.warning("not implement");
      }
      /**
       * @abstract
       */
      getDuration() {
          log.warning("not implement");
          return 0;
      }
  }

  /*
   * audio.ts
   * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
   *
   * Distributed under terms of the MIT license.
  */
  // unsupport fallback
  const AudioContext = window.AudioContext || window.webkitAudioContext || window.Object;
  const audioContext = browserReport.audioContextOptions ? new AudioContext({
      // 控制音频延迟，默认为 interactive，在 Chrome 下为 0.01s
      latencyHint: "interactive",
  }) : new AudioContext();
  window.audioContext = audioContext;
  if (window.Promise) {
      const unlockWebAudio = () => {
          webAudioUnlock(audioContext).then(unlocked => {
              log.debug("web audio context unlocked", unlocked);
          }).catch(e => {
              log.warning("can not unlock web audio context", e);
          });
          window.removeEventListener("load", unlockWebAudio);
      };
      if (!document.body) {
          window.addEventListener("load", unlockWebAudio);
      }
      else {
          unlockWebAudio();
      }
  }
  const FFT_SIZE = 2048;
  const BUFFER_SIZE = 4096;
  const MediaElementEventList = ["play", "playing", "pause", "ended", "waiting", "seeking"];
  class AudioManager extends EnhancedEventEmitter {
      constructor() {
          super();
          // 麦克风音频源 或者 PCM音频源
          this.audioSource = null;
          this._audioSourceState = exports.AudioSourceState.IDLE;
          this.bufferSourceDuration = {
              startTime: 0,
              pauseTime: 0,
              lastPauseTime: 0,
              offsetTime: 0,
              stopTime: 0,
          };
          this.handleMediaElementEvents = (e) => {
              switch (e.type) {
                  case "playing":
                  case "play": {
                      this.audioSourceState = exports.AudioSourceState.PLAY;
                      break;
                  }
                  case "pause": {
                      if (this.audioSourceState === exports.AudioSourceState.END)
                          break;
                      this.audioSourceState = exports.AudioSourceState.PAUSE;
                      break;
                  }
                  case "waiting":
                  case "seeking": {
                      this.audioSourceState = exports.AudioSourceState.LOADING;
                      break;
                  }
                  case "ended": {
                      this.audioSourceState = exports.AudioSourceState.END;
                      break;
                  }
              }
          };
      }
      get audioSourceState() {
          return this._audioSourceState;
      }
      set audioSourceState(newState) {
          if (newState === this._audioSourceState)
              return;
          this.emit("@audio-source-state-change", newState, this._audioSourceState);
          this._audioSourceState = newState;
      }
      onAudioBuffer(audioBufferCallback, bufferSize = BUFFER_SIZE) {
          this.audioBufferCallback = audioBufferCallback;
          this.audioBufferSize = bufferSize;
      }
      initAudioContext() {
          log.log("init audio context", audioContext.state);
          // in chrome, audioContext maybe in suspended state after initialization
          if (audioContext.state === "suspended") {
              log.log("audio context suspended");
              audioContext.resume()
                  .catch((e) => {
                  log.warning("resume audiocontext failed! see: http://s.qnsdk.com/s/Txsdz", e);
              });
          }
          log.log("init audio finish", audioContext.state);
          this.analyserNode = audioContext.createAnalyser();
          this.analyserNode.fftSize = FFT_SIZE;
          this.gainNode = audioContext.createGain();
          polyfillAudioNode(this.gainNode);
          if (browserReport.mediaStreamDest) {
              this.audioStream = audioContext.createMediaStreamDestination();
          }
          this.initScriptNode(BUFFER_SIZE);
      }
      setMediaStreamSource(originMediaStream) {
          this.audioSource = audioContext.createMediaStreamSource(originMediaStream);
          this.connect();
      }
      setAudioBufferSource() {
          this.audioSource = audioContext.createBufferSource();
          // 播放结束后清空节点
          this.audioSource.onended = () => this.stopAudioSource();
          this.connect();
      }
      setMediaElementSource(mediaElement) {
          this.audioSource = audioContext.createMediaElementSource(mediaElement);
          this.audioSourceElement = mediaElement;
          for (const eventItem of MediaElementEventList) {
              this.audioSourceElement.addEventListener(eventItem, this.handleMediaElementEvents);
          }
          this.connect();
      }
      setAudioSourceLoop(isLoop) {
          this.audioSourceLoop = isLoop;
          if (this.audioSource instanceof AudioBufferSourceNode) {
              this.audioSource.loop = !!isLoop;
          }
          else if (this.audioSourceElement) {
              this.audioSourceElement.loop = !!isLoop;
          }
      }
      setAudioBuffer(data) {
          if (!(this.audioSource instanceof AudioBufferSourceNode)) {
              return;
          }
          this.audioSource.buffer = data;
          this.audioSourceBuffer = data;
      }
      playAudioSource(offset = 0) {
          if (this.audioSource instanceof AudioBufferSourceNode) {
              this.resetBufferSourceDuration();
              try {
                  this.audioSource.start(0, offset);
                  this.bufferSourceDuration.startTime = audioContext.currentTime;
                  this.bufferSourceDuration.offsetTime = offset;
                  this.audioSourceState = exports.AudioSourceState.PLAY;
              }
              catch (e) {
                  // 说明已经 start
                  this.stopAudioSource();
                  this.playAudioSource(offset);
              }
          }
          else if (this.audioSourceElement) {
              this.audioSourceElement.currentTime = 0;
              this.audioSourceElement.play()
                  .catch(showPlayWarn);
          }
          else if (this.audioSource === null && this.audioSourceBuffer) {
              this.resetBufferSourceDuration();
              // 说明原来的 AudioBufferSourceNode 被删掉了，重新创建
              this.setAudioBufferSource();
              this.setAudioBuffer(this.audioSourceBuffer);
              this.setAudioSourceLoop(!!this.audioSourceLoop);
              // fix ts error
              this.audioSource.start(0, offset);
              this.bufferSourceDuration.startTime = audioContext.currentTime;
              this.bufferSourceDuration.offsetTime = offset;
              this.audioSourceState = exports.AudioSourceState.PLAY;
          }
      }
      resumeAudioSource() {
          if (this.audioSource instanceof AudioBufferSourceNode) {
              if (this.audioSourceState !== exports.AudioSourceState.PAUSE)
                  return;
              this.audioSource.playbackRate.value = 1;
              this.bufferSourceDuration.pauseTime += (audioContext.currentTime - this.bufferSourceDuration.lastPauseTime);
              this.bufferSourceDuration.lastPauseTime = 0;
              this.audioSourceState = exports.AudioSourceState.PLAY;
          }
          else if (this.audioSourceElement) {
              this.audioSourceElement.play()
                  .catch(showPlayWarn);
          }
      }
      pauseAudioSource() {
          if (this.audioSource instanceof AudioBufferSourceNode) {
              // hack to pause, but firefox does not support MIN_VALUE
              if (isFirefox) {
                  this.audioSource.playbackRate.value = 10e-8;
              }
              else {
                  this.audioSource.playbackRate.value = Number.MIN_VALUE;
              }
              if (!this.bufferSourceDuration.lastPauseTime) {
                  this.bufferSourceDuration.lastPauseTime = audioContext.currentTime;
              }
              this.audioSourceState = exports.AudioSourceState.PAUSE;
          }
          else if (this.audioSourceElement) {
              this.audioSourceElement.pause();
          }
      }
      stopAudioSource(useToSeek = false) {
          if (this.audioSource instanceof AudioBufferSourceNode) {
              /**
               * 一个 AudioBufferSourceNode 节点在其生命周期只允许开始一次
               * 所以这里停止了之后是无法再次开始的
               * 我们就直接删掉这个 Node，等待下次开始的时候重新创建
               */
              this.audioSource.onended = null;
              this.audioSource.stop();
              this.audioSource.disconnect();
              this.audioSource = null;
              this.bufferSourceDuration.stopTime = audioContext.currentTime;
              if (!useToSeek) {
                  this.audioSourceState = exports.AudioSourceState.END;
              }
          }
          else if (this.audioSourceElement) {
              this.audioSourceState = exports.AudioSourceState.END;
              this.audioSourceElement.pause();
              this.audioSourceElement.currentTime = 0;
          }
      }
      getAudioSourceCurrentTime() {
          if (this.audioSourceElement) {
              return this.audioSourceElement.currentTime;
          }
          else if (this.audioSource instanceof AudioBufferSourceNode) {
              let baseTime = audioContext.currentTime;
              const duration = this.getAudioSourceDuration();
              if (this.bufferSourceDuration.lastPauseTime) {
                  baseTime = this.bufferSourceDuration.lastPauseTime;
              }
              if (this.bufferSourceDuration.stopTime) {
                  baseTime = this.bufferSourceDuration.stopTime;
              }
              const currentTime = this.bufferSourceDuration.offsetTime + baseTime - this.bufferSourceDuration.startTime - this.bufferSourceDuration.pauseTime;
              return Math.max(0, currentTime % duration);
          }
          return 0;
      }
      setAudioSourceCurrentTime(val) {
          if (this.audioSourceElement) {
              this.audioSourceElement.currentTime = val;
          }
          else if (this.audioSource instanceof AudioBufferSourceNode) {
              /**
               * audioBufferSource 的 seek 分 2 步
               * stop audioBuffer
               * 在指定位置 start
               */
              this.stopAudioSource(true);
              this.playAudioSource(val);
          }
      }
      getAudioSourceDuration() {
          if (this.audioSourceElement)
              return this.audioSourceElement.duration;
          if (this.audioSourceBuffer)
              return this.audioSourceBuffer.duration;
          return 0;
      }
      release() {
          if (this.audioSource instanceof MediaStreamAudioSourceNode) {
              if (this.audioSource.mediaStream)
                  this.audioSource.mediaStream.getTracks().map(t => t.stop());
          }
          if (this.audioSource) {
              this.audioSource.disconnect();
          }
          this.gainNode.disconnect();
          if (this.audioSourceElement) {
              for (const eventItem of MediaElementEventList) {
                  this.audioSourceElement.removeEventListener(eventItem, this.handleMediaElementEvents);
              }
              this.audioSourceElement.src = "";
              this.audioSourceElement.load();
              this.audioSourceElement.remove();
              this.audioSourceElement = undefined;
          }
          if (this.scriptNode) {
              this.scriptNode.disconnect();
          }
      }
      connect() {
          if (!this.audioSource) {
              log.warning("no audio source, can not connect");
              return;
          }
          this.audioSource.connect(this.analyserNode);
          this.audioSource.connect(this.scriptNode);
          this.audioSource.connect(this.gainNode);
          if (this.audioStream) {
              this.gainNode.connect(this.audioStream);
          }
      }
      handleAudioBuffer(audioEvent) {
          const input = audioEvent.inputBuffer;
          if (this.audioBufferCallback) {
              this.audioBufferCallback(input);
          }
      }
      initScriptNode(bufferSize) {
          this.scriptNode = audioContext.createScriptProcessor(bufferSize);
          this.scriptNode.onaudioprocess = this.handleAudioBuffer.bind(this);
      }
      resetBufferSourceDuration() {
          this.bufferSourceDuration = { offsetTime: 0, startTime: 0, lastPauseTime: 0, pauseTime: 0, stopTime: 0 };
      }
  }
  /**
   * Safari 的 AudioNode.disconnect 不支持 disconnect 指定节点，只能操作全部节点
   * 这里的 polyfill 是通过 _inputNodes 保存全部已经 connect 的节点
   * 然后在 disconnect 后，将那些预期不应该被 disconnect 的节点重新 connect
   */
  function polyfillAudioNode(node) {
      if (browserReport.disconnectAudioNode)
          return;
      const nativeConnect = node.connect;
      const nativeDisconnect = node.disconnect;
      node.connect = (destination, outputIndex, inputIndex) => {
          if (!node._inputNodes) {
              node._inputNodes = [];
          }
          if (destination instanceof AudioNode) {
              node._inputNodes.push(destination);
              node._inputNodes = lodash_uniqby(node._inputNodes, s => s);
              nativeConnect.call(node, destination, outputIndex, inputIndex);
          }
          else {
              nativeConnect.call(node, destination, outputIndex);
          }
          return node;
      };
      node.disconnect = (destination, output, input) => {
          nativeDisconnect.call(node, destination, output, input);
          if (!destination) {
              node._inputNodes = [];
          }
          lodash_remove(node._inputNodes, (node) => {
              return node === destination;
          });
          for (const n of node._inputNodes) {
              node.connect(n);
          }
      };
  }

  function aWeight(f) {
      const f2 = f * f;
      return 1.2588966 * 148840000 * f2 * f2 /
          ((f2 + 424.36) * Math.sqrt((f2 + 11599.29) * (f2 + 544496.41)) * (f2 + 148840000));
  }
  const AUDIO_WEIGHT_LIMIT = 0;
  class AudioTrack extends Track {
      constructor(track, userId, direction) {
          if (track.kind !== "audio") {
              throw new Error("audio track only!");
          }
          super(track, userId, direction);
          this.mediaStream = new MediaStream();
          this.mediaStream.addTrack(track);
      }
      /**
       * @inernal
       */
      resume(track) {
          this.mediaTrack = track;
          this.removeEvent("@get-stats");
          this.resetStats();
          const stream = new MediaStream([track]);
          this.mediaStream = stream;
          if (this.mediaElement) {
              this.mediaElement.dataset.localid = track.id;
              this.mediaElement.srcObject = stream;
          }
          if (this.audioManager) {
              this.audioManager.release();
              this.initAudioManager();
          }
      }
      /**
       * @internal
       * @param replaceOriginStream 是否使用 WebAudio 替换原来的输入
       * safari 不支持 webaudio 替换输入
       */
      initAudioManager(replaceOriginStream) {
          this.audioManager = new AudioManager();
          this.audioManager.initAudioContext();
          this.audioManager.setMediaStreamSource(this.mediaStream);
          if (replaceOriginStream && browserReport.mediaStreamDest) {
              this.mediaStream = this.audioManager.audioStream.stream;
              this.mediaTrack = this.mediaStream.getTracks()[0];
          }
      }
      /**
       * 传入回调函数接受音频的 PCM 数据回调
       * @param cb 传入的回调函数，拥有一个参数 AudioBuffer 表示回调的音频数据
       * @param bufferSize 设定一次回调音频 Buffer 的长度，默认为 4096 位。
       * 注意 bufferSize 必须是 2 的 n 次幂且大于 256 小于 16394
       */
      onAudioBuffer(cb, bufferSize = BUFFER_SIZE) {
          this.audioManager.onAudioBuffer(cb, bufferSize);
      }
      /**
       * 设置音量，目前仅对采集到的 Track 有效（订阅 Track 无效）
       * @param value 增益值，0 静音，2，当前声音的 2 倍
       */
      setVolume(value) {
          this.audioManager.gainNode.gain.setValueAtTime(value, audioContext.currentTime);
      }
      /**
       * 获取当前 2048 位的时域数据
       */
      getCurrentTimeDomainData() {
          const data = new Uint8Array(FFT_SIZE);
          this.audioManager.analyserNode.getByteTimeDomainData(data);
          return data;
      }
      /**
       * 获取当前 2048 位的频域数据
       */
      getCurrentFrequencyData() {
          const data = new Uint8Array(this.audioManager.analyserNode.frequencyBinCount);
          this.audioManager.analyserNode.getByteFrequencyData(data);
          return data;
      }
      /**
       * 获取这个 Track 的音量设置，默认为 1，也就是原始音量
       */
      getVolume() {
          return this.audioManager.gainNode.gain.value;
      }
      /**
       * 获取当前实时的音量等级，一般用来展示可视化音量数据
       */
      getCurrentVolumeLevel() {
          const data = this.getCurrentFrequencyData();
          let sum = 0;
          let length = data.length;
          data.forEach((d, i) => {
              const frequency = i * (audioContext.sampleRate || 44100) / data.length;
              if (frequency > 22050) {
                  length -= 1;
                  return;
              }
              const weight = aWeight(frequency) * d / 255.0;
              if (weight <= AUDIO_WEIGHT_LIMIT) {
                  length -= 1;
                  return;
              }
              sum += weight * weight;
          });
          return Math.sqrt(sum / length);
      }
      release() {
          this.emit("release");
          this.removeEvent();
          if (this.statsInterval) {
              window.clearInterval(this.statsInterval);
          }
          this.mediaTrack.stop();
          this.removeMediaElement();
          if (this.audioManager) {
              this.audioManager.release();
          }
      }
  }

  /**
   * 如果音频来源不是麦克风，而是通过在线音频或者自定义 buffer，将会使用这个类
   */
  class AudioSourceTrack extends AudioTrack {
      constructor(source, userId) {
          if (!browserReport.mediaStreamDest) {
              throw NOT_SUPPORT_ERROR("your browser does not support audio buffer input!");
          }
          const audioManager = new AudioManager();
          audioManager.initAudioContext();
          if (source instanceof AudioBuffer) {
              audioManager.setAudioBufferSource();
              audioManager.setAudioBuffer(source);
          }
          else if (source instanceof HTMLAudioElement) {
              audioManager.setMediaElementSource(source);
          }
          const mediaStream = audioManager.audioStream.stream;
          const audioMediaTrack = mediaStream.getTracks()[0];
          super(audioMediaTrack, userId, "local");
          this.isLoop = false;
          this.originSource = source;
          this.audioManager = audioManager;
          this.handleAudioManagerEvents();
      }
      /**
       * 设置循环播放模式
       */
      setLoop(isLoop) {
          this.isLoop = isLoop;
          this.audioManager.setAudioSourceLoop(isLoop);
      }
      /**
       * 播放自定义的 Source
       */
      startAudioSource() {
          this.audioManager.playAudioSource();
      }
      /**
       * 暂停播放自定义的 Source
       */
      pauseAudioSource() {
          this.audioManager.pauseAudioSource();
      }
      /**
       * 恢复播放自定义的 Source
       */
      resumeAudioSource() {
          this.audioManager.resumeAudioSource();
      }
      /**
       * 停止播放 AudioBuffer 数据
       */
      stopAudioSource() {
          this.audioManager.stopAudioSource();
      }
      /**
       * 获取当前的播放时间
       */
      getCurrentTime() {
          return this.audioManager.getAudioSourceCurrentTime() || 0;
      }
      /**
       * 设置当前的时间
       */
      setCurrentTime(val) {
          this.audioManager.setAudioSourceCurrentTime(val);
      }
      /**
       * 获取播放总时长，对于在线音乐
       * 只有当 audio-state-change 第一次触发 PLAY 后才能获取到
       */
      getDuration() {
          return this.audioManager.getAudioSourceDuration() || 0;
      }
      handleAudioManagerEvents() {
          this.audioManager.on("@audio-source-state-change", (newState, lastState) => {
              this.emit("audio-state-change", newState, lastState);
          });
      }
  }

  /**
   * v1 版本的 Stream，只会拥有最多一个 videoTrack 以及一个 audioTrack
   */
  class Stream extends EventEmitter {
      constructor(tracks, direction = "send", userId) {
          super();
          /**
           * 表示这个流下所包含的所有 Track 的信息，用于精细控制每个 Track 的行为
           * 详细结构可以查阅 TrackInfo
           */
          this.trackList = [];
          /**
           * 用于标记这个流是否调用了 release 方法，即表示这个流已经被释放
           */
          this.isDestroyed = false;
          this.enableAudio = true;
          this.enableVideo = true;
          this.muteAudio = false;
          this.muteVideo = false;
          this.onAudioEnded = (event) => {
              this.emit("audio-ended", event);
          };
          this.onVideoEnded = (event) => {
              this.emit("video-ended", event);
          };
          this.onAudioSourceStateChange = (curr, last) => {
              this.emit("audio-source-state-change", curr, last);
          };
          this.direction = direction;
          this.userId = userId;
          tracks.forEach(track => {
              track.setMaster(true);
              track.on("mute", () => {
                  this.updateTrackState();
              });
              // 监听 track 的 release 事件，更新自己的状态
              track.on("release", () => {
                  lodash_remove(this.trackList, t => t === track);
                  this.updateTrackState();
                  // 如果自己所有的 track 都 release 了，自己也 release
                  if (this.trackList.length === 0) {
                      this.release();
                  }
              });
              this.trackList.push(track);
          });
          this.updateTrackState();
      }
      get audioSourceIsLoop() {
          if (!(this._audioTrack instanceof AudioSourceTrack)) {
              return false;
          }
          return this._audioTrack.isLoop;
      }
      /**
       * 目前只对采集的流有效
       */
      setVolume(v) {
          if (this._audioTrack) {
              this._audioTrack.setVolume(v);
          }
      }
      /**
       * 将一个 Stream 对象置于页面上指定的元素下播放
       * 会将将所有 track 都置于一个元素下播放
       *
       * 如果想单独控制每一个 track 的播放行为
       * 通过 trackList 获取 Track 对象，调用它的 play 方法
       * @param container 指定一个 HTML 元素用于放置媒体元素
       * @param muted 是否使用静音模式，如果为 true 就不会播放音频，仅播放视频，默认为 false。
       */
      play(container, muted) {
          this.trackList.forEach(track => track.play(container, muted));
          if (this._audioTrack) {
              this.audio = this._audioTrack.mediaElement;
          }
          if (this._videoTrack) {
              this.video = this._videoTrack.mediaElement;
          }
      }
      onAudioBuffer(cb, bufferSize) {
          if (this._audioTrack) {
              this._audioTrack.onAudioBuffer(cb, bufferSize);
          }
      }
      getCurrentTimeDomainData() {
          if (this._audioTrack) {
              return this._audioTrack.getCurrentTimeDomainData();
          }
          return new Uint8Array(0);
      }
      getCurrentFrequencyData() {
          if (this._audioTrack) {
              return this._audioTrack.getCurrentFrequencyData();
          }
          return new Uint8Array(0);
      }
      getCurrentVolumeLevel() {
          if (this._audioTrack) {
              return this._audioTrack.getCurrentVolumeLevel();
          }
          return 0;
      }
      getStats() {
          const audioReport = this._audioTrack ? this._audioTrack.getStats() : defaultTrackStatsReport();
          const videoReport = this._videoTrack ? this._videoTrack.getStats() : defaultTrackStatsReport();
          return {
              timestamp: Date.now(),
              videoBitrate: videoReport.bitrate,
              audioBitrate: audioReport.bitrate,
              videoPacketLoss: videoReport.packetLoss,
              audioPacketLoss: audioReport.packetLoss,
              videoPackets: videoReport.packets,
              audioPackets: audioReport.packets,
              videoPacketLossRate: videoReport.packetLossRate,
              audioPacketLossRate: audioReport.packetLossRate,
              videoBytes: videoReport.bytes,
              audioBytes: audioReport.bytes,
              pctype: this.direction,
          };
      }
      getCurrentFrameDataURL() {
          if (!this._videoTrack) {
              return "data:,";
          }
          return this._videoTrack.getCurrentFrameDataURL();
      }
      setAudioSourceLoop(isLoop) {
          if (!(this._audioTrack instanceof AudioSourceTrack)) {
              return;
          }
          this._audioTrack.setLoop(isLoop);
      }
      startAudioSource() {
          if (!(this._audioTrack instanceof AudioSourceTrack)) {
              return;
          }
          this._audioTrack.startAudioSource();
      }
      pauseAudioSource() {
          if (!(this._audioTrack instanceof AudioSourceTrack)) {
              return;
          }
          this._audioTrack.pauseAudioSource();
      }
      resumeAudioSource() {
          if (!(this._audioTrack instanceof AudioSourceTrack)) {
              return;
          }
          this._audioTrack.resumeAudioSource();
      }
      stopAudioSource() {
          if (!(this._audioTrack instanceof AudioSourceTrack)) {
              return;
          }
          this._audioTrack.stopAudioSource();
      }
      getAudioSourceCurrentTime() {
          if (!(this._audioTrack instanceof AudioSourceTrack)) {
              return 0;
          }
          return this._audioTrack.getCurrentTime();
      }
      getAudioSourceDuration() {
          if (!(this._audioTrack instanceof AudioSourceTrack)) {
              return 0;
          }
          return this._audioTrack.getDuration();
      }
      setAudioSourceCurrentTime(val) {
          if (!(this._audioTrack instanceof AudioSourceTrack)) {
              return;
          }
          return this._audioTrack.setCurrentTime(val);
      }
      /**
       * @internal
       */
      setKbps(video, audio) {
          if (video && this._videoTrack) {
              this._videoTrack.setKbps(video);
          }
          if (audio && this._audioTrack) {
              this._audioTrack.setKbps(audio);
          }
      }
      /* @internal */
      updateTrackState() {
          this.trackList.forEach(track => {
              if (track.info.kind === "audio") {
                  if (this._audioTrack) {
                      this._audioTrack.off("ended", this.onAudioEnded);
                      this._audioTrack.off("audio-state-change", this.onAudioSourceStateChange);
                  }
                  this.audioTrack = track.mediaTrack;
                  this._audioTrack = track;
                  this._audioTrack.on("ended", this.onAudioEnded);
                  if (this._audioTrack instanceof AudioSourceTrack) {
                      this._audioTrack.on("audio-state-change", this.onAudioSourceStateChange);
                  }
              }
              else {
                  if (this._videoTrack) {
                      this._videoTrack.off("ended", this.onVideoEnded);
                  }
                  this.videoTrack = track.mediaTrack;
                  this._videoTrack = track;
                  this._videoTrack.on("ended", this.onVideoEnded);
              }
          });
          if (this.audioTrack) {
              this.enableAudio = true;
              this.muteAudio = !this.audioTrack.enabled;
          }
          else {
              this.enableAudio = false;
          }
          if (this.videoTrack) {
              this.enableVideo = true;
              this.muteVideo = !this.videoTrack.enabled;
          }
          else {
              this.enableVideo = false;
          }
      }
      /**
       * 释放这个流下的所有资源，包括流和用于播放流的媒体元素
       */
      release() {
          if (this.isDestroyed) {
              return;
          }
          for (let i = 0; i < this.trackList.length; i += 1) {
              const track = this.trackList[i];
              track.removeAllListeners("release");
              track.release();
          }
          this.trackList = [];
          this.isDestroyed = true;
          this.emit("release");
          this.removeEvent();
      }
      /**
       * @internal
       * 释放流下一个 track，包括媒体元素
       * 如果 Track 被 Stream 包裹，不要直接调用 Track 的 release 方法
       * @param track 标记要释放的 track
       */
      releaseTrack(track) {
          const { removeElement, newArray } = removeElementFromArray(this.trackList, "mediaTrack", track.mediaTrack);
          if (!removeElement) {
              return;
          }
          track.release();
          this.trackList = newArray;
          if (this.trackList.length === 0) {
              this.isDestroyed = true;
          }
      }
  }

  /*
   * transfer.ts
   * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
   *
   * Distributed under terms of the MIT license.
  */
  function transferSignalingCustomMessageToCustomMessage(msg) {
      return {
          timestamp: msg.msgts,
          data: msg.text,
          userId: msg.playerid,
          type: msg.type,
      };
  }
  function transferSignalingTrackToTrackBaseInfo(track) {
      return {
          trackId: track.trackid,
          tag: track.tag,
          kind: track.kind,
          userId: track.playerid,
          muted: track.muted,
          versionid: track.versionid,
      };
  }
  function transferTrackBaseInfoToSignalingTrack(track, isMaster) {
      return {
          trackid: track.trackId,
          kind: track.kind,
          master: isMaster,
          muted: !!track.muted,
          playerid: track.userId,
          tag: track.tag || "",
          versionid: track.versionid,
      };
  }
  function transferTrackToPublishTrack(track) {
      return {
          localid: track.mediaTrack.id,
          master: track.master,
          kind: track.info.kind,
          kbps: track.info.kbps,
          tag: track.info.tag,
      };
  }
  function transferSignalingUserToUser(sigUser) {
      return new User(sigUser.playerid, sigUser.playerdata);
  }
  function createCustomTrack(mediaTrack, tag, kbps) {
      let track;
      if (mediaTrack.kind === "audio") {
          track = new AudioTrack(mediaTrack);
          track.initAudioManager(true);
      }
      else {
          track = new Track(mediaTrack);
      }
      if (kbps) {
          track.setKbps(kbps);
      }
      track.setInfo({ tag });
      return track;
  }
  async function transferRecordOptionToMediaConstraints(options) {
      if (!options) {
          return {
              audio: true,
              video: true,
          };
      }
      if (REC_SCREEN_ENABLE(options)) {
          if (REC_VIDEO_ENABLE(options)) {
              throw UNEXPECTED_ERROR("can not get mediaStream with video and screen are all enabled");
          }
          if (!browserReport.screenSharing) {
              throw NOT_SUPPORT_ERROR("your browser can not share screen");
          }
          const screenOptions = options.screen;
          // 只有在 chrome 下，用户强制指定用插件或者用户不支持 plugin free 采集才会检查插件
          if (isChrome && (screenOptions.forceChromePlugin || !browserReport.getDisplayMedia)) {
              const plugin = await isChromeExtensionAvailable();
              if (!plugin) {
                  throw PLUGIN_NOT_AVALIABLE("");
              }
          }
      }
      const audio = !options.audio || !options.audio.enabled || !!options.audio.source ? false : {
          deviceId: options.audio.deviceId,
          sampleRate: options.audio.sampleRate,
          sampleSize: options.audio.sampleSize,
          channelCount: options.audio.channelCount,
          autoGainControl: options.audio.autoGainControl,
          echoCancellation: options.audio.echoCancellation,
          noiseSuppression: options.audio.noiseSuppression,
      };
      const video = !options.video || !options.video.enabled ? false : {
          frameRate: options.video.frameRate,
          height: options.video.height,
          width: options.video.width,
          deviceId: options.video.deviceId,
      };
      if (REC_SCREEN_ENABLE(options) && options.screen) {
          if (browserReport.getDisplayMedia && !options.screen.forceChromePlugin) {
              return createConstraints({
                  audio,
                  video: {
                      displaySurface: getDisplaySurfaceFromSourceOption(options.screen.source),
                      width: options.screen.width,
                      height: options.screen.height,
                      frameRate: options.screen.frameRate,
                  },
              });
          }
          const constraints = await getScreenConstraints(false, options.screen);
          return createConstraints({
              audio,
              video: constraints,
          });
      }
      return createConstraints({
          audio, video,
      });
  }
  function getDisplaySurfaceFromSourceOption(opt) {
      switch (opt) {
          case "window":
              return "application";
          case "screen":
              return ["window", "monitor"];
          default:
              return undefined;
      }
  }
  const createConstraints = (constraints) => deleteConstraintsEmptyObject(processConstraints(removeUndefinedKey(constraints)));
  function processConstraints(constraints) {
      if (browserReport.minMaxWithIdeal) {
          return constraints;
      }
      const keys = ["video", "screen"];
      keys.forEach(key => {
          if (typeof constraints[key] === "object" && typeof constraints[key].width === "object" && constraints[key].width.ideal) {
              delete constraints[key].width.ideal;
          }
          if (typeof constraints[key] === "object" && typeof constraints[key].height === "object" && constraints[key].height.ideal) {
              delete constraints[key].height.ideal;
          }
      });
      return constraints;
  }
  // fix old chrome
  function deleteConstraintsEmptyObject(constraints) {
      if (Object.keys(constraints.audio).length === 0 && typeof (constraints.audio) !== "boolean") {
          constraints.audio = true;
      }
      if (Object.keys(constraints.video).length === 0 && typeof (constraints.video) !== "boolean") {
          constraints.video = true;
      }
      return constraints;
  }
  function getNumberRangeMax(range) {
      if (!range) {
          return undefined;
      }
      if (typeof range === "number") {
          return range;
      }
      if (range.exact) {
          return range.exact;
      }
      if (range.max) {
          return range.max;
      }
      if (range.ideal) {
          return range.ideal;
      }
      if (range.min) {
          return range.min;
      }
      return undefined;
  }

  var grammar_1 = createCommonjsModule(function (module) {
    var grammar = module.exports = {
      v: [{
        name: 'version',
        reg: /^(\d*)$/
      }],
      o: [{
        //o=- 20518 0 IN IP4 203.0.113.1
        // NB: sessionId will be a String in most cases because it is huge
        name: 'origin',
        reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
        names: ['username', 'sessionId', 'sessionVersion', 'netType', 'ipVer', 'address'],
        format: '%s %s %d %s IP%d %s'
      }],
      // default parsing of these only (though some of these feel outdated)
      s: [{
        name: 'name'
      }],
      i: [{
        name: 'description'
      }],
      u: [{
        name: 'uri'
      }],
      e: [{
        name: 'email'
      }],
      p: [{
        name: 'phone'
      }],
      z: [{
        name: 'timezones'
      }],
      // TODO: this one can actually be parsed properly..
      r: [{
        name: 'repeats'
      }],
      // TODO: this one can also be parsed properly
      //k: [{}], // outdated thing ignored
      t: [{
        //t=0 0
        name: 'timing',
        reg: /^(\d*) (\d*)/,
        names: ['start', 'stop'],
        format: '%d %d'
      }],
      c: [{
        //c=IN IP4 10.47.197.26
        name: 'connection',
        reg: /^IN IP(\d) (\S*)/,
        names: ['version', 'ip'],
        format: 'IN IP%d %s'
      }],
      b: [{
        //b=AS:4000
        push: 'bandwidth',
        reg: /^(TIAS|AS|CT|RR|RS):(\d*)/,
        names: ['type', 'limit'],
        format: '%s:%s'
      }],
      m: [{
        //m=video 51744 RTP/AVP 126 97 98 34 31
        // NB: special - pushes to session
        // TODO: rtp/fmtp should be filtered by the payloads found here?
        reg: /^(\w*) (\d*) ([\w\/]*)(?: (.*))?/,
        names: ['type', 'port', 'protocol', 'payloads'],
        format: '%s %d %s %s'
      }],
      a: [{
        //a=rtpmap:110 opus/48000/2
        push: 'rtp',
        reg: /^rtpmap:(\d*) ([\w\-\.]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,
        names: ['payload', 'codec', 'rate', 'encoding'],
        format: function (o) {
          return o.encoding ? 'rtpmap:%d %s/%s/%s' : o.rate ? 'rtpmap:%d %s/%s' : 'rtpmap:%d %s';
        }
      }, {
        //a=fmtp:108 profile-level-id=24;object=23;bitrate=64000
        //a=fmtp:111 minptime=10; useinbandfec=1
        push: 'fmtp',
        reg: /^fmtp:(\d*) ([\S| ]*)/,
        names: ['payload', 'config'],
        format: 'fmtp:%d %s'
      }, {
        //a=control:streamid=0
        name: 'control',
        reg: /^control:(.*)/,
        format: 'control:%s'
      }, {
        //a=rtcp:65179 IN IP4 193.84.77.194
        name: 'rtcp',
        reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
        names: ['port', 'netType', 'ipVer', 'address'],
        format: function (o) {
          return o.address != null ? 'rtcp:%d %s IP%d %s' : 'rtcp:%d';
        }
      }, {
        //a=rtcp-fb:98 trr-int 100
        push: 'rtcpFbTrrInt',
        reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
        names: ['payload', 'value'],
        format: 'rtcp-fb:%d trr-int %d'
      }, {
        //a=rtcp-fb:98 nack rpsi
        push: 'rtcpFb',
        reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
        names: ['payload', 'type', 'subtype'],
        format: function (o) {
          return o.subtype != null ? 'rtcp-fb:%s %s %s' : 'rtcp-fb:%s %s';
        }
      }, {
        //a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
        //a=extmap:1/recvonly URI-gps-string
        push: 'ext',
        reg: /^extmap:(\d+)(?:\/(\w+))? (\S*)(?: (\S*))?/,
        names: ['value', 'direction', 'uri', 'config'],
        format: function (o) {
          return 'extmap:%d' + (o.direction ? '/%s' : '%v') + ' %s' + (o.config ? ' %s' : '');
        }
      }, {
        //a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:PS1uQCVeeCFCanVmcjkpPywjNWhcYD0mXXtxaVBR|2^20|1:32
        push: 'crypto',
        reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
        names: ['id', 'suite', 'config', 'sessionConfig'],
        format: function (o) {
          return o.sessionConfig != null ? 'crypto:%d %s %s %s' : 'crypto:%d %s %s';
        }
      }, {
        //a=setup:actpass
        name: 'setup',
        reg: /^setup:(\w*)/,
        format: 'setup:%s'
      }, {
        //a=mid:1
        name: 'mid',
        reg: /^mid:([^\s]*)/,
        format: 'mid:%s'
      }, {
        //a=msid:0c8b064d-d807-43b4-b434-f92a889d8587 98178685-d409-46e0-8e16-7ef0db0db64a
        name: 'msid',
        reg: /^msid:(.*)/,
        format: 'msid:%s'
      }, {
        //a=ptime:20
        name: 'ptime',
        reg: /^ptime:(\d*)/,
        format: 'ptime:%d'
      }, {
        //a=maxptime:60
        name: 'maxptime',
        reg: /^maxptime:(\d*)/,
        format: 'maxptime:%d'
      }, {
        //a=sendrecv
        name: 'direction',
        reg: /^(sendrecv|recvonly|sendonly|inactive)/
      }, {
        //a=ice-lite
        name: 'icelite',
        reg: /^(ice-lite)/
      }, {
        //a=ice-ufrag:F7gI
        name: 'iceUfrag',
        reg: /^ice-ufrag:(\S*)/,
        format: 'ice-ufrag:%s'
      }, {
        //a=ice-pwd:x9cml/YzichV2+XlhiMu8g
        name: 'icePwd',
        reg: /^ice-pwd:(\S*)/,
        format: 'ice-pwd:%s'
      }, {
        //a=fingerprint:SHA-1 00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33
        name: 'fingerprint',
        reg: /^fingerprint:(\S*) (\S*)/,
        names: ['type', 'hash'],
        format: 'fingerprint:%s %s'
      }, {
        //a=candidate:0 1 UDP 2113667327 203.0.113.1 54400 typ host
        //a=candidate:1162875081 1 udp 2113937151 192.168.34.75 60017 typ host generation 0 network-id 3 network-cost 10
        //a=candidate:3289912957 2 udp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 generation 0 network-id 3 network-cost 10
        //a=candidate:229815620 1 tcp 1518280447 192.168.150.19 60017 typ host tcptype active generation 0 network-id 3 network-cost 10
        //a=candidate:3289912957 2 tcp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 tcptype passive generation 0 network-id 3 network-cost 10
        push: 'candidates',
        reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?(?: network-id (\d*))?(?: network-cost (\d*))?/,
        names: ['foundation', 'component', 'transport', 'priority', 'ip', 'port', 'type', 'raddr', 'rport', 'tcptype', 'generation', 'network-id', 'network-cost'],
        format: function (o) {
          var str = 'candidate:%s %d %s %d %s %d typ %s';
          str += o.raddr != null ? ' raddr %s rport %d' : '%v%v'; // NB: candidate has three optional chunks, so %void middles one if it's missing

          str += o.tcptype != null ? ' tcptype %s' : '%v';

          if (o.generation != null) {
            str += ' generation %d';
          }

          str += o['network-id'] != null ? ' network-id %d' : '%v';
          str += o['network-cost'] != null ? ' network-cost %d' : '%v';
          return str;
        }
      }, {
        //a=end-of-candidates (keep after the candidates line for readability)
        name: 'endOfCandidates',
        reg: /^(end-of-candidates)/
      }, {
        //a=remote-candidates:1 203.0.113.1 54400 2 203.0.113.1 54401 ...
        name: 'remoteCandidates',
        reg: /^remote-candidates:(.*)/,
        format: 'remote-candidates:%s'
      }, {
        //a=ice-options:google-ice
        name: 'iceOptions',
        reg: /^ice-options:(\S*)/,
        format: 'ice-options:%s'
      }, {
        //a=ssrc:2566107569 cname:t9YU8M1UxTF8Y1A1
        push: 'ssrcs',
        reg: /^ssrc:(\d*) ([\w_-]*)(?::(.*))?/,
        names: ['id', 'attribute', 'value'],
        format: function (o) {
          var str = 'ssrc:%d';

          if (o.attribute != null) {
            str += ' %s';

            if (o.value != null) {
              str += ':%s';
            }
          }

          return str;
        }
      }, {
        //a=ssrc-group:FEC 1 2
        //a=ssrc-group:FEC-FR 3004364195 1080772241
        push: 'ssrcGroups',
        // token-char = %x21 / %x23-27 / %x2A-2B / %x2D-2E / %x30-39 / %x41-5A / %x5E-7E
        reg: /^ssrc-group:([\x21\x23\x24\x25\x26\x27\x2A\x2B\x2D\x2E\w]*) (.*)/,
        names: ['semantics', 'ssrcs'],
        format: 'ssrc-group:%s %s'
      }, {
        //a=msid-semantic: WMS Jvlam5X3SX1OP6pn20zWogvaKJz5Hjf9OnlV
        name: 'msidSemantic',
        reg: /^msid-semantic:\s?(\w*) (\S*)/,
        names: ['semantic', 'token'],
        format: 'msid-semantic: %s %s' // space after ':' is not accidental

      }, {
        //a=group:BUNDLE audio video
        push: 'groups',
        reg: /^group:(\w*) (.*)/,
        names: ['type', 'mids'],
        format: 'group:%s %s'
      }, {
        //a=rtcp-mux
        name: 'rtcpMux',
        reg: /^(rtcp-mux)/
      }, {
        //a=rtcp-rsize
        name: 'rtcpRsize',
        reg: /^(rtcp-rsize)/
      }, {
        //a=sctpmap:5000 webrtc-datachannel 1024
        name: 'sctpmap',
        reg: /^sctpmap:([\w_\/]*) (\S*)(?: (\S*))?/,
        names: ['sctpmapNumber', 'app', 'maxMessageSize'],
        format: function (o) {
          return o.maxMessageSize != null ? 'sctpmap:%s %s %s' : 'sctpmap:%s %s';
        }
      }, {
        //a=x-google-flag:conference
        name: 'xGoogleFlag',
        reg: /^x-google-flag:([^\s]*)/,
        format: 'x-google-flag:%s'
      }, {
        //a=rid:1 send max-width=1280;max-height=720;max-fps=30;depend=0
        push: 'rids',
        reg: /^rid:([\d\w]+) (\w+)(?: ([\S| ]*))?/,
        names: ['id', 'direction', 'params'],
        format: function (o) {
          return o.params ? 'rid:%s %s %s' : 'rid:%s %s';
        }
      }, {
        //a=imageattr:97 send [x=800,y=640,sar=1.1,q=0.6] [x=480,y=320] recv [x=330,y=250]
        //a=imageattr:* send [x=800,y=640] recv *
        //a=imageattr:100 recv [x=320,y=240]
        push: 'imageattrs',
        reg: new RegExp( //a=imageattr:97
        '^imageattr:(\\d+|\\*)' + //send [x=800,y=640,sar=1.1,q=0.6] [x=480,y=320]
        '[\\s\\t]+(send|recv)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*)' + //recv [x=330,y=250]
        '(?:[\\s\\t]+(recv|send)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*))?'),
        names: ['pt', 'dir1', 'attrs1', 'dir2', 'attrs2'],
        format: function (o) {
          return 'imageattr:%s %s %s' + (o.dir2 ? ' %s %s' : '');
        }
      }, {
        //a=simulcast:send 1,2,3;~4,~5 recv 6;~7,~8
        //a=simulcast:recv 1;4,5 send 6;7
        name: 'simulcast',
        reg: new RegExp( //a=simulcast:
        '^simulcast:' + //send 1,2,3;~4,~5
        '(send|recv) ([a-zA-Z0-9\\-_~;,]+)' + //space + recv 6;~7,~8
        '(?:\\s?(send|recv) ([a-zA-Z0-9\\-_~;,]+))?' + //end
        '$'),
        names: ['dir1', 'list1', 'dir2', 'list2'],
        format: function (o) {
          return 'simulcast:%s %s' + (o.dir2 ? ' %s %s' : '');
        }
      }, {
        //Old simulcast draft 03 (implemented by Firefox)
        //  https://tools.ietf.org/html/draft-ietf-mmusic-sdp-simulcast-03
        //a=simulcast: recv pt=97;98 send pt=97
        //a=simulcast: send rid=5;6;7 paused=6,7
        name: 'simulcast_03',
        reg: /^simulcast:[\s\t]+([\S+\s\t]+)$/,
        names: ['value'],
        format: 'simulcast: %s'
      }, {
        //a=framerate:25
        //a=framerate:29.97
        name: 'framerate',
        reg: /^framerate:(\d+(?:$|\.\d+))/,
        format: 'framerate:%s'
      }, {
        // RFC4570
        //a=source-filter: incl IN IP4 239.5.2.31 10.1.15.5
        name: 'sourceFilter',
        reg: /^source-filter: *(excl|incl) (\S*) (IP4|IP6|\*) (\S*) (.*)/,
        names: ['filterMode', 'netType', 'addressTypes', 'destAddress', 'srcList'],
        format: 'source-filter: %s %s %s %s %s'
      }, {
        //a=bundle-only
        name: 'bundleOnly',
        reg: /^(bundle-only)/
      }, {
        //a=label:1
        name: 'label',
        reg: /^label:(.+)/,
        format: 'label:%s'
      }, {
        // RFC version 26 for SCTP over DTLS
        // https://tools.ietf.org/html/draft-ietf-mmusic-sctp-sdp-26#section-5
        name: 'sctpPort',
        reg: /^sctp-port:(\d+)$/,
        format: 'sctp-port:%s'
      }, {
        // RFC version 26 for SCTP over DTLS
        // https://tools.ietf.org/html/draft-ietf-mmusic-sctp-sdp-26#section-6
        name: 'maxMessageSize',
        reg: /^max-message-size:(\d+)$/,
        format: 'max-message-size:%s'
      }, {
        // any a= that we don't understand is kepts verbatim on media.invalid
        push: 'invalid',
        names: ['value']
      }]
    }; // set sensible defaults to avoid polluting the grammar with boring details

    Object.keys(grammar).forEach(function (key) {
      var objs = grammar[key];
      objs.forEach(function (obj) {
        if (!obj.reg) {
          obj.reg = /(.*)/;
        }

        if (!obj.format) {
          obj.format = '%s';
        }
      });
    });
  });
  var grammar_2 = grammar_1.v;
  var grammar_3 = grammar_1.o;
  var grammar_4 = grammar_1.s;
  var grammar_5 = grammar_1.i;
  var grammar_6 = grammar_1.u;
  var grammar_7 = grammar_1.e;
  var grammar_8 = grammar_1.p;
  var grammar_9 = grammar_1.z;
  var grammar_10 = grammar_1.r;
  var grammar_11 = grammar_1.t;
  var grammar_12 = grammar_1.c;
  var grammar_13 = grammar_1.b;
  var grammar_14 = grammar_1.m;
  var grammar_15 = grammar_1.a;

  var parser = createCommonjsModule(function (module, exports) {
    var toIntIfInt = function (v) {
      return String(Number(v)) === v ? Number(v) : v;
    };

    var attachProperties = function (match, location, names, rawName) {
      if (rawName && !names) {
        location[rawName] = toIntIfInt(match[1]);
      } else {
        for (var i = 0; i < names.length; i += 1) {
          if (match[i + 1] != null) {
            location[names[i]] = toIntIfInt(match[i + 1]);
          }
        }
      }
    };

    var parseReg = function (obj, location, content) {
      var needsBlank = obj.name && obj.names;

      if (obj.push && !location[obj.push]) {
        location[obj.push] = [];
      } else if (needsBlank && !location[obj.name]) {
        location[obj.name] = {};
      }

      var keyLocation = obj.push ? {} : // blank object that will be pushed
      needsBlank ? location[obj.name] : location; // otherwise, named location or root

      attachProperties(content.match(obj.reg), keyLocation, obj.names, obj.name);

      if (obj.push) {
        location[obj.push].push(keyLocation);
      }
    };

    var validLine = RegExp.prototype.test.bind(/^([a-z])=(.*)/);

    exports.parse = function (sdp) {
      var session = {},
          media = [],
          location = session; // points at where properties go under (one of the above)
      // parse lines we understand

      sdp.split(/(\r\n|\r|\n)/).filter(validLine).forEach(function (l) {
        var type = l[0];
        var content = l.slice(2);

        if (type === 'm') {
          media.push({
            rtp: [],
            fmtp: []
          });
          location = media[media.length - 1]; // point at latest media line
        }

        for (var j = 0; j < (grammar_1[type] || []).length; j += 1) {
          var obj = grammar_1[type][j];

          if (obj.reg.test(content)) {
            return parseReg(obj, location, content);
          }
        }
      });
      session.media = media; // link it up

      return session;
    };

    var paramReducer = function (acc, expr) {
      var s = expr.split(/=(.+)/, 2);

      if (s.length === 2) {
        acc[s[0]] = toIntIfInt(s[1]);
      } else if (s.length === 1 && expr.length > 1) {
        acc[s[0]] = undefined;
      }

      return acc;
    };

    exports.parseParams = function (str) {
      return str.split(/\;\s?/).reduce(paramReducer, {});
    }; // For backward compatibility - alias will be removed in 3.0.0


    exports.parseFmtpConfig = exports.parseParams;

    exports.parsePayloads = function (str) {
      return str.split(' ').map(Number);
    };

    exports.parseRemoteCandidates = function (str) {
      var candidates = [];
      var parts = str.split(' ').map(toIntIfInt);

      for (var i = 0; i < parts.length; i += 3) {
        candidates.push({
          component: parts[i],
          ip: parts[i + 1],
          port: parts[i + 2]
        });
      }

      return candidates;
    };

    exports.parseImageAttributes = function (str) {
      return str.split(' ').map(function (item) {
        return item.substring(1, item.length - 1).split(',').reduce(paramReducer, {});
      });
    };

    exports.parseSimulcastStreamList = function (str) {
      return str.split(';').map(function (stream) {
        return stream.split(',').map(function (format) {
          var scid,
              paused = false;

          if (format[0] !== '~') {
            scid = toIntIfInt(format);
          } else {
            scid = toIntIfInt(format.substring(1, format.length));
            paused = true;
          }

          return {
            scid: scid,
            paused: paused
          };
        });
      });
    };
  });
  var parser_1 = parser.parse;
  var parser_2 = parser.parseParams;
  var parser_3 = parser.parseFmtpConfig;
  var parser_4 = parser.parsePayloads;
  var parser_5 = parser.parseRemoteCandidates;
  var parser_6 = parser.parseImageAttributes;
  var parser_7 = parser.parseSimulcastStreamList;

  var formatRegExp = /%[sdv%]/g;

  var format = function (formatStr) {
    var i = 1;
    var args = arguments;
    var len = args.length;
    return formatStr.replace(formatRegExp, function (x) {
      if (i >= len) {
        return x; // missing argument
      }

      var arg = args[i];
      i += 1;

      switch (x) {
        case '%%':
          return '%';

        case '%s':
          return String(arg);

        case '%d':
          return Number(arg);

        case '%v':
          return '';
      }
    }); // NB: we discard excess arguments - they are typically undefined from makeLine
  };

  var makeLine = function (type, obj, location) {
    var str = obj.format instanceof Function ? obj.format(obj.push ? location : location[obj.name]) : obj.format;
    var args = [type + '=' + str];

    if (obj.names) {
      for (var i = 0; i < obj.names.length; i += 1) {
        var n = obj.names[i];

        if (obj.name) {
          args.push(location[obj.name][n]);
        } else {
          // for mLine and push attributes
          args.push(location[obj.names[i]]);
        }
      }
    } else {
      args.push(location[obj.name]);
    }

    return format.apply(null, args);
  }; // RFC specified order
  // TODO: extend this with all the rest


  var defaultOuterOrder = ['v', 'o', 's', 'i', 'u', 'e', 'p', 'c', 'b', 't', 'r', 'z', 'a'];
  var defaultInnerOrder = ['i', 'c', 'b', 'a'];

  var writer = function (session, opts) {
    opts = opts || {}; // ensure certain properties exist

    if (session.version == null) {
      session.version = 0; // 'v=0' must be there (only defined version atm)
    }

    if (session.name == null) {
      session.name = ' '; // 's= ' must be there if no meaningful name set
    }

    session.media.forEach(function (mLine) {
      if (mLine.payloads == null) {
        mLine.payloads = '';
      }
    });
    var outerOrder = opts.outerOrder || defaultOuterOrder;
    var innerOrder = opts.innerOrder || defaultInnerOrder;
    var sdp = []; // loop through outerOrder for matching properties on session

    outerOrder.forEach(function (type) {
      grammar_1[type].forEach(function (obj) {
        if (obj.name in session && session[obj.name] != null) {
          sdp.push(makeLine(type, obj, session));
        } else if (obj.push in session && session[obj.push] != null) {
          session[obj.push].forEach(function (el) {
            sdp.push(makeLine(type, obj, el));
          });
        }
      });
    }); // then for each media line, follow the innerOrder

    session.media.forEach(function (mLine) {
      sdp.push(makeLine('m', grammar_1.m[0], mLine));
      innerOrder.forEach(function (type) {
        grammar_1[type].forEach(function (obj) {
          if (obj.name in mLine && mLine[obj.name] != null) {
            sdp.push(makeLine(type, obj, mLine));
          } else if (obj.push in mLine && mLine[obj.push] != null) {
            mLine[obj.push].forEach(function (el) {
              sdp.push(makeLine(type, obj, el));
            });
          }
        });
      });
    });
    return sdp.join('\r\n') + '\r\n';
  };

  var write = writer;
  var parse = parser.parse;
  var parseFmtpConfig = parser.parseFmtpConfig;
  var parseParams = parser.parseParams;
  var parsePayloads = parser.parsePayloads;
  var parseRemoteCandidates = parser.parseRemoteCandidates;
  var parseImageAttributes = parser.parseImageAttributes;
  var parseSimulcastStreamList = parser.parseSimulcastStreamList;
  var lib = {
    write: write,
    parse: parse,
    parseFmtpConfig: parseFmtpConfig,
    parseParams: parseParams,
    parsePayloads: parsePayloads,
    parseRemoteCandidates: parseRemoteCandidates,
    parseImageAttributes: parseImageAttributes,
    parseSimulcastStreamList: parseSimulcastStreamList
  };

  /*
   * sdp.ts
   * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
   *
   * Distributed under terms of the MIT license.
  */
  const NEW_LINE = `
`;

  /*
   * index.ts
   * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
   *
   * Distributed under terms of the MIT license.
  */

  /*
   * sdp.ts
   * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
   *
   * Distributed under terms of the MIT license.
  */
  const REMOTE_SERVER_NAME = "qiniu-rtc-client";
  /**
   * unified-plan 发布重协商时，chrome 生成的 offer 里 msid 参数没有和实际的 trackId 对应
   * 这里重新做 msid 的对应
   */
  function addPlanBTracksToUnifiedPlan(offer, tracks, mids) {
      const sdpObj = lib.parse(offer);
      for (let i = 0; i < tracks.length; i += 1) {
          const track = tracks[i];
          const mid = mids[i];
          const mSection = sdpObj.media.find(m => m.mid.toString() === mid);
          if (!mSection)
              continue;
          const FIDline = (mSection.ssrcGroups || []).find(line => line.semantics === "FID");
          const _msid = mSection.msid ? mSection.msid.split(" ")[0] : undefined;
          const ssrcMsidLine = (mSection.ssrcs || []).find(line => line.attribute === "msid");
          const cname = (mSection.ssrcs || []).find(line => line.attribute === "cname");
          const ssrcLabelLine = (mSection.ssrcs || []).find(line => line.attribute === "label");
          mSection.ssrcs = [];
          mSection.ssrcGroups = [];
          if (_msid) {
              mSection.msid = `${_msid} ${track.id}`;
          }
          if (ssrcMsidLine) {
              const ssrc = ssrcMsidLine.id;
              const msid = ssrcMsidLine.value.split(" ")[0];
              // 重新绑定 msid
              mSection.ssrcs.push({ id: ssrc, attribute: "msid", value: `${msid} ${track.id}` });
          }
          if (cname) {
              mSection.ssrcs.push({ id: cname.id, attribute: "cname", value: cname.value });
          }
          if (ssrcLabelLine) {
              // 重新绑定 label
              mSection.ssrcs.push({ id: ssrcLabelLine.id, attribute: "label", value: track.id });
          }
          if (FIDline) {
              const rtxSSrc = FIDline.ssrcs.split(/\s+/)[1];
              const ssrc = FIDline.ssrcs.split(/\s+/)[0];
              mSection.ssrcGroups.push({ semantics: "FID", ssrcs: `${ssrc} ${rtxSSrc}` });
              if (cname) {
                  mSection.ssrcs.push({ id: rtxSSrc, attribute: "cname", value: cname.value });
              }
              if (ssrcMsidLine) {
                  const msid = ssrcMsidLine.value.split(" ")[0];
                  mSection.ssrcs.push({ id: rtxSSrc, attribute: "msid", value: `${msid} ${track.id}` });
              }
              mSection.ssrcs.push({ id: rtxSSrc, attribute: "label", value: track.id });
          }
      }
      return lib.write(sdpObj);
  }
  class RemoteSdp {
      constructor(direction, rtpcap) {
          this.lastSubMids = [];
          this.sessionVersion = 0;
          this.direction = direction;
          this.extendedRtpCapabilities = rtpcap;
      }
      get transportRemoteParameters() {
          return this._transportRemoteParameters;
      }
      async setTransportRemoteParameters(remoteParameters) {
          for (const candidate of remoteParameters.iceCandidates) {
              candidate.ip = await resolveIceHost(candidate.ip);
          }
          this._transportRemoteParameters = remoteParameters;
      }
      createRemoteAnswer(offer) {
          if (!this.transportRemoteParameters)
              throw UNEXPECTED_ERROR("no transportRemoteParameters!");
          if (browserReport.unifiedPlan) {
              return createUnifiedPlanAnswerSdp(this.extendedRtpCapabilities, this.transportRemoteParameters, offer);
          }
          else {
              return createPlanBAnswerSdp(this.extendedRtpCapabilities, this.transportRemoteParameters, offer);
          }
      }
      createRemoteOffer(consumerInfos) {
          if (!this.transportRemoteParameters)
              throw UNEXPECTED_ERROR("no transportRemoteParameters!");
          if (browserReport.unifiedPlan) {
              const sortedConsumerInfos = sortConsumerInfos(consumerInfos, this.lastSubMids);
              this.lastSubMids = sortedConsumerInfos.map(c => c.mid);
              this.sessionVersion += 1;
              return createUnifiedPlanOfferSdp(sortedConsumerInfos, this.extendedRtpCapabilities, this.transportRemoteParameters, this.sessionVersion);
          }
          else {
              const kind = new Set();
              consumerInfos.forEach(c => kind.add(c.kind));
              //  如果没有传入 consumerInfos 代表是创建 sub pc
              if (consumerInfos.length === 0) {
                  kind.add("audio");
                  kind.add("video");
              }
              return createPlanBOfferSdp(Array.from(kind), consumerInfos, this.extendedRtpCapabilities, this.transportRemoteParameters);
          }
      }
      async updateICEData(iceParameters, iceCandidates) {
          if (!this.transportRemoteParameters)
              return;
          for (const candidate of iceCandidates) {
              candidate.ip = await resolveIceHost(candidate.ip);
          }
          this.transportRemoteParameters.iceCandidates = iceCandidates;
          this.transportRemoteParameters.iceParameters = iceParameters;
      }
  }
  async function getClientCapabilitiesSdp() {
      const pc = createPC();
      const offerOptions = { offerToReceiveAudio: true, offerToReceiveVideo: true };
      const offer = await pc.createOffer(offerOptions);
      if (browserReport.needH264FmtpLine) {
          offer.sdp += `a=fmtp:107 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f${NEW_LINE}`;
      }
      const capsdp = {
          capsdp: offer.sdp,
          agent: navigator.userAgent,
      };
      pc.close();
      return capsdp;
  }
  function createPlanBAnswerSdp(rtpcaps, data, offer) {
      const sdpObj = lib.parse(offer);
      sdpObj.version = 0;
      sdpObj.origin = {
          address: "0.0.0.0",
          ipVer: 4,
          netType: "IN",
          sessionId: "5975129998295344376",
          sessionVersion: 2,
          username: REMOTE_SERVER_NAME,
      };
      sdpObj.name = "-";
      sdpObj.timing = { start: 0, stop: 0 };
      sdpObj.icelite = data.iceParameters.iceLite ? "ice-lite" : undefined;
      sdpObj.msidSemantic = { semantic: "WMS", token: "*" };
      sdpObj.fingerprint = { type: data.dtlsParameters.fingerprints[0].algorithm, hash: data.dtlsParameters.fingerprints[0].value };
      const newMedia = [];
      for (const _mSection of sdpObj.media) {
          const kind = _mSection.type;
          const codec = rtpcaps.codecs.find(c => c.kind === kind);
          const headerExtensions = (rtpcaps.headerExtensions || []).filter(h => h.kind === kind);
          if (!codec)
              throw UNEXPECTED_ERROR("can not find codec" + kind);
          const mSection = {
              type: kind,
              mid: kind,
              port: 7,
              protocol: "RTP/SAVPF",
              connection: { ip: "127.0.0.1", version: 4 },
              iceUfrag: data.iceParameters.usernameFragment,
              icePwd: data.iceParameters.password,
              candidates: data.iceCandidates.map(iceCandidate => ({
                  component: 1,
                  foundation: iceCandidate.foundation,
                  ip: iceCandidate.ip,
                  port: iceCandidate.port,
                  priority: iceCandidate.priority,
                  transport: iceCandidate.protocol,
                  type: iceCandidate.type,
              })),
              endOfCandidates: "end-of-candidates",
              iceOptions: "renomination",
              setup: data.dtlsParameters.role === "server" ? "actpass" : "active",
              direction: "recvonly",
              rtp: [{
                      payload: codec.sendPayloadType,
                      codec: codec.name,
                      rate: codec.clockRate,
                      encoding: codec.channels > 1 ? codec.channels : undefined,
                  }],
              rtcpFb: [],
              fmtp: [{
                      payload: codec.sendPayloadType,
                      config: Object.keys(codec.parameters).map(k => `${k}=${codec.parameters[k]};`).join(""),
                  }],
              payloads: codec.sendPayloadType,
              rtcpMux: "rtcp-mux",
              rtcpRsize: "rtcp-rsize",
              ext: headerExtensions.map(ext => ({ uri: ext.uri, value: ext.sendId })),
          };
          if (codec.rtcpFeedback && codec.rtcpFeedback.length > 0) {
              codec.rtcpFeedback.forEach(rf => {
                  mSection.rtcpFb.push({
                      payload: codec.sendPayloadType,
                      type: rf.type,
                      subtype: rf.parameter,
                  });
              });
          }
          if (codec.sendRtxPayloadType) {
              mSection.rtp.push({
                  payload: codec.sendRtxPayloadType,
                  codec: "rtx",
                  rate: codec.clockRate,
                  encoding: codec.channels > 1 ? codec.channels : undefined,
              });
              mSection.fmtp.push({
                  payload: codec.sendRtxPayloadType,
                  config: `apt=${codec.sendPayloadType};`,
              });
              mSection.payloads = `${codec.sendPayloadType} ${codec.sendRtxPayloadType}`;
          }
          newMedia.push(mSection);
      }
      sdpObj.media = newMedia;
      return lib.write(sdpObj);
  }
  /**
   * unified-plan 对 mid 顺序敏感，必须保证每次重协商顺序一致
   */
  function sortConsumerInfos(infos, lastSubMids) {
      let newInfos = [];
      for (const mid of lastSubMids) {
          const info = lodash_remove(infos, i => i.mid === mid)[0];
          if (!info)
              continue;
          newInfos.push(info);
      }
      newInfos = newInfos.concat(infos);
      lastSubMids = newInfos.map(i => i.mid);
      return newInfos;
  }
  function createUnifiedPlanOfferSdp(consumerInfos, rtpcaps, data, sessionVersion) {
      log.debug("consumerInfos", consumerInfos);
      const sdpObj = {};
      const mids = consumerInfos.map(i => i.mid);
      sdpObj.version = 0;
      sdpObj.origin = {
          address: "0.0.0.0",
          ipVer: 4,
          netType: "IN",
          sessionId: "5975129998295344377",
          sessionVersion,
          username: REMOTE_SERVER_NAME,
      };
      sdpObj.name = "-";
      sdpObj.timing = { start: 0, stop: 0 };
      sdpObj.icelite = data.iceParameters.iceLite ? "ice-lite" : undefined;
      sdpObj.msidSemantic = { semantic: "WMS", token: "*" };
      if (mids.length > 0) {
          sdpObj.groups = [{ type: "BUNDLE", mids: mids.join(" ") }];
      }
      sdpObj.media = [];
      sdpObj.fingerprint = { type: data.dtlsParameters.fingerprints[0].algorithm, hash: data.dtlsParameters.fingerprints[0].value };
      for (const info of consumerInfos) {
          const codecs = info.kind === "audio" ? rtpcaps.codecs[0] : rtpcaps.codecs[1];
          const headerExtensions = rtpcaps.headerExtensions.filter(h => h.kind === info.kind);
          const mediaObj = {
              type: info.kind,
              port: 7,
              protocol: "RTP/SAVPF",
              connection: { ip: "127.0.0.1", version: 4 },
              mid: info.mid,
              msid: `${info.streamId} ${info.trackId}`,
              iceUfrag: data.iceParameters.usernameFragment,
              icePwd: data.iceParameters.password,
              candidates: data.iceCandidates.map(iceCandidate => ({
                  component: 1,
                  foundation: iceCandidate.foundation,
                  ip: iceCandidate.ip,
                  port: iceCandidate.port,
                  priority: iceCandidate.priority,
                  transport: iceCandidate.protocol,
                  type: iceCandidate.type,
              })),
              endOfCandidates: "end-of-candidates",
              iceOptions: "renomination",
              setup: data.dtlsParameters.role === "server" ? "actpass" : "active",
              direction: info.closed ? "inactive" : "sendonly",
              rtp: [{
                      payload: codecs.recvPayloadType,
                      codec: codecs.name,
                      rate: codecs.clockRate,
                      encoding: codecs.channels > 1 ? codecs.channels : undefined,
                  }],
              rtcpFb: [],
              fmtp: [{
                      payload: codecs.recvPayloadType,
                      config: Object.keys(codecs.parameters).map(k => `${k}=${codecs.parameters[k]};`).join(""),
                  }],
              payloads: codecs.recvPayloadType,
              rtcpMux: "rtcp-mux",
              rtcpRsize: "rtcp-rsize",
              ext: !info.closed ? headerExtensions.map(ext => ({ uri: ext.uri, value: ext.recvId })) : [],
              ssrcs: !info.closed && info.ssrc ? [{
                      id: info.ssrc,
                      attribute: "cname",
                      value: info.cname,
                  }] : [],
              ssrcGroups: [],
          };
          if (codecs.rtcpFeedback && codecs.rtcpFeedback.length > 0) {
              codecs.rtcpFeedback.forEach(rf => {
                  mediaObj.rtcpFb.push({
                      payload: codecs.recvPayloadType,
                      type: rf.type,
                      subtype: rf.parameter,
                  });
              });
          }
          if (codecs.recvRtxPayloadType) {
              mediaObj.rtp.push({
                  payload: codecs.recvRtxPayloadType,
                  codec: "rtx",
                  rate: codecs.clockRate,
                  encoding: codecs.channels > 1 ? codecs.channels : undefined,
              });
              mediaObj.fmtp.push({
                  payload: codecs.recvRtxPayloadType,
                  config: `apt=${codecs.recvPayloadType};`,
              });
              mediaObj.payloads = `${codecs.recvPayloadType} ${codecs.recvRtxPayloadType}`;
          }
          if (info.rtxSsrc && !info.closed) {
              mediaObj.ssrcs.push({
                  id: info.rtxSsrc,
                  attribute: "cname",
                  value: info.cname,
              });
              mediaObj.ssrcGroups.push({
                  semantics: "FID",
                  ssrcs: `${info.ssrc} ${info.rtxSsrc}`,
              });
          }
          sdpObj.media.push(mediaObj);
      }
      return lib.write(sdpObj);
  }
  function createUnifiedPlanAnswerSdp(rtpcaps, data, offer) {
      const localSdpObj = lib.parse(offer);
      const bundleMids = (localSdpObj.media || [])
          .filter(m => m.hasOwnProperty("mid"))
          .map(m => String(m.mid));
      const sdpObj = {};
      sdpObj.version = 0;
      sdpObj.origin = {
          address: "0.0.0.0",
          ipVer: 4,
          netType: "IN",
          sessionId: "5975129998295344376",
          sessionVersion: 2,
          username: REMOTE_SERVER_NAME,
      };
      sdpObj.name = "-";
      sdpObj.timing = { start: 0, stop: 0 };
      sdpObj.icelite = data.iceParameters.iceLite ? "ice-lite" : undefined;
      sdpObj.msidSemantic = { semantic: "WMS", token: "*" };
      if (bundleMids.length > 0) {
          sdpObj.groups = [{ type: "BUNDLE", mids: bundleMids.join(" ") }];
      }
      sdpObj.media = [];
      sdpObj.fingerprint = { type: data.dtlsParameters.fingerprints[0].algorithm, hash: data.dtlsParameters.fingerprints[0].value };
      for (const localMediaObj of localSdpObj.media) {
          const closed = localMediaObj.direction === "inactive";
          const kind = localMediaObj.type;
          const codecs = kind === "audio" ? rtpcaps.codecs[0] : rtpcaps.codecs[1];
          const headerExtensions = rtpcaps.headerExtensions.filter(h => h.kind === kind);
          const remoteMediaObj = {
              type: localMediaObj.type,
              port: 7,
              protocol: "RTP/SAVPF",
              connection: { ip: "127.0.0.1", version: 4 },
              mid: localMediaObj.mid,
              iceUfrag: data.iceParameters.usernameFragment,
              icePwd: data.iceParameters.password,
              candidates: data.iceCandidates.map(iceCandidate => ({
                  component: 1,
                  foundation: iceCandidate.foundation,
                  ip: iceCandidate.ip,
                  port: iceCandidate.port,
                  priority: iceCandidate.priority,
                  transport: iceCandidate.protocol,
                  type: iceCandidate.type,
              })),
              endOfCandidates: "end-of-candidates",
              iceOptions: "renomination",
              setup: data.dtlsParameters.role === "server" ? "actpass" : "active",
              direction: localMediaObj.direction === "sendonly" || localMediaObj.direction === "sendrecv" ? "recvonly" : "inactive",
              rtp: [{
                      payload: codecs.sendPayloadType,
                      codec: codecs.name,
                      rate: codecs.clockRate,
                      encoding: codecs.channels > 1 ? codecs.channels : undefined,
                  }],
              rtcpFb: [],
              fmtp: [{
                      payload: codecs.sendPayloadType,
                      config: Object.keys(codecs.parameters).map(k => `${k}=${codecs.parameters[k]};`).join(""),
                  }],
              payloads: codecs.sendPayloadType,
              rtcpMux: "rtcp-mux",
              rtcpRsize: "rtcp-rsize",
              ext: headerExtensions.map(ext => ({ uri: ext.uri, value: ext.sendId })),
          };
          if (codecs.rtcpFeedback && codecs.rtcpFeedback.length > 0) {
              codecs.rtcpFeedback.forEach(rf => {
                  remoteMediaObj.rtcpFb.push({
                      payload: codecs.sendPayloadType,
                      type: rf.type,
                      subtype: rf.parameter,
                  });
              });
          }
          if (codecs.sendRtxPayloadType) {
              remoteMediaObj.rtp.push({
                  payload: codecs.sendRtxPayloadType,
                  codec: "rtx",
                  rate: codecs.clockRate,
                  encoding: codecs.channels > 1 ? codecs.channels : undefined,
              });
              remoteMediaObj.fmtp.push({
                  payload: codecs.sendRtxPayloadType,
                  config: `apt=${codecs.sendPayloadType};`,
              });
              remoteMediaObj.payloads = `${codecs.sendPayloadType} ${codecs.sendRtxPayloadType}`;
          }
          sdpObj.media.push(remoteMediaObj);
      }
      return lib.write(sdpObj);
  }
  function createPlanBOfferSdp(kinds, consumerInfos, rtpcaps, data) {
      // 保证 audio 在 video 前
      kinds = ["audio", "video"];
      const sdpObj = {};
      sdpObj.version = 0;
      sdpObj.origin = {
          address: "0.0.0.0",
          ipVer: 4,
          netType: "IN",
          sessionId: "5975129998295344377",
          sessionVersion: 2,
          username: REMOTE_SERVER_NAME,
      };
      sdpObj.name = "-";
      sdpObj.timing = { start: 0, stop: 0 };
      sdpObj.icelite = data.iceParameters.iceLite ? "ice-lite" : undefined;
      sdpObj.msidSemantic = { semantic: "WMS", token: "*" };
      sdpObj.groups = [{ type: "BUNDLE", mids: kinds.join(" ") }];
      sdpObj.media = [];
      sdpObj.fingerprint = { type: data.dtlsParameters.fingerprints[0].algorithm, hash: data.dtlsParameters.fingerprints[0].value };
      for (const kind of kinds) {
          const kindConsumerInfos = consumerInfos.filter(i => i.kind === kind);
          const codecs = rtpcaps.codecs.find(c => c.kind === kind);
          const headerExtensions = (rtpcaps.headerExtensions || []).filter(e => e.kind === kind);
          if (!codecs)
              throw UNEXPECTED_ERROR("no codec" + kind);
          const mediaObj = {
              type: kind,
              port: 7,
              protocol: "RTP/SAVPF",
              connection: { ip: "127.0.0.1", version: 4 },
              mid: kind,
              iceUfrag: data.iceParameters.usernameFragment,
              icePwd: data.iceParameters.password,
              candidates: data.iceCandidates.map(iceCandidate => ({
                  component: 1,
                  foundation: iceCandidate.foundation,
                  ip: iceCandidate.ip,
                  port: iceCandidate.port,
                  priority: iceCandidate.priority,
                  transport: iceCandidate.protocol,
                  type: iceCandidate.type,
              })),
              endOfCandidates: "end-of-candidates",
              iceOptions: "renomination",
              setup: data.dtlsParameters.role === "server" ? "actpass" : "active",
              direction: "sendonly",
              rtp: [{
                      payload: codecs.recvPayloadType,
                      codec: codecs.name,
                      rate: codecs.clockRate,
                      encoding: codecs.channels > 1 ? codecs.channels : undefined,
                  }],
              rtcpFb: [],
              fmtp: [{
                      payload: codecs.recvPayloadType,
                      config: Object.keys(codecs.parameters).map(k => `${k}=${codecs.parameters[k]};`).join(""),
                  }],
              payloads: codecs.recvPayloadType,
              rtcpMux: "rtcp-mux",
              rtcpRsize: "rtcp-rsize",
              ssrcs: [],
              ssrcGroups: [],
              ext: headerExtensions.map(ext => ({ uri: ext.uri, value: ext.recvId })),
          };
          if (codecs.rtcpFeedback && codecs.rtcpFeedback.length > 0) {
              codecs.rtcpFeedback.forEach(rf => {
                  mediaObj.rtcpFb.push({
                      payload: codecs.recvPayloadType,
                      type: rf.type,
                      subtype: rf.parameter,
                  });
              });
          }
          if (codecs.recvRtxPayloadType) {
              mediaObj.rtp.push({
                  payload: codecs.recvRtxPayloadType,
                  codec: "rtx",
                  rate: codecs.clockRate,
                  encoding: codecs.channels > 1 ? codecs.channels : undefined,
              });
              mediaObj.fmtp.push({
                  payload: codecs.recvRtxPayloadType,
                  config: `apt=${codecs.recvPayloadType};`,
              });
              mediaObj.payloads = `${codecs.recvPayloadType} ${codecs.recvRtxPayloadType}`;
          }
          for (const info of kindConsumerInfos) {
              mediaObj.ssrcs.push({ id: info.ssrc, attribute: "msid", value: `${info.streamId} ${info.trackId}` });
              mediaObj.ssrcs.push({ id: info.ssrc, attribute: "mslabel", value: `${info.streamId}` });
              mediaObj.ssrcs.push({ id: info.ssrc, attribute: "label", value: `${info.trackId}` });
              mediaObj.ssrcs.push({ id: info.ssrc, attribute: "cname", value: `${info.cname}` });
              if (info.rtxSsrc) {
                  mediaObj.ssrcGroups.push({ semantics: "FID", ssrcs: `${info.ssrc} ${info.rtxSsrc}` });
                  mediaObj.ssrcs.push({ id: info.rtxSsrc, attribute: "msid", value: `${info.streamId} ${info.trackId}` });
                  mediaObj.ssrcs.push({ id: info.rtxSsrc, attribute: "mslabel", value: `${info.streamId}` });
                  mediaObj.ssrcs.push({ id: info.rtxSsrc, attribute: "label", value: `${info.trackId}` });
                  mediaObj.ssrcs.push({ id: info.rtxSsrc, attribute: "cname", value: `${info.cname}` });
              }
          }
          sdpObj.media.push(mediaObj);
      }
      return lib.write(sdpObj);
  }

  /*
   * index.ts
   * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
   *
   * Distributed under terms of the MIT license.
  */

  /**
   * SDK版本号
   */
  const version = "2.2.0";

  /*
   * auth.ts
   * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
   *
   * Distributed under terms of the MIT license.
  */
  const RTC_HOST = "https://rtc.qiniuapi.com";
  async function getAccessToken(roomAccess, roomToken) {
      const { appId, roomName, userId } = roomAccess;
      const url = `${RTC_HOST}/v3/apps/${appId}/rooms/${roomName}/auth?user=${userId}&token=${roomToken}`;
      while (true) {
          try {
              const res = await request(url);
              return res.accessToken;
          }
          catch (e) {
              if (e.retry === false) {
                  throw AUTH_ENTER_ROOM_ERROR(e.message);
              }
              await timeout(1000);
              log.warning("can not get accessToken, retry.", AUTH_ENTER_ROOM_ERROR(e));
          }
      }
  }

  /*
   * ws.ts
   * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
   *
   * Distributed under terms of the MIT license.
  */
  const { JOIN_ROOM_ERROR: JOIN_ROOM_ERROR$1 } = error;
  var SignalingState;
  (function (SignalingState) {
      SignalingState[SignalingState["CONNECTING"] = 0] = "CONNECTING";
      SignalingState[SignalingState["OPEN"] = 1] = "OPEN";
      SignalingState[SignalingState["CLOSING"] = 2] = "CLOSING";
      SignalingState[SignalingState["CLOSED"] = 3] = "CLOSED";
  })(SignalingState || (SignalingState = {}));
  class SignalingWS extends EnhancedEventEmitter {
      constructor(url, token, capsdp, playerdata) {
          super();
          this.initWs = (isUserAction = false) => new Promise((resolve, reject) => {
              if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                  this.ws.close();
                  this.ws.onclose = null;
              }
              try {
                  this.ws = new WebSocket(this.url);
                  this._state = SignalingState.CONNECTING;
              }
              catch (e) {
                  throw UNEXPECTED_ERROR(`init signaling websocket faild!\nError: ${e}`);
              }
              this.ws.onerror = this.onWsError;
              this.ws.onclose = this.onWsClose.bind(this, resolve, reject);
              this.ws.onopen = () => {
                  this.emit("ws:onopen");
                  log.log("signaling: websocket open", this.url);
                  this.ws.onmessage = this.onWsMsg;
                  const authData = {
                      token: this.accessToken,
                      reconntoken: this.reconnectToken,
                      agent: `${browser.name}${browser.version}`,
                      sdkversion: version,
                      capsdp: this.capsdp,
                      msgsn: this.customMsgNumber,
                      supportdomain: true,
                  };
                  if (this.playerdata) {
                      authData.playerdata = this.playerdata;
                  }
                  this.request("auth", authData)
                      .then((msgData) => {
                      switch (msgData.code) {
                          case 0: {
                              this.ws.onclose = this.onWsClose.bind(this, null, null);
                              this.reconnectToken = msgData.reconntoken;
                              log.log("signaling: websocket authed");
                              this.emit("@signalingauth", msgData);
                              this._state = SignalingState.OPEN;
                              resolve(msgData);
                              break;
                          }
                          case 10001:
                          // 用户 token 错误
                          case 10002:
                          // 用户 token 过期
                          case 10011:
                          // 房间人数已满
                          case 10022:
                          // 已经在其他设备登陆
                          case 10004: {
                              // reconnect token error (重连超时)
                              this.emit("@error", msgData);
                              reject(JOIN_ROOM_ERROR$1(msgData.code, msgData.error));
                              break;
                          }
                          case 10012: {
                              // room not exist, 需要重新签 accessToken
                              this.safeEmitAsPromise("@needupdateaccesstoken").then(() => {
                                  this.reconnect().then(resolve).catch(reject);
                              }).catch(reject);
                              return;
                          }
                          case 10052: {
                              log.debug("10052 auth, retry", isUserAction);
                              // 媒体服务器宕机或者重启
                              this.reconnectToken = undefined;
                              if (isUserAction) {
                                  reject(JOIN_ROOM_ERROR$1(msgData.code, msgData.error));
                                  break;
                              }
                              else {
                                  this.emit("@error", msgData);
                                  return;
                              }
                          }
                          case 10054: {
                              // 客户端与服务端编码能力不匹配
                              reject(UNSUPPORT_FMT(msgData.error));
                              break;
                          }
                          default:
                              reject(UNEXPECTED_ERROR(msgData.error));
                              break;
                      }
                      if (msgData.code !== 0) {
                          this.reconnectToken = undefined;
                          this._state = SignalingState.CLOSED;
                          this.release();
                      }
                  });
              };
          });
          this.onWsMsg = (e) => {
              // data 格式为 'xxx={ "a": 1, "b": 2 }'
              const data = e.data;
              this.emit("ws:onmessage", data);
              const index = data.indexOf("=");
              if (index > 0) {
                  const msgType = data.substring(0, index);
                  const payload = JSON.parse(data.substring(index + 1));
                  this.receiveWsMsg(msgType, payload);
              }
              else {
                  throw UNEXPECTED_ERROR(`signaling model can not parse message: ${data}`);
              }
          };
          this.onWsError = (e) => {
              log.warning("signaling: websocket error", e);
              this.emit("@ws:error", e);
          };
          this.sendWsMsg = (msgType, msgData) => {
              if (this.ws.readyState !== WebSocket.OPEN) {
                  throw WS_ABORT();
              }
              const jsonString = JSON.stringify(msgData);
              try {
                  this.ws.send(`${msgType}=${jsonString}`);
                  this.emit("send", msgType, msgData);
              }
              catch (e) {
                  log.warning("signaling: websocket send error", e);
                  this.reconnect().catch(e => {
                      log.warning("signaling: reconnect error", e);
                  });
                  throw WS_ABORT();
              }
          };
          this.handlePing = () => {
              this.sendWsMsg("pong", {});
              if (this.reconnectTimeoutID) {
                  clearTimeout(this.reconnectTimeoutID);
              }
              this.reconnectTimeoutID = setTimeout(() => {
                  log.debug("signaling: websocket heartbeat timeout");
                  this.reconnect().catch(e => {
                      log.debug(e);
                  });
              }, 9000);
          };
          this.receiveWsMsg = (msgType, msgData) => {
              this.emit("receive", msgType, msgData);
              switch (msgType) {
                  case "ping":
                      this.handlePing();
                      break;
                  case "auth-res":
                      this.emit("@auth-res", msgData);
                  case "pubpc-res":
                  case "subpc-res":
                  case "pub-tracks":
                  case "webrtc-candidate":
                  case "on-player-in":
                  case "on-player-out":
                  case "disconnect":
                  case "mute-tracks":
                  case "on-add-tracks":
                  case "on-remove-tracks":
                      this.emit(msgType, msgData);
                      break;
                  case "sub-res":
                  case "unsub-res":
                      this.emit(msgType, msgData);
                      this.emit(`${msgType}-${msgData.streamid}`, msgData);
                      break;
                  case "control-res":
                      this.emit(msgType, msgData);
                      this.emit(`${msgType}-${msgData.command}-${msgData.playerid}`, msgData);
                      break;
                  case "on-pubpc-connected":
                  case "on-pubpc-disconnected":
                      this.emit("on-pubpc-state", { pcid: msgData.pcid, connected: msgType === "on-pubpc-connected" });
                      this.emit(`${msgType}-${msgData.pcid}`, msgData);
                      break;
                  case "on-subpc-disconnected":
                  case "on-subpc-connected":
                      this.emit("on-subpc-state", { pcid: msgData.pcid, connected: msgType === "on-subpc-connected" });
                      this.emit(msgType, msgData);
                      break;
                  case "pub-tracks-res":
                      this.emit(msgType, msgData);
                      break;
                  case "on-messages":
                      // 按照 msgsn 从小到大排序
                      msgData.messages = msgData.messages.sort((a, b) => a.msgsn - b.msgsn);
                      this.customMsgNumber = msgData.messages[msgData.messages.length - 1].msgsn;
                      this.emit(msgType, msgData);
                      break;
                  case "unpub-tracks-res":
                  case "sub-tracks-res":
                  case "unsub-tracks-res":
                  case "on-pubpc-restart-notify":
                  case "on-subpc-restart-notify":
                  case "pubpc-restart-res":
                  case "subpc-restart-res":
                      this.emit(msgType, msgData);
                      break;
                  default:
                      break;
              }
          };
          this.url = url;
          this.accessToken = token;
          this.capsdp = capsdp;
          this.playerdata = playerdata;
      }
      set _state(state) {
          this.emit("@ws-state-change", this.__state, state);
          this.__state = state;
      }
      get state() {
          return this.__state;
      }
      onWsClose(resolve, reject, e) {
          this._state = SignalingState.CLOSED;
          log.warning("signaling: websocket onclose", e);
          let reconnectPromise = this.reconnectPromise;
          // See http://tools.ietf.org/html/rfc6455#section-7.4.1
          switch (e.code) {
              case 1000: {
                  // Normal closure, meaning that the purpose for which the connection was established has been fulfilled.
                  this.emit("@closed");
                  break;
              }
              case 1001: {
                  // An endpoint is "going away", such as a server going down or a browser having navigated away from a page.
                  reconnectPromise = this.reconnect();
                  break;
              }
              case 1005: {
                  // No status code was actually present.
                  reconnectPromise = this.reconnect();
                  break;
              }
              case 1006: {
                  // The connection was closed abnormally, e.g., without sending or receiving a Close control frame
                  reconnectPromise = this.reconnect();
                  break;
              }
              case 1007: {
                  // An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [http://tools.ietf.org/html/rfc3629] data within a text message).
                  break;
              }
              case 1008: {
                  // An endpoint is terminating the connection because it has received a message that "violates its policy". This reason is given either if there is no other sutible reason, or if there is a need to hide specific details about the policy.
                  break;
              }
              case 1009: {
                  // An endpoint is terminating the connection because it has received a message that is too big for it to process.
                  break;
              }
              case 1010: {
                  // Note that this status code is not used by the server, because it can fail the WebSocket handshake instead.
                  // An endpoint (client) is terminating the connection because it has expected the server to negotiate one or more extension, but the server didn't return them in the response message of the WebSocket handshake.
                  // Specifically, the extensions that are needed are: " + e.reason
                  break;
              }
              case 1011: {
                  // A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.
                  reconnectPromise = this.reconnect();
                  break;
              }
              // https://www.ietf.org/mail-archive/web/hybi/current/msg09670.html
              case 1012: {
                  // the service is restarted. a client may reconnect,
                  // and if it choses to do, should reconnect using a randomized delay of 5 - 30s.
                  reconnectPromise = this.reconnect(5000);
                  break;
              }
              case 1013: {
                  // The server is terminating the connection due to a temporary condition,
                  // e.g. it is overloaded and is casting off some of its clients.
                  reconnectPromise = this.reconnect();
                  break;
              }
              case 1014: {
                  // The server was acting as a gateway or proxy and received an invalid response from the upstream server.
                  // This is similar to 502 HTTP Status Code.
                  reconnectPromise = this.reconnect(5000);
                  break;
              }
              case 1015: {
                  // The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified).
                  break;
              }
              default: {
                  // Others
                  break;
              }
          }
          if (resolve && reject) {
              if (reconnectPromise) {
                  resolve(reconnectPromise);
              }
              else {
                  reject(e);
              }
          }
      }
      sendDisconnect() {
          if (this.state !== SignalingState.OPEN) {
              return;
          }
          try {
              this.sendWsMsg("disconnect", {});
          }
          catch (error) {
              // abort error
          }
      }
      reconnect(time = 1000) {
          // 每次连接已经确认断开后，本地 heartbeat 都需要删除
          if (this.reconnectTimeoutID) {
              clearTimeout(this.reconnectTimeoutID);
          }
          if (this.reconnectPromise && this._state === SignalingState.CONNECTING) {
              return this.reconnectPromise;
          }
          this._state = SignalingState.CONNECTING;
          log.debug("signaling: websocket reconnecting");
          this.reconnectPromise = timeout(time)
              .then(() => {
              return this.initWs();
          })
              .then(res => {
              this.reconnectPromise = undefined;
              return res;
          })
              .catch(e => {
              this._state = SignalingState.CLOSED;
              this.emit("error", e);
              return Promise.reject(e);
          });
          return this.reconnectPromise;
      }
      /**
       * request
       */
      request(method, data) {
          const rpcid = randomStringGen(8);
          data.rpcid = rpcid;
          log.log("ws request", rpcid, method, data);
          this.sendWsMsg(method, data);
          return new Promise(resolve => {
              const onres = (data) => {
                  if (data.rpcid === rpcid) {
                      log.log("ws response", rpcid, method, data);
                      this.off(`${method}-res`, onres);
                      resolve(data);
                  }
              };
              this.on(`${method}-res`, onres);
          });
      }
      release() {
          if (this.reconnectTimeoutID) {
              clearTimeout(this.reconnectTimeoutID);
          }
          this.removeEvent();
          this.ws.onclose = null;
          this.ws.onerror = null;
          this.ws.close();
      }
  }

  /*
   * merger.ts
   * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
   *
   * Distributed under terms of the MIT license.
  */
  class MergerSessionController {
  }
  class Merger {
      constructor(width, height, controller, jobId) {
          this.videoTrackInfo = [];
          this.audioTrackInfo = [];
          this.layoutLevel = 0;
          this.width = width;
          this.height = height;
          this.jobId = jobId;
          this.controller = controller;
          this.controller.getCurrentTracks().forEach(track => {
              if (track.kind === "audio") {
                  this.audioTrackInfo.push(track);
              }
              else {
                  this.videoTrackInfo.push(track);
              }
          });
          this.controller.addMergeTrack(this.audioTrackInfo.map(t => ({ trackId: t.trackId })), this.jobId);
          this.initLayout();
          this.controller.onAddTracks = (tracks => {
              const audioTracks = tracks.filter(t => t.kind === "audio");
              const videoTracks = tracks.filter(t => t.kind === "video");
              this.controller.addMergeTrack(audioTracks.map(t => ({ trackId: t.trackId })), this.jobId);
              videoTracks.forEach(this.handleAddVideoTrack.bind(this));
          });
          this.controller.onRemoveTracks = (tracks => {
              const videoTracks = tracks.filter(t => t.kind === "video");
              videoTracks.forEach(this.handleRemoveVideoTrack.bind(this));
          });
          log.log("init default merger, init layout: ", this.layout);
      }
      initLayout() {
          const streamCount = this.videoTrackInfo.length;
          this.layoutLevel = 0;
          this.layout = {
              "level-0": {
                  items: { "item-0": { x: 0, y: 0, isExpand: false, isExpanded: false, index: 0 } },
                  itemWidth: this.width,
                  itemHeight: this.height,
                  maxItems: 1, currentItems: 0,
                  splitWidthFlag: this.width < this.height,
              },
          };
          let splitWidthFlag = this.width >= this.height;
          if (streamCount === 0) {
              return;
          }
          while (Math.pow(2, this.layoutLevel) < streamCount) {
              this.updateLayoutLevel(splitWidthFlag);
              splitWidthFlag = !splitWidthFlag;
          }
          this.setLevelLayoutStream();
      }
      updateLayoutLevel(splitWidthFlag) {
          const currentLayout = this.layout[`level-${this.layoutLevel}`];
          const currentWidth = currentLayout.itemWidth;
          const currentHeight = currentLayout.itemHeight;
          this.layoutLevel += 1;
          const maxItems = Math.pow(2, this.layoutLevel);
          const itemWidth = splitWidthFlag ? currentWidth / 2.0 : currentWidth;
          const itemHeight = splitWidthFlag ? currentHeight : currentHeight / 2.0;
          if (this.layoutLevel === 1) {
              this.layout[`level-${this.layoutLevel}`] = {
                  items: {
                      "item-0": { x: 0, y: 0, isExpand: false, isExpanded: false, index: 0 },
                      "item-1": {
                          x: this.width >= this.height ? itemWidth : 0,
                          y: this.width < this.height ? itemHeight : 0,
                          isExpand: false, isExpanded: false, index: 1,
                      },
                  },
                  maxItems, currentItems: 0, itemWidth, itemHeight, splitWidthFlag,
              };
          }
          else {
              this.layout[`level-${this.layoutLevel}`] = {
                  items: {}, maxItems, currentItems: 0, itemWidth, itemHeight, splitWidthFlag,
              };
              const levelItems = this.layout[`level-${this.layoutLevel}`].items;
              Object.keys(this.layout[`level-${this.layoutLevel - 1}`].items).forEach(itemIndex => {
                  const item = this.layout[`level-${this.layoutLevel - 1}`].items[itemIndex];
                  const newIndex = 2 * item.index;
                  levelItems[`item-${newIndex}`] = {
                      x: item.x, y: item.y, isExpand: false, isExpanded: false, index: newIndex,
                  };
                  if (splitWidthFlag) {
                      levelItems[`item-${newIndex + 1}`] = {
                          x: item.x + itemWidth, y: item.y,
                          isExpand: false, isExpanded: false, index: newIndex + 1,
                      };
                  }
                  else {
                      levelItems[`item-${newIndex + 1}`] = {
                          x: item.x, y: item.y + itemHeight,
                          isExpand: false, isExpanded: false, index: newIndex + 1,
                      };
                  }
              });
          }
          log.log(`merger: increase layout level, current level: ${this.layoutLevel}`, this.layout);
      }
      setLevelLayoutStream() {
          const streamCount = this.videoTrackInfo.length;
          const currentLevelLayout = this.layout[`level-${this.layoutLevel}`];
          let expandCount = currentLevelLayout.maxItems - streamCount;
          let streamIndex = 0;
          for (let i = 0; i < currentLevelLayout.maxItems; i += 1) {
              if (expandCount > 0) {
                  if (i % 2 === 0) {
                      currentLevelLayout.items[`item-${i}`].isExpand = true;
                      currentLevelLayout.items[`item-${i}`].trackId = this.videoTrackInfo[streamIndex].trackId;
                      this.sendMergeOpt(this.layoutLevel, i);
                      streamIndex += 1;
                  }
                  else {
                      currentLevelLayout.items[`item-${i}`].isExpanded = true;
                      expandCount -= 1;
                  }
              }
              else {
                  currentLevelLayout.items[`item-${i}`].trackId = this.videoTrackInfo[streamIndex].trackId;
                  this.sendMergeOpt(this.layoutLevel, i);
                  streamIndex += 1;
              }
          }
          currentLevelLayout.currentItems = streamCount;
      }
      sendMergeOpt(level, index) {
          const levelLayout = this.layout[`level-${level}`];
          const item = levelLayout.items[`item-${index}`];
          if (!item.trackId || item.isExpanded) {
              return;
          }
          let width = levelLayout.itemWidth;
          let height = levelLayout.itemHeight;
          if (item.isExpand) {
              if (levelLayout.splitWidthFlag) {
                  width = width * 2;
              }
              else {
                  height = height * 2;
              }
          }
          const option = {
              x: item.x, y: item.y,
              w: width, h: height, z: 0,
              trackId: item.trackId,
          };
          this.controller.addMergeTrack([option], this.jobId);
      }
      handleRemoveVideoTrack(track) {
          lodash_remove(this.videoTrackInfo, t => t.trackId === track.trackId);
          const levelLayout = this.layout[`level-${this.layoutLevel}`];
          if (this.layoutLevel > 0 &&
              this.videoTrackInfo.length <= this.layout[`level-${this.layoutLevel - 1}`].maxItems) {
              this.layoutLevel -= 1;
              log.log(`merger: reduce layout level, current level: ${this.layoutLevel}`, this.layout);
              this.setLevelLayoutStream();
          }
          else {
              for (const itemKey in levelLayout.items) {
                  const item = levelLayout.items[itemKey];
                  if (item.trackId === track.trackId) {
                      if (item.index % 2 === 0) {
                          if (levelLayout.items[`item-${item.index + 1}`]) {
                              item.isExpand = true;
                              item.trackId = levelLayout.items[`item-${item.index + 1}`].trackId;
                              levelLayout.items[`item-${item.index + 1}`].isExpanded = true;
                              levelLayout.items[`item-${item.index + 1}`].trackId = undefined;
                          }
                          else {
                              item.trackId = undefined;
                          }
                          this.sendMergeOpt(this.layoutLevel, item.index);
                      }
                      else {
                          item.isExpanded = true;
                          item.trackId = undefined;
                          levelLayout.items[`item-${item.index - 1}`].isExpand = true;
                          this.sendMergeOpt(this.layoutLevel, item.index - 1);
                      }
                      break;
                  }
              }
          }
      }
      handleAddVideoTrack(track) {
          const lastLength = this.videoTrackInfo.length;
          this.videoTrackInfo.push(track);
          this.videoTrackInfo = lodash_uniqby(this.videoTrackInfo, "trackId");
          // 如果重复添加了 trackId 就忽略
          if (this.videoTrackInfo.length === lastLength) {
              log.log("handle add video track ignore", track);
              return;
          }
          const levelLayout = this.layout[`level-${this.layoutLevel}`];
          if (this.videoTrackInfo.length <= levelLayout.maxItems) {
              for (const itemKey in levelLayout.items) {
                  const item = levelLayout.items[itemKey];
                  if (!item.trackId) {
                      item.trackId = track.trackId;
                      if (item.isExpanded) {
                          item.isExpanded = false;
                          levelLayout.items[`item-${item.index - 1}`].isExpand = false;
                          this.sendMergeOpt(this.layoutLevel, item.index - 1);
                      }
                      this.sendMergeOpt(this.layoutLevel, item.index);
                      break;
                  }
              }
              levelLayout.currentItems = this.videoTrackInfo.length;
          }
          else { // 需要提升 level
              this.updateLayoutLevel(!levelLayout.splitWidthFlag);
              this.setLevelLayoutStream();
          }
      }
      release() {
          this.controller.release();
      }
  }

  class Consumer {
      constructor(id, kind, rtpParameters) {
          this.id = id;
          // this._closed = false;
          this.kind = kind;
          this.rtpParameters = rtpParameters;
          // this._peer = peer;
          // this._supported = false;
          this.track = null;
      }
  }

  class PCTrack {
      constructor(transport, direction, track, trackId) {
          this._connectStatus = exports.TrackConnectStatus.Idle;
          this.track = track;
          this.trackId = trackId;
          this.transport = transport;
          this.direction = direction;
      }
      get connectStatus() {
          return this._connectStatus;
      }
      set connectStatus(v) {
          if (v !== this._connectStatus) {
              const prev = this._connectStatus;
              this._connectStatus = v;
              nextTick(() => {
                  if (this.onConnectStatusChange) {
                      this.onConnectStatusChange(prev, this._connectStatus);
                  }
              });
          }
      }
      startConnect() {
          this.connectStatus = exports.TrackConnectStatus.Connecting;
          return new Promise((resolve, reject) => {
              this.onConnectStatusChange = (_, curr) => {
                  if (curr === exports.TrackConnectStatus.Connect) {
                      resolve();
                  }
                  if (curr === exports.TrackConnectStatus.Idle) {
                      reject();
                  }
              };
          });
      }
      appendConsumner(rtpparms, kind) {
          this.consumer = new Consumer(this.trackId, kind, rtpparms);
          this.transport.appendConsumer(this.consumer);
      }
      setMute(muted) {
          if (!this.track)
              return;
          this.track.setMute(muted);
      }
      addTrackId(trackid) {
          if (!this.track)
              return;
          this.trackId = trackid;
          this.track.setInfo({
              trackId: trackid,
          });
      }
      release() {
          if (this.consumer && this.transport) {
              // 如果释放这个 Track 时发现 pc 已经断开，就跳过
              if (this.transport.recvHandler.isPcReady) {
                  this.transport.removeConsumers([this.consumer]);
              }
              // 只有订阅的 Track 才会自动释放
              if (this.track) {
                  this.track.release();
              }
          }
          else {
              if (this.track) {
                  this.track.reset();
              }
          }
      }
  }

  class Handler extends EnhancedEventEmitter {
      constructor(direction, extendedRtpCapabilities, settings) {
          super();
          this._isRestartingICE = false;
          this.isPcReady = false;
          this._direction = direction;
          // RTCPeerConnection instance.
          this._pc = createPC();
          // Generic sending RTP parameters for audio and video.
          this._extendedRtpCapabilities = extendedRtpCapabilities;
          this._remoteSdp = new RemoteSdp(direction, extendedRtpCapabilities);
          // Handle RTCPeerConnection connection status.
          this._pc.addEventListener("iceconnectionstatechange", () => {
              switch (this._pc.iceConnectionState) {
                  case "checking":
                      this.emit("@connectionstatechange", "connecting");
                      break;
                  case "connected":
                  case "completed":
                      this.emit("@connectionstatechange", "connected");
                      break;
                  case "failed":
                      this.emit("@connectionstatechange", "failed");
                      break;
                  case "disconnected":
                      this.emit("@connectionstatechange", "disconnected");
                      break;
                  case "closed":
                      this.emit("@connectionstatechange", "closed");
                      break;
              }
          });
      }
      async getStats(track, lastReport) {
          return await getPCStats(this._pc, track, this._direction, lastReport);
      }
      getCurrentIceConnectionState() {
          return this._pc.iceConnectionState;
      }
      close() {
          log.log("handle", this._direction, "close");
          this.removeEvent();
          this._pc.close();
          this.isPcReady = false;
      }
  }
  class SendHandler extends Handler {
      constructor(extendedRtpCapabilities, signaling, settings) {
          super("send", extendedRtpCapabilities, settings);
          log.log("init send handler");
          // Got transport local and remote parameters.
          this._transportReady = false;
          // Local stream.
          this._stream = new MediaStream();
          this._signaling = signaling;
          signaling.on("on-pubpc-state", (res) => {
              if (this._remoteSdp.transportRemoteParameters &&
                  res.pcid === this._remoteSdp.transportRemoteParameters.pcid) {
                  if (!res.connected) {
                      this.emit("@connectionstatechange", "remote-disconnected");
                  }
              }
          });
      }
      getReady(transportRemoteParameters) {
          return new Promise((resolve, reject) => {
              const callback = (res) => {
                  if (res.pcid === transportRemoteParameters.pcid) {
                      this._signaling.off("on-pubpc-state", callback);
                      if (res.connected) {
                          this.isPcReady = true;
                          resolve();
                      }
                      else {
                          // 此时会被 constructor 中的时间监听捕获，触发重连，所以这里既不 reject 也不 resolve
                          return;
                      }
                  }
              };
              this._signaling.on("on-pubpc-state", callback);
          });
      }
      addProducerTracks(producerTracks) {
          log.debug("add producer", producerTracks);
          const tracks = producerTracks.map(v => v.mediaTrack)
              .filter(track => !this._stream.getTrackById(track.id));
          if (tracks.length === 0) {
              return Promise.reject(new Error("track already added"));
          }
          let rtpSenders;
          const transceivers = [];
          let localSdp;
          let shouldSendPubTracks = true;
          return Promise.resolve()
              .then(async () => {
              tracks.forEach(this._stream.addTrack, this._stream);
              if (browserReport.unifiedPlan && browserReport.supportTransceivers) {
                  for (const track of tracks) {
                      const transceiver = await addTransceiver(track, this._pc);
                      log.debug("add transceiver", transceiver, transceiver.mid);
                      transceivers.push(transceiver);
                  }
              }
              else {
                  rtpSenders = tracks.map((track) => this._pc.addTrack(track, this._stream));
              }
              return this._pc.createOffer();
          })
              .then((offer) => {
              let _offer;
              if (browserReport.unifiedPlan) {
                  _offer = { type: "offer", sdp: addPlanBTracksToUnifiedPlan(offer.sdp, tracks, transceivers.map(t => t.mid)) };
              }
              else {
                  if (browserReport.needH264FmtpLine) {
                      offer.sdp += `a=fmtp:107 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f${NEW_LINE}`;
                  }
                  _offer = offer;
              }
              localSdp = _offer.sdp;
              log.log("publish: set local offer", _offer);
              return this._pc.setLocalDescription(_offer);
          })
              .then(() => {
              if (!this._transportReady) {
                  shouldSendPubTracks = false;
                  return this._setupTransport(producerTracks);
              }
          })
              .then(() => {
              // localSdpObj = sdpTransform.parse((this._pc.localDescription as RTCSessionDescription).sdp);
              // genPubAnswer
              return this._remoteSdp.createRemoteAnswer(localSdp);
          })
              .then((remoteSdp) => {
              const answer = { type: "answer", sdp: remoteSdp };
              log.debug("addProducer answer", answer);
              // logger.debug(
              //   'addProducer() | calling pc.setRemoteDescription() [answer:%o]',
              //   answer);
              return this._pc.setRemoteDescription(answer);
          })
              .then(() => this._pcReady)
              .then(() => {
              if (shouldSendPubTracks) {
                  return this.safeEmitAsPromise("@needpubtracks", producerTracks, localSdp);
              }
              else {
                  return Promise.resolve(this._remoteSdp.transportRemoteParameters);
              }
          })
              .catch((error) => {
              // Panic here. Try to undo things.
              log.log("add producer error", error);
              try {
                  for (const rtpSender of rtpSenders) {
                      this._pc.removeTrack(rtpSender);
                  }
                  for (const transceiver of transceivers) {
                      transceiver.direction = "inactive";
                  }
              }
              catch (error2) { }
              for (const track of tracks) {
                  this._stream.removeTrack(track);
              }
              if (error instanceof QNRTCError) {
                  throw error;
              }
              else {
                  throw UNEXPECTED_ERROR(error);
              }
          });
      }
      removeProducerTracks(producerTracks) {
          log.debug("removeProducerTracks", producerTracks);
          const tracks = producerTracks.filter(v => !!v.track)
              .map(v => v.track.mediaTrack)
              .filter(track => this._stream.getTrackById(track.id));
          let localSdp;
          return Promise.resolve()
              .then(() => {
              // Get the associated RTCRtpSender.
              const rtpSenders = this._pc.getSenders()
                  .filter(s => s.track && tracks.includes(s.track));
              if (rtpSenders.length === 0) {
                  log.warning("removeProducerTracks [nothing to remove]");
                  return Promise.reject("removeProducerTracks: nothing to remote");
              }
              // Remove the associated RtpSender.
              for (const rtpSender of rtpSenders) {
                  this._pc.removeTrack(rtpSender);
              }
              // Remove the track from the local stream.
              for (const track of tracks) {
                  this._stream.removeTrack(track);
              }
              return this._pc.createOffer();
          })
              .then((offer) => {
              const description = new RTCSessionDescription(offer);
              localSdp = description.sdp;
              log.log("unpublish: set local offer", description);
              return this._pc.setLocalDescription(description);
          })
              .then(() => {
              const remoteSdp = this._remoteSdp.createRemoteAnswer(localSdp);
              const answer = { type: "answer", sdp: remoteSdp };
              log.log("unpublish: set remote answer", answer);
              return this._pc.setRemoteDescription(answer);
          })
              .catch((error) => {
              // NOTE: If there are no sending tracks, setLocalDescription() will fail with
              // "Failed to create channels". If so, ignore it.
              if (this._stream.getTracks().length === 0) {
                  log.debug("removeProducer() | ignoring expected error due no sending tracks: %s", error.toString());
                  return;
              }
              if (error instanceof QNRTCError) {
                  throw error;
              }
              else {
                  throw UNEXPECTED_ERROR(error);
              }
          })
              .then(() => {
              // no need to wait response
              this.safeEmitAsPromise("@needunpubtracks", producerTracks);
          });
      }
      restartICE(iceParameters, iceCandidates) {
          log.log("restart send ice");
          this._isRestartingICE = true;
          return Promise.resolve()
              .then(() => {
              return this._remoteSdp.updateICEData(iceParameters, iceCandidates);
          })
              .then(() => {
              return this._pc.createOffer({ iceRestart: true });
          })
              .then(offer => {
              return this._pc.setLocalDescription(offer);
          })
              .then(() => {
              const remoteSdp = this._remoteSdp.createRemoteAnswer(this._pc.localDescription.sdp);
              const answer = { type: "answer", sdp: remoteSdp };
              return this._pc.setRemoteDescription(answer);
          });
      }
      // needpubpc
      _setupTransport(tracks) {
          return Promise.resolve()
              .then(() => {
              if (!this._pc.localDescription) {
                  return this._pc.createOffer();
              }
              return this._pc.localDescription;
          })
              .then((localDescription) => {
              // We need transport remote parameters.
              return this.safeEmitAsPromise("@needpubpc", localDescription.sdp, tracks);
          })
              .then((transportRemoteParameters) => {
              this.pcid = transportRemoteParameters.pcid;
              this._transportReady = true;
              this._pcReady = this.getReady(transportRemoteParameters);
              // Provide the remote SDP handler with transport remote parameters.
              return this._remoteSdp.setTransportRemoteParameters(transportRemoteParameters);
          });
      }
  }
  class RecvHandler extends Handler {
      constructor(extendedRtpCapabilities, signaling, settings) {
          super("recv", extendedRtpCapabilities, settings);
          this._transportCreated = false;
          this._consumerInfos = new Map();
          this._signaling = signaling;
          signaling.on("on-subpc-state", (res) => {
              if (this._remoteSdp.transportRemoteParameters &&
                  res.pcid === this._remoteSdp.transportRemoteParameters.pcid) {
                  if (!res.connected) {
                      this.emit("@connectionstatechange", "remote-disconnected");
                  }
              }
          });
          log.log("init recvhandler", this);
      }
      getReady(transportRemoteParameters) {
          return new Promise((resolve, reject) => {
              const callback = (res) => {
                  if (res.pcid === transportRemoteParameters.pcid) {
                      this._signaling.off("on-subpc-state", callback);
                      if (res.connected) {
                          this.isPcReady = true;
                          resolve();
                      }
                      else {
                          // 此时会被 constructor 中的时间监听捕获，触发重连，所以这里既不 reject 也不 resolve
                          return;
                      }
                  }
              };
              this._signaling.on("on-subpc-state", callback);
          });
      }
      /**
       * 如果发生了重复订阅的情况，策略是直接返回已经保存的 track 信息
       * 也就是无论传入的 consumer 是否重复，都返回和传入数量一致的 MediaStreamTrack
       */
      async addConsumerTracks(consumers) {
          // 如果是 unified-plan 就一个一个重协商，否则在火狐下会有鬼
          if (browserReport.unifiedPlan) {
              const tracks = [];
              for (const consumer of consumers) {
                  const track = await this.addConsumerTrack(consumer);
                  tracks.push(track);
              }
              return tracks;
          }
          log.log("add consumers", consumers);
          const consumerInfoList = [];
          const _consumerInfoArray = Array.from(this._consumerInfos.values());
          for (const consumer of consumers) {
              const info = _consumerInfoArray.find(i => i.consumerId === consumer.id);
              if (info && !info.closed) {
                  consumerInfoList.push(info);
              }
              else {
                  const newInfo = this.genNewConsumerInfo(consumer);
                  if (browserReport.unifiedPlan) {
                      // 递增 mid, plan-b 模式下不会使用到这个参数
                      const mid = _consumerInfoArray.length.toString();
                      newInfo.mid = mid;
                      this._consumerInfos.set(mid, newInfo);
                  }
                  else {
                      this._consumerInfos.set(consumer.id, newInfo);
                  }
                  consumerInfoList.push(newInfo);
              }
          }
          return Promise.resolve()
              .then(() => {
              // createremoteSdp
              const remoteSdp = this._remoteSdp.createRemoteOffer(Array.from(this._consumerInfos.values()));
              const offer = { type: "offer", sdp: remoteSdp };
              log.debug("subscribe: set remote offer", offer);
              return this._pc.setRemoteDescription(offer);
          })
              .then(() => {
              if (browserReport.unifiedPlan) {
                  return this._pc.createAnswer();
              }
              return this._pc.createAnswer();
          })
              .then(answer => {
              log.debug("subscribe, set local answer", answer);
              return this._pc.setLocalDescription(answer);
          })
              // .then(() => {
              //   if (!this._transportUpdated) { return this._updateTransport(); }
              // })
              .then(() => this._pcReady)
              .then(() => {
              for (let i = 0; i < consumerInfoList.length; i += 1) {
                  const consumerInfo = consumerInfoList[i];
                  const consumer = consumers[i];
                  if (consumer.track)
                      continue;
                  if (browserReport.unifiedPlan) {
                      const transceiver = this._pc.getTransceivers().find(transceiver => {
                          if (!transceiver.receiver.track) {
                              return false;
                          }
                          if (transceiver.receiver.track.id === consumerInfo.trackId || transceiver.mid === consumerInfo.mid) {
                              return true;
                          }
                          return false;
                      });
                      if (transceiver) {
                          consumer.track = transceiver.receiver.track;
                      }
                  }
                  else {
                      // chrome 55 以下不支持 getReceivers，使用 getRemoteStreams
                      if (browserReport.getReceivers) {
                          const receiver = this._pc.getReceivers()
                              .find(rtpReceiver => {
                              const { track } = rtpReceiver;
                              if (!track) {
                                  return false;
                              }
                              if (consumerInfo.trackId === track.id) {
                                  return true;
                              }
                              return false;
                          });
                          if (receiver) {
                              consumer.track = receiver.track;
                          }
                      }
                      else {
                          const stream = this._pc.getRemoteStreams().find((s) => s.id === consumerInfo.streamId);
                          if (stream) {
                              consumer.track = stream.getTrackById(consumerInfo.trackId);
                          }
                      }
                  }
                  if (!consumer.track) {
                      throw UNEXPECTED_ERROR("remote track not found");
                  }
                  log.log("subscribe: get new track", consumer.track);
              }
              return consumers.map(c => c.track);
          });
      }
      genNewConsumerInfo(consumer) {
          const _consumerInfoArray = Array.from(this._consumerInfos.values());
          const encoding = consumer.rtpParameters.encodings[0];
          const cname = consumer.rtpParameters.rtcp.cname;
          const mid = _consumerInfoArray.length.toString();
          const newInfo = {
              kind: consumer.kind,
              streamId: `mid${mid}-stream-${consumer.id}`,
              trackId: `mid${mid}-${consumer.kind}-${encoding.ssrc}`,
              ssrc: encoding.ssrc,
              rtxSsrc: encoding.rtx ? encoding.rtx.ssrc : undefined,
              cname: cname,
              consumerId: consumer.id,
              closed: false,
          };
          return newInfo;
      }
      async addConsumerTrack(consumer) {
          log.log("add consumer", consumer);
          let consumerInfo = null;
          const _consumerInfoArray = Array.from(this._consumerInfos.values());
          const info = _consumerInfoArray.find(i => i.consumerId === consumer.id);
          if (info && !info.closed) {
              consumerInfo = info;
          }
          else {
              const newInfo = this.genNewConsumerInfo(consumer);
              if (browserReport.unifiedPlan) {
                  // 递增 mid, plan-b 模式下不会使用到这个参数
                  const mid = _consumerInfoArray.length.toString();
                  newInfo.mid = mid;
                  this._consumerInfos.set(mid, newInfo);
              }
              else {
                  this._consumerInfos.set(consumer.id, newInfo);
              }
              consumerInfo = newInfo;
          }
          return Promise.resolve()
              .then(() => {
              // createremoteSdp
              const remoteSdp = this._remoteSdp.createRemoteOffer(Array.from(this._consumerInfos.values()));
              const offer = { type: "offer", sdp: remoteSdp };
              log.debug("subscribe: set remote offer", offer);
              return this._pc.setRemoteDescription(offer);
          })
              .then(() => {
              if (browserReport.unifiedPlan) {
                  return this._pc.createAnswer();
              }
              return this._pc.createAnswer();
          })
              .then(answer => {
              log.debug("subscribe, set local answer", answer);
              return this._pc.setLocalDescription(answer);
          })
              // .then(() => {
              //   if (!this._transportUpdated) { return this._updateTransport(); }
              // })
              .then(() => this._pcReady)
              .then(() => {
              let newTrack = null;
              if (browserReport.unifiedPlan && browserReport.supportTransceivers && !!consumer && !!consumerInfo) {
                  const transceiver = this._pc.getTransceivers().find(transceiver => {
                      if (!transceiver.receiver.track) {
                          return false;
                      }
                      if (transceiver.receiver.track.id === consumerInfo.trackId || transceiver.mid === consumerInfo.mid) {
                          consumer.track = transceiver.receiver.track;
                          return true;
                      }
                      return false;
                  });
                  if (transceiver) {
                      newTrack = transceiver.receiver.track;
                  }
              }
              else if (!!consumer && !!consumerInfo) {
                  const receiver = this._pc.getReceivers()
                      .find(rtpReceiver => {
                      const { track } = rtpReceiver;
                      if (!track) {
                          return false;
                      }
                      if (consumerInfo.trackId === track.id) {
                          consumer.track = track;
                          return true;
                      }
                      return false;
                  });
                  if (receiver) {
                      newTrack = receiver.track;
                  }
              }
              if (!newTrack && !!consumer) {
                  throw UNEXPECTED_ERROR("remote track not found");
              }
              log.log("subscribe: get new track", newTrack);
              return newTrack;
          });
      }
      removeConsumerTracks(consumers) {
          log.log("remove consumer", consumers);
          let needToUpdateOffer = false;
          for (const consumer of consumers) {
              const info = Array.from(this._consumerInfos.values()).find(i => i.consumerId === consumer.id && !i.closed);
              if (!info) {
                  log.log(`can not find unpublish track target, ignore`);
                  continue;
              }
              needToUpdateOffer = true;
              /**
               * 对于 unified-plan 不能直接删除 consumer
               * 因为重协商必须保证前后 mid 只增不减，这里将 consumer 置为 closed
               * 使得生成 sdp 的时候改 mid 不会带上 ssrc 和 ext，也就不会产生订阅
               */
              if (browserReport.unifiedPlan) {
                  consumer.track = null;
                  info.closed = true;
              }
              else {
                  this._consumerInfos.delete(consumer.id);
              }
          }
          if (!needToUpdateOffer)
              return Promise.resolve();
          return Promise.resolve()
              .then(() => {
              const remoteSdp = this._remoteSdp.createRemoteOffer(Array.from(this._consumerInfos.values()));
              const offer = { type: "offer", sdp: remoteSdp };
              log.log("unsubscribe set remote offer", offer);
              return this._pc.setRemoteDescription(offer);
          })
              .then(() => {
              return this._pc.createAnswer();
          })
              .then(answer => {
              log.log("unsubscribe set local answer", answer);
              return this._pc.setLocalDescription(answer);
          });
      }
      restartICE(iceParameters, iceCandidates) {
          log.log("recv restart ice");
          this._isRestartingICE = true;
          return Promise.resolve()
              .then(() => {
              return this._remoteSdp.updateICEData(iceParameters, iceCandidates);
          })
              .then(() => {
              const remoteSdp = this._remoteSdp.createRemoteOffer(Array.from(this._consumerInfos.values()));
              const offer = { type: "offer", sdp: remoteSdp };
              return this._pc.setRemoteDescription(offer);
          })
              .then(() => {
              return this._pc.createAnswer();
          })
              .then(answer => {
              this._pc.setLocalDescription(answer);
          });
      }
      async setupTransport(trackIds) {
          if (this._transportCreated)
              return await this._pcReady;
          const transportRemoteParameters = await this.safeEmitAsPromise("@needsubpc", trackIds);
          this.pcid = transportRemoteParameters.pcid;
          this._transportCreated = true;
          this._pcReady = this.getReady(transportRemoteParameters);
          log.log("init subscribe, get transport remote", transportRemoteParameters);
          await this._remoteSdp.setTransportRemoteParameters(transportRemoteParameters);
          return transportRemoteParameters;
      }
  }
  function getHandler(direction, extendedRtpCapabilities, signaling, settings) {
      // let rtpParametersByKind;
      switch (direction) {
          case "send":
              {
                  return new SendHandler(extendedRtpCapabilities, signaling, settings);
              }
          case "recv": {
              return new RecvHandler(extendedRtpCapabilities, signaling, settings);
          }
      }
  }

  class TaskQueue extends EventEmitter {
      constructor(name) {
          super();
          // Closed flag.
          this._closed = false;
          // Busy running a command.
          this._busy = false;
          // Queue for pending commands. Each command is an Object with method,
          // resolve, reject, and other members (depending the case).
          this._queue = [];
          this.name = name || "TaskQueue";
      }
      close() {
          this._closed = true;
      }
      push(method, data) {
          log.debug(`${this.name} push()`, method, data);
          return new Promise((resolve, reject) => {
              const queue = this._queue;
              // Append command to the queue.
              queue.push({ method, data, resolve, reject });
              this._handlePendingCommands();
          });
      }
      _handlePendingCommands() {
          if (this._busy) {
              return;
          }
          const queue = this._queue;
          // Take the first command.
          const command = queue[0];
          if (!command) {
              return;
          }
          this._busy = true;
          // Execute it.
          this._handleCommand(command)
              .then(() => {
              this._busy = false;
              // Remove the first command (the completed one) from the queue.
              queue.shift();
              // And continue.
              this._handlePendingCommands();
          });
      }
      _handleCommand(command) {
          log.debug(`${this.name} _handleCommand() `, command.method, command.data);
          if (this._closed) {
              command.reject(new InvalidStateError("closed"));
              return Promise.resolve();
          }
          const promiseHolder = { promise: null };
          this.emit("exec", command, promiseHolder);
          return Promise.resolve()
              .then(() => {
              return promiseHolder.promise;
          })
              .then(result => {
              log.debug(`${this.name} _handleCommand() | command succeeded`, command.method);
              if (this._closed) {
                  command.reject(new InvalidStateError("closed"));
                  return;
              }
              // Resolve the command with the given result (if any).
              command.resolve(result);
          })
              .catch(error => {
              log.warning(`${this.name} _handleCommand() | command failed [method:%s]: %o`, command.method, error);
              // Reject the command with the error.
              command.reject(error);
          });
      }
  }

  var TaskCommandEnum;
  (function (TaskCommandEnum) {
      TaskCommandEnum["SEND_TRACKS"] = "@transport:send-tracks";
      TaskCommandEnum["RESTART_SEND_ICE"] = "@transport:send-restart-ice";
      TaskCommandEnum["REMOVE_TRACKS"] = "@transport:remove-tracks";
      TaskCommandEnum["INIT_RECV"] = "@transport:init-recv";
      TaskCommandEnum["RESTART_RECV_ICE"] = "@transport:recv-restart-ice";
      TaskCommandEnum["ADD_CONUMERS"] = "@transport:add-consumers";
      TaskCommandEnum["REMOVE_CONSUMERS"] = "@transport:remove-consumers";
  })(TaskCommandEnum || (TaskCommandEnum = {}));
  class ConnectionTransport extends EnhancedEventEmitter {
      constructor(rtpcap, signaling) {
          super();
          this.sendCommandQueue = new TaskQueue("SendQueue");
          this.recvCommandQueue = new TaskQueue("RecvQueue");
          /**
           * sub-pc 创建单独走一个 queue
           */
          this.recvInitCommandQueue = new TaskQueue("RecvInitQueue");
          this.sendTrackQueue = [];
          this.consumerQueue = [];
          this._publishTracks = new Map();
          this.extendedRtpCapabilities = rtpcap;
          this.signaling = signaling;
          this.sendHandler = getHandler("send", rtpcap, signaling, {});
          this.recvHandler = getHandler("recv", rtpcap, signaling, {});
          this.handleSendHandler();
          this.handleRecvHandler();
          this.sendCommandQueue.on("exec", this.handleSendCommandTask.bind(this));
          this.recvCommandQueue.on("exec", this.handleRecvCommandTask.bind(this));
          this.recvInitCommandQueue.on("exec", this.handleRecvInitCommandTask.bind(this));
          this.initSubPcPromise = new Promise(resolve => {
              this.initSubPcPromiseResolve = resolve;
          });
      }
      get publishTracks() {
          return Array.from(this._publishTracks.values());
      }
      resolveInitSubPcPromise() {
          if (!this.initSubPcPromiseResolve)
              return;
          this.initSubPcPromiseResolve();
          this.initSubPcPromiseResolve = undefined;
      }
      handleSendHandler() {
          this.sendHandler.on("@needpubpc", (sdp, tracks, cb, errcb) => {
              this.safeEmitAsPromise("@needpubpc", sdp, tracks).then(cb).catch(errcb);
          })
              .on("@connectionstatechange", (state) => {
              log.log("pubpc connectionstatechange", state);
              switch (state) {
                  case "remote-disconnected":
                  case "closed":
                  case "failed": {
                      if (this.signaling.state === SignalingState.OPEN) {
                          this.reconnectProducer();
                      }
                      else {
                          this.sendHandler.close();
                      }
                      break;
                  }
                  case "disconnected": {
                      if (this.sendHandler._isRestartingICE || !this.sendHandler.pcid)
                          return;
                      if (this.signaling.state === SignalingState.OPEN) {
                          this.restartSendICE(this.sendHandler.pcid);
                      }
                      else {
                          this.signaling.once("@signalingauth", (data) => {
                              if (this.sendHandler.getCurrentIceConnectionState() !== "disconnected")
                                  return;
                              this.extendedRtpCapabilities = data.rtpcaps;
                              this.restartSendICE(this.sendHandler.pcid);
                          });
                      }
                      break;
                  }
                  default:
                      break;
              }
          })
              .on("@needpubtracks", (targetTracks, sdp, cb, errcb) => {
              const publishTrackData = targetTracks.map(transferTrackToPublishTrack);
              this.signaling.request("pub-tracks", { tracks: publishTrackData, sdp })
                  .then((data) => {
                  switch (data.code) {
                      case 0:
                          break;
                      case 10052:
                          return errcb(SERVER_UNAVAILABLE());
                      // pc 断开，重新走 pub-pc 的过程
                      case 10061:
                          this.reconnectProducer();
                          return errcb(PUBLISH_ERROR(10061, data.error));
                      default:
                          return errcb(PUBLISH_ERROR(data.code, data.error));
                  }
                  for (const track of data.tracks) {
                      if (!track.status) {
                          errcb(PUBLISH_ERROR(data.code, data.error));
                          return;
                      }
                  }
                  cb(data);
              }, errcb);
          })
              .on("@needunpubtracks", (targetPCTracks, cb, errcb) => {
              this.signaling.request("unpub-tracks", {
                  tracks: targetPCTracks.map(t => ({ trackid: t.trackId })),
              })
                  .then((data) => {
                  cb(data);
              });
          });
      }
      async sendTracks(tracks) {
          if (tracks.length === 0)
              return Promise.resolve();
          return this.sendCommandQueue.push(TaskCommandEnum.SEND_TRACKS, tracks);
      }
      removeTracks(tracks) {
          if (tracks.length === 0)
              return Promise.resolve();
          return this.sendCommandQueue.push(TaskCommandEnum.REMOVE_TRACKS, tracks);
      }
      async restartSendICE(pcid) {
          if (!browserReport.supportRestartICE)
              return Promise.resolve(this.reconnectProducer());
          return this.sendCommandQueue.push(TaskCommandEnum.RESTART_SEND_ICE, pcid);
      }
      handleSendCommandTask(command, ph) {
          switch (command.method) {
              case TaskCommandEnum.SEND_TRACKS: {
                  ph.promise = this._execAddProducerTracks(command.data);
                  return;
              }
              case TaskCommandEnum.REMOVE_TRACKS: {
                  ph.promise = this._execRemoveTracks(command.data);
                  return;
              }
              case TaskCommandEnum.RESTART_SEND_ICE: {
                  ph.promise = this._execRestartSendICE(command.data);
                  return;
              }
          }
      }
      /**
       * 将 Track 添加到 transport 的 PCTrack 列表中
       * 将这一步抽成同步方法是为了保证多个 publish 操作同时触发时
       * 上层能够正确监测到非法订阅操作并及时抛出错误
       */
      addTrackToPublishTracks(tracks) {
          const pcTracks = tracks.map(t => new PCTrack(this, "send", t));
          for (const pcTrack of pcTracks) {
              this._publishTracks.set(pcTrack.track.mediaTrack.id, pcTrack);
          }
          return pcTracks;
      }
      /**
       * 当发布任务遇到无法重试的失败时清理添加的 Tracks
       */
      removeTrackFromPublishTracks(tracks) {
          for (const track of tracks) {
              this._publishTracks.delete(track.mediaTrack.id);
          }
      }
      async _execAddProducerTracks(pcTracks) {
          const data = await this.sendHandler.addProducerTracks(pcTracks.map(t => t.track));
          for (const pcTrack of pcTracks) {
              const trackData = getElementFromArray(data.tracks, "localid", pcTrack.track.mediaTrack.id);
              if (trackData) {
                  pcTrack.addTrackId(trackData.trackid);
                  pcTrack.track.setInfo({ versionid: trackData.versionid });
                  pcTrack.track.resetStats();
              }
          }
          pcTracks.map(p => p.connectStatus = exports.TrackConnectStatus.Connect);
          return data;
      }
      _execRemoveTracks(pcTracks) {
          this.removeTrackFromPublishTracks(pcTracks.map(p => p.track));
          pcTracks.map(p => p.release());
          return this.sendHandler.removeProducerTracks(pcTracks);
      }
      async _execRestartSendICE(pcid) {
          this.sendHandler._isRestartingICE = true;
          const res = await this.signaling.request("pubpc-restart", { pcid });
          if (res.code !== 0) {
              this.sendHandler._isRestartingICE = false;
              log.debug("restart ice faild", res.code, res.error);
              this.reconnectProducer();
              return;
          }
          try {
              await this.sendHandler.restartICE(res.iceParameters, res.iceCandidates);
              this.sendHandler._isRestartingICE = false;
          }
          catch (e) {
              log.debug("restart ice faild", res.code, res.error);
              this.sendHandler._isRestartingICE = false;
              this.reconnectProducer();
          }
      }
      reconnectProducer() {
          this.resetSendCommandQueue();
          this.sendHandler.close();
          const targetPCTracks = this.publishTracks;
          this.sendHandler = getHandler("send", this.extendedRtpCapabilities, this.signaling, {});
          this.handleSendHandler();
          targetPCTracks.forEach(t => {
              t.connectStatus = exports.TrackConnectStatus.Connecting;
          });
          this.emit("@needrepub", targetPCTracks);
      }
      handleRecvHandler() {
          this.recvHandler.on("@needsubpc", (d, cb, errcb) => {
              this.safeEmitAsPromise("@needsubpc", d).then(cb, errcb);
          })
              .on("@connectionstatechange", (state) => {
              log.log("sub pc connection state change", state);
              switch (state) {
                  case "remote-disconnected":
                  case "closed":
                  case "failed": {
                      if (this.signaling.state === SignalingState.OPEN) {
                          this.resetRecvHandler();
                      }
                      else {
                          // 置为 close，等待信令重连完成后统一重新创建
                          this.recvHandler.close();
                      }
                      break;
                  }
                  case "disconnected": {
                      if (this.recvHandler._isRestartingICE || !this.recvHandler.pcid)
                          return;
                      if (this.signaling.state === SignalingState.OPEN) {
                          this.restartRecvICE(this.recvHandler.pcid);
                      }
                      else {
                          this.signaling.once("@signalingauth", (data) => {
                              if (this.recvHandler.getCurrentIceConnectionState() !== "disconnected")
                                  return;
                              this.extendedRtpCapabilities = data.rtpcaps;
                              this.restartRecvICE(this.recvHandler.pcid);
                          });
                      }
                      break;
                  }
                  default: {
                      break;
                  }
              }
          });
      }
      appendConsumer(consumer) {
          this.consumerQueue.push(consumer);
      }
      async addConsumers() {
          const consumers = this.consumerQueue;
          this.consumerQueue = [];
          return this.recvCommandQueue.push(TaskCommandEnum.ADD_CONUMERS, consumers);
      }
      initRecvHandler(trackIds) {
          return this.recvInitCommandQueue.push(TaskCommandEnum.INIT_RECV, trackIds);
      }
      async removeConsumers(consumers) {
          await this.recvCommandQueue.push(TaskCommandEnum.REMOVE_CONSUMERS, consumers);
      }
      async restartRecvICE(pcid) {
          if (!browserReport.supportRestartICE)
              return this.resetRecvHandler();
          return this.recvCommandQueue.push(TaskCommandEnum.RESTART_RECV_ICE, pcid);
      }
      async _removeConsumers(consumers) {
          await this.recvHandler.removeConsumerTracks(consumers);
      }
      async _initRecvHandler(trackIds) {
          if (!this.recvHandler.isPcReady) {
              return await this.recvHandler.setupTransport(trackIds);
          }
          await this.initSubPcPromise;
          return null;
      }
      async _addConsumers(consumers) {
          if (consumers.length === 0) {
              return Promise.resolve([]);
          }
          const tracks = await this.recvHandler.addConsumerTracks(consumers);
          return tracks;
      }
      async _execRestartRecvICE(pcid) {
          this.recvHandler._isRestartingICE = true;
          const res = await this.signaling.request("subpc-restart", { pcid });
          if (res.code !== 0) {
              this.recvHandler._isRestartingICE = false;
              log.debug("restart ice faild", res.code, res.error);
              this.resetRecvHandler();
              return;
          }
          try {
              await this.recvHandler.restartICE(res.iceParameters, res.iceCandidates);
              this.recvHandler._isRestartingICE = false;
          }
          catch (e) {
              this.recvHandler._isRestartingICE = false;
              log.debug("restart ice faild", res.code, res.error);
              this.resetRecvHandler();
          }
      }
      handleRecvCommandTask(command, ph) {
          switch (command.method) {
              case TaskCommandEnum.ADD_CONUMERS: {
                  ph.promise = this._addConsumers(command.data);
                  return;
              }
              case TaskCommandEnum.REMOVE_CONSUMERS: {
                  ph.promise = this._removeConsumers(command.data);
                  return;
              }
              case TaskCommandEnum.RESTART_RECV_ICE: {
                  ph.promise = this._execRestartRecvICE(command.data);
                  return;
              }
          }
      }
      handleRecvInitCommandTask(command, ph) {
          switch (command.method) {
              case TaskCommandEnum.INIT_RECV: {
                  ph.promise = this._initRecvHandler(command.data);
                  return;
              }
          }
      }
      resetSendCommandQueue() {
          log.log("reset send queue");
          this.sendCommandQueue = new TaskQueue("SendQueue");
          this.sendCommandQueue.on("exec", this.handleSendCommandTask.bind(this));
      }
      resetRecvCommandQueue() {
          log.log("reset recv queue");
          this.recvCommandQueue = new TaskQueue("RecvQueue");
          this.recvInitCommandQueue = new TaskQueue("RecvInitQueue");
          this.recvCommandQueue.on("exec", this.handleRecvCommandTask.bind(this));
          this.recvInitCommandQueue.on("exec", this.handleRecvInitCommandTask.bind(this));
      }
      resetRecvHandler() {
          this.resetRecvCommandQueue();
          // 重置 RecvHandler 时外层 track 需要做一些操作
          this.emit("@needresetrecv");
          this.recvHandler.close();
          this.recvHandler = getHandler("recv", this.extendedRtpCapabilities, this.signaling, {});
          this.initSubPcPromise = new Promise(resolve => {
              this.initSubPcPromiseResolve = resolve;
          });
          this.handleRecvHandler();
          // 重连Consumer需要对比服务端的变化，抛出事件
          this.emit("@needresub");
      }
      release() {
          this.recvHandler.close();
          this.sendHandler.close();
          this.publishTracks.forEach(t => t.release());
      }
  }

  (function (RoomState) {
      RoomState[RoomState["Idle"] = 0] = "Idle";
      RoomState[RoomState["Connecting"] = 1] = "Connecting";
      RoomState[RoomState["Connected"] = 2] = "Connected";
      RoomState[RoomState["Reconnecting"] = 3] = "Reconnecting";
  })(exports.RoomState || (exports.RoomState = {}));
  const DEFAULT_CONFIG = {
      transportPolicy: "forceUdp",
  };
  class QNRTCCore extends EventEmitter {
      constructor(config = DEFAULT_CONFIG) {
          super();
          this._trackInfo = [];
          /**
           * 所有订阅的 PCTrack，需要注意的是这些 PCTrack 可能有 2 种状态
           * 1. Connecting 表示正在进行连接过程
           * 2. Conncted 表示连接已经建立（subscribe 已经 resolve）
           */
          this.subscribeTracks = [];
          // userid -> User
          this._users = new Map();
          this._roomState = exports.RoomState.Idle;
          this.mergeJobMerger = {};
          this.defaultMergeJobTracks = [];
          this.mergeJobTracks = {};
          this._publish = (tracks, isReconnect) => new Promise(async (resolve, reject) => {
              if (this.roomState !== exports.RoomState.Connected) {
                  reject(UNEXPECTED_ERROR("not connected to the room, please run joinRoom first"));
                  return;
              }
              if (tracks.length === 0) {
                  resolve();
              }
              tracks.forEach(t => t.userId = this.userId);
              const transport = this.connectionTransport;
              const signaling = this.signaling;
              let pcTracks;
              if (isReconnect) {
                  const localIds = tracks.map(t => t.mediaTrack.id);
                  pcTracks = transport.publishTracks.filter(t => localIds.indexOf(t.track.mediaTrack.id) !== -1);
              }
              else {
                  const currentLocalIds = transport.publishTracks.map(t => t.track.mediaTrack.id);
                  const targetTracks = tracks.filter(t => currentLocalIds.indexOf(t.mediaTrack.id) === -1);
                  // 这里表示传入的 track 包含已经发布过的 track，直接抛出错误，简化逻辑
                  if (targetTracks.length !== tracks.length) {
                      reject(UNEXPECTED_ERROR("there are already published tracks in the provided tracks"));
                      return;
                  }
                  pcTracks = transport.addTrackToPublishTracks(tracks);
              }
              log.debug("start publish", pcTracks, isReconnect);
              if (!isReconnect) {
                  const connectPromise = pcTracks.map(p => p.startConnect());
                  Promise.all(connectPromise).then(() => resolve()).catch(() => {
                      // 表示调用了 unpublish 中止了发布
                      reject(SUB_PUB_ABORT());
                  });
              }
              try {
                  await transport.sendTracks(pcTracks);
                  signaling.sendWsMsg("mute-tracks", {
                      tracks: pcTracks.map(track => ({ trackid: track.trackId, muted: !!track.track.info.muted })),
                  });
                  const user = getElementFromArray(this.users, "userId", this.userId);
                  if (user) {
                      user.addTracks(pcTracks.map(p => p.track));
                      user.addPublishedTrackInfo(pcTracks.map(t => ({
                          trackId: t.trackId,
                          muted: !!t.track.info.muted,
                          kind: t.track.info.kind,
                          tag: t.track.info.tag,
                          userId: this.userId,
                          versionid: t.track.info.versionid,
                      })));
                  }
                  tracks.forEach(t => {
                      t.on("@get-stats", (lastReport, cb, errorcb) => {
                          if (!this.connectionTransport)
                              return cb(defaultTrackStatsReport());
                          this.connectionTransport.sendHandler.getStats(t.mediaTrack, lastReport)
                              .then(cb, errorcb);
                      });
                  });
                  this.getAllMerger().forEach(m => m.controller.onAddTracks(tracks.map(t => t.info)));
              }
              catch (e) {
                  if (e instanceof QNRTCError) {
                      switch (e.code) {
                          case 10061:
                          case 30001: {
                              return;
                          }
                          case 10052: {
                              log.warning(e, "republish");
                              setTimeout(() => this._publish(tracks, true), 1000);
                              return;
                          }
                          default: {
                              transport.removeTrackFromPublishTracks(tracks);
                              reject(e);
                          }
                      }
                  }
                  else {
                      log.warning(e, "republish");
                      setTimeout(() => this._publish(tracks, true), 1000);
                  }
              }
          });
          this._subscribe = (trackIds, isReconnect, strictMode = false) => new Promise(async (resolve, reject) => {
              if (this.roomState !== exports.RoomState.Connected) {
                  reject(UNEXPECTED_ERROR("can not connected to the room, please joinRoom first"));
                  return;
              }
              if (trackIds.length === 0) {
                  resolve([]);
                  return;
              }
              log.debug("subscribe", trackIds, isReconnect);
              const availableTrackInfo = this._trackInfo.filter(info => trackIds.includes(info.trackid));
              if (availableTrackInfo.length !== trackIds.length) {
                  reject(SUB_ERROR(10041, `can not find track in room ${trackIds}`));
                  return;
              }
              let pcTracks;
              const transport = this.connectionTransport;
              const signaling = this.signaling;
              if (isReconnect) {
                  pcTracks = this.subscribeTracks.filter(t => trackIds.indexOf(t.trackId) !== -1);
              }
              else {
                  const currentTrackIds = this.subscribeTracks.map(t => t.trackId);
                  const targetTrackInfo = availableTrackInfo.filter(t => !currentTrackIds.includes(t.trackid));
                  pcTracks = targetTrackInfo.map(t => new PCTrack(transport, "recv", undefined, t.trackid));
                  this.subscribeTracks = this.subscribeTracks.concat(pcTracks);
              }
              log.log("sub tracks", pcTracks);
              try {
                  if (!isReconnect) {
                      const connectPromise = pcTracks.map(t => t.startConnect());
                      Promise.all(connectPromise).then(() => resolve(pcTracks.map(p => p.track))).catch(() => {
                          // 表示调用 unsubscribe 中止了订阅
                          reject(SUB_PUB_ABORT());
                      });
                  }
                  let data = await transport.initRecvHandler(pcTracks.map(t => t.trackId));
                  if (!data) {
                      data = await signaling.request("sub-tracks", { tracks: pcTracks.map(track => ({ trackid: track.trackId })) });
                  }
                  log.log("get sub res data", data);
                  switch (data.code) {
                      case 0:
                          break;
                      case 10052:
                          throw SERVER_UNAVAILABLE();
                      case 10062:
                          transport.resetRecvHandler();
                          throw SUB_ERROR(10062, data.error);
                      default:
                          throw SUB_ERROR(data.code, data.error);
                  }
                  const successTracks = data.tracks.filter((t) => !!t.status);
                  const faildTrackIds = data.tracks.filter((t) => !t.status).map((t) => t.trackid);
                  // 在严格模式下，直接抛出错误，取消之后的订阅流程
                  if (successTracks.length < data.tracks.length && strictMode) {
                      throw SUB_ERROR(10041, `can not find target track id: ${faildTrackIds.join(" ")}`);
                  }
                  if (successTracks && !strictMode) {
                      log.debug(`can not find target track id: ${faildTrackIds.join("")}, continue`);
                      const removedPcTracks = lodash_remove(pcTracks, t => faildTrackIds.indexOf(t.trackId) !== -1);
                      lodash_remove(this.subscribeTracks, t => faildTrackIds.indexOf(t.trackId) !== -1);
                      removedPcTracks.map(t => t.release());
                  }
                  data.tracks = successTracks;
                  // 先检查后设置
                  for (const track of data.tracks || []) {
                      const pcTrack = pcTracks.find(t => t.trackId === track.trackid);
                      const info = availableTrackInfo.find(t => t.trackid === track.trackid);
                      if (!pcTrack || !info)
                          continue;
                      const rtpparams = track.rtpparams;
                      pcTrack.appendConsumner(rtpparams, info.kind);
                  }
                  await transport.addConsumers();
                  transport.resolveInitSubPcPromise();
                  for (const pcTrack of pcTracks) {
                      const { consumer } = pcTrack;
                      if (!consumer || !consumer.track)
                          continue;
                      const t = consumer.track;
                      let track = pcTrack.track;
                      const info = availableTrackInfo.find(t => t.trackid === consumer.id);
                      if (!info)
                          continue;
                      if (!track) {
                          if (t.kind === "audio") {
                              track = new AudioTrack(t, info.playerid, "remote");
                              track.initAudioManager();
                          }
                          else {
                              track = new Track(t, info.playerid, "remote");
                          }
                      }
                      else {
                          track.resume(t);
                      }
                      track.setInfo({
                          trackId: info.trackid, userId: info.playerid, tag: info.tag,
                          kind: info.kind, muted: info.muted, versionid: info.versionid,
                      });
                      track.setMaster(info.master);
                      track.removeAllListeners("@get-stats");
                      track.removeAllListeners("@ended");
                      track.on("@get-stats", (lastReport, cb, errcb) => {
                          if (!this.connectionTransport)
                              return cb(defaultTrackStatsReport());
                          this.connectionTransport.recvHandler.getStats(track.mediaTrack, lastReport)
                              .then(cb, errcb);
                      });
                      // 如果远端 track ended，重新订阅
                      track.once("@ended", async () => {
                          if (!track || !track.info.trackId)
                              return;
                          log.warning("remote track ended, try to resubscribe");
                          try {
                              await this._unsubscribe([track.info.trackId], true);
                          }
                          catch (e) { }
                          await this._subscribe([track.info.trackId], true);
                      });
                      pcTrack.track = track;
                      const user = this.users.find(u => u.userId === info.playerid);
                      if (user) {
                          user.addTracks([track]);
                      }
                  }
                  pcTracks.forEach(t => t.connectStatus = exports.TrackConnectStatus.Connect);
              }
              catch (e) {
                  log.log(e);
                  const consumers = [];
                  pcTracks.forEach(t => {
                      if (t.consumer) {
                          consumers.push(t.consumer);
                      }
                  });
                  await transport.removeConsumers(consumers);
                  if (e instanceof QNRTCError) {
                      switch (e.code) {
                          case 10062:
                          case 30001: {
                              return;
                          }
                          case 10052: {
                              log.warning(e, "resubscribe");
                              setTimeout(() => this._subscribe(trackIds, true), 1000);
                              return;
                          }
                          default: {
                              lodash_remove(this.subscribeTracks, t => trackIds.indexOf(t.trackId) !== -1);
                              reject(e);
                          }
                      }
                  }
                  else {
                      log.warning(e, "resubscribe");
                      setTimeout(() => this._subscribe(trackIds, true), 1000);
                      return;
                  }
              }
              resolve(pcTracks.map(p => p.track));
          });
          this.config = config;
          log.log("version", version);
          log.log("browser report", browserReport, browser);
      }
      get users() {
          return Array.from(this._users.values());
      }
      /**
       * 房间内所有 Track 的信息列表，包括未订阅的，用 TrackBaseInfo 表示
       */
      get trackInfoList() {
          return this._trackInfo.map(transferSignalingTrackToTrackBaseInfo);
      }
      get roomState() {
          return this._roomState;
      }
      set roomState(state) {
          if (this._roomState !== state) {
              this._roomState = state;
              log.debug("roomState change", this._roomState);
              this.emit("room-state-change", this._roomState);
          }
      }
      async joinRoomWithToken(roomToken, userData) {
          if (this.roomState !== exports.RoomState.Reconnecting) {
              if (this.roomState !== exports.RoomState.Idle) {
                  throw UNEXPECTED_ERROR("roomState is not idle! Do not repeat join room, please run leaveRoom first");
              }
              this.roomState = exports.RoomState.Connecting;
          }
          try {
              this.roomToken = roomToken;
              this.userData = userData;
              const roomAccess = getRoomAccessFromToken(roomToken);
              this.userId = roomAccess.userId;
              this.roomName = roomAccess.roomName;
              this.appId = roomAccess.appId;
              log.log("join room, token:", roomToken);
              log.debug(`join room, roomName: ${this.roomName}, userId: ${this.userId}`);
              if (!this.roomName.match(/^[a-zA-Z0-9_-]{3,64}$/)) {
                  this.roomState = exports.RoomState.Idle;
                  throw UNEXPECTED_ERROR("invalid roomname. roomname must match /^[a-zA-Z0-9_-]{3,64}$/");
              }
              if (!this.userId.match(/^[a-zA-Z0-9_-]{3,50}$/)) {
                  this.roomState = exports.RoomState.Idle;
                  throw UNEXPECTED_ERROR("invalid userId. userId must match /^[a-zA-Z0-9_-]{3,50}$/");
              }
              try {
                  this.accessToken = await getAccessToken(roomAccess, roomToken);
              }
              catch (e) {
                  throw e;
              }
              return await this.joinRoomWithAccess(this.accessToken);
          }
          catch (e) {
              this.roomState = exports.RoomState.Idle;
              throw e;
          }
      }
      async joinRoomWithAccess(accessToken) {
          const accessPayload = getPayloadFromJwt(accessToken);
          const { capsdp } = await getClientCapabilitiesSdp();
          if (this._roomState === exports.RoomState.Idle) {
              throw UNEXPECTED_ERROR("roomState is idle, maybe because you left the room.");
          }
          const signaling = new SignalingWS(accessPayload.signalingurl2, accessToken, capsdp, this.userData);
          signaling
              .on("@error", this.handleDisconnect.bind(this))
              .on("@ws-state-change", (prev, curr) => {
              switch (curr) {
                  case SignalingState.CONNECTING:
                      if (this.roomState === exports.RoomState.Connected) {
                          this.roomState = exports.RoomState.Reconnecting;
                      }
                      else if (this.roomState !== exports.RoomState.Reconnecting) {
                          this.roomState = exports.RoomState.Connecting;
                      }
                      break;
                  default:
                      break;
              }
          })
              .on("@needupdateaccesstoken", (cb, errcb) => {
              this.updateAccessToken().then(cb).catch(errcb);
          })
              /*
              .on("send", (msgType: string, data: string) => {
                if (msgType === "pong") return;
                console.log("send", msgType, data);
              })
              .on("receive", (msgType: string, data: string) => {
                if (msgType === "ping") return;
                console.log("receive", msgType, data);
              })
              */
              .on("on-player-in", this.handlePlayerIn.bind(this))
              .on("on-player-out", this.handlePlayerOut.bind(this))
              .on("on-add-tracks", (d) => {
              this.filterSignalTracks(d);
              this.handleAddTracks(d);
          })
              .on("on-remove-tracks", (d) => {
              this.filterSignalTracks(d);
              this.handleRemoveTracks(d);
          })
              .on("mute-tracks", (d) => {
              this.filterSignalTracks(d);
              this.handleMute(d);
          })
              .on("on-messages", this.handleCustomMessages.bind(this))
              .on("on-pubpc-restart-notify", (d) => {
              const transport = this.connectionTransport;
              if (!transport || !browserReport.supportRestartICE)
                  return;
              transport.restartSendICE(d.pcid).catch(log.debug);
          })
              .on("on-subpc-restart-notify", (d) => {
              const transport = this.connectionTransport;
              if (!transport || !browserReport.supportRestartICE)
                  return;
              transport.restartRecvICE(d.pcid).catch(log.debug);
          })
              .on("disconnect", this.handleDisconnect.bind(this));
          log.log("init signaling websocket");
          this.signaling = signaling;
          try {
              const authResData = await signaling.initWs(true);
              signaling.on("@signalingauth", this.handleAuth.bind(this));
              await this.handleAuth(authResData);
          }
          catch (e) {
              if (this.signaling) {
                  this.signaling.release();
                  this.signaling = undefined;
              }
              if (e.code === 10052) {
                  await timeout(1000);
                  return this.joinRoomWithToken(this.roomToken, this.userData);
              }
              throw e;
          }
          return this.users;
      }
      async _unpublish(trackIds) {
          if (this.roomState !== exports.RoomState.Connected) {
              throw UNEXPECTED_ERROR("not connected to the room");
          }
          if (trackIds.length === 0)
              return;
          log.debug("unpublish", trackIds);
          const transport = this.connectionTransport;
          const targetTracks = transport.publishTracks.filter(t => trackIds.indexOf(t.trackId) !== -1);
          if (targetTracks.length !== trackIds.length) {
              throw UNEXPECTED_ERROR("can not find target trackid to unpublish");
          }
          await transport.removeTracks(targetTracks);
          this.getAllMerger().forEach(m => m.controller.onRemoveTracks(targetTracks.map(t => t.track.info)));
          const user = getElementFromArray(this.users, "userId", this.userId);
          if (user) {
              user.removeTracksByTrackId(trackIds);
              user.removePublishedTrackInfo(trackIds);
          }
          this.cleanTrackIdsFromMergeJobs(trackIds);
      }
      async createMergeJob(id, option) {
          if (this.roomState !== exports.RoomState.Connected) {
              throw UNEXPECTED_ERROR("can not createMergeJob, room state is not connected");
          }
          const mergeJob = {
              ...defaultMergeJob,
              ...option,
              id,
          };
          log.debug("send create merge job", mergeJob, id);
          const data = await this.signaling.request("create-merge-job", mergeJob);
          if (data.code !== 0) {
              throw CREATE_MERGE_JOB_ERROR(data.code, data.error);
          }
          if (this.mergeJobTracks[id]) {
              log.warning("merge job id already exist", id);
          }
          else {
              this.mergeJobTracks[id] = [];
          }
      }
      setDefaultMergeStream(width, height, jobId) {
          if (jobId && !this.mergeJobTracks[jobId]) {
              throw NO_MERGE_JOB(jobId);
          }
          if (this.merger && !jobId) {
              this.merger.release();
              this.merger = undefined;
          }
          if (jobId && this.mergeJobMerger[jobId]) {
              this.mergeJobMerger[jobId].release();
              delete this.mergeJobMerger[jobId];
          }
          const controller = this.CreateMergerSessionController();
          if (!jobId) {
              this.merger = new Merger(width, height, controller, jobId);
          }
          else {
              this.mergeJobMerger[jobId] = new Merger(width, height, controller, jobId);
          }
      }
      _stopMerge(jobId) {
          if (this.roomState !== exports.RoomState.Connected) {
              throw UNEXPECTED_ERROR("can not addMergeTracks, room state is not connected");
          }
          if (jobId && !this.mergeJobTracks[jobId]) {
              throw NO_MERGE_JOB(jobId);
          }
          this.signaling.sendWsMsg("stop-merge", {
              id: jobId,
          });
          if (jobId) {
              delete this.mergeJobTracks[jobId];
              if (this.mergeJobMerger[jobId]) {
                  this.mergeJobMerger[jobId].release();
                  delete this.mergeJobMerger[jobId];
              }
          }
          else {
              this.defaultMergeJobTracks = [];
              if (this.merger) {
                  this.merger.release();
                  this.merger = undefined;
              }
          }
      }
      async _addMergeTracks(mergeOpts, jobId) {
          if (this.roomState !== exports.RoomState.Connected) {
              throw UNEXPECTED_ERROR("can not addMergeTracks, room state is not connected");
          }
          if (jobId && !this.mergeJobTracks[jobId]) {
              throw NO_MERGE_JOB(jobId);
          }
          const addTraget = mergeOpts.map(opt => ({
              trackid: opt.trackId, x: opt.x, y: opt.y,
              w: opt.w, h: opt.h, z: opt.z,
          }));
          const config = { id: jobId, add: addTraget };
          log.debug("addMergeTracks", config);
          if (jobId) {
              this.mergeJobTracks[jobId] = this.mergeJobTracks[jobId].concat(mergeOpts.map(t => t.trackId));
              this.mergeJobTracks[jobId] = lodash_uniqby(this.mergeJobTracks[jobId], s => s);
          }
          else {
              this.defaultMergeJobTracks = this.defaultMergeJobTracks.concat(mergeOpts.map(t => t.trackId));
              this.defaultMergeJobTracks = lodash_uniqby(this.defaultMergeJobTracks, s => s);
          }
          await this.signaling.request("update-merge-tracks", config);
      }
      async _removeMergeTracks(trackIds, jobId) {
          if (this.roomState !== exports.RoomState.Connected) {
              throw UNEXPECTED_ERROR("can not addMergeTracks, room state is not connected");
          }
          if (jobId && !this.mergeJobTracks[jobId]) {
              throw NO_MERGE_JOB(jobId);
          }
          const config = {
              id: jobId,
              remove: trackIds.map(t => ({ trackid: t })),
          };
          log.debug("removeMergeTracks", config);
          if (jobId) {
              lodash_remove(this.mergeJobTracks[jobId], t => trackIds.indexOf(t) !== -1);
          }
          else {
              lodash_remove(this.defaultMergeJobTracks, t => trackIds.indexOf(t) !== -1);
          }
          await this.signaling.request("update-merge-tracks", config);
      }
      /**
       * @param isReconnect 代表这次 unsub 是否是为了重新订阅，如果是 pcTrack 不需要释放
       */
      async _unsubscribe(trackIds, isReconnect) {
          if (this.roomState !== exports.RoomState.Connected) {
              throw UNEXPECTED_ERROR("no signaling model, please run joinRoomWithToken first");
          }
          const targetTracks = this.subscribeTracks.filter(t => trackIds.indexOf(t.trackId) !== -1);
          log.debug("unsubscribe", targetTracks);
          if (targetTracks.length === 0) {
              return;
          }
          this.signaling.request("unsub-tracks", {
              tracks: targetTracks.map(t => ({ trackid: t.trackId })),
          });
          if (!isReconnect) {
              targetTracks.forEach(t => t.release());
              lodash_remove(this.subscribeTracks, t => trackIds.indexOf(t.trackId) !== -1);
          }
          await this.connectionTransport.removeConsumers(targetTracks.map(p => p.consumer));
      }
      _muteTracks(tracks) {
          if (this.roomState !== exports.RoomState.Connected) {
              throw UNEXPECTED_ERROR("no signaling model, please run joinRoomWithToken first");
          }
          const transport = this.connectionTransport;
          const trackMuteMap = {};
          tracks.forEach(t => {
              trackMuteMap[t.trackId] = t.muted;
          });
          const targetTracks = transport.publishTracks.filter(t => trackMuteMap[t.trackId] !== undefined);
          targetTracks.forEach(t => {
              t.setMute(trackMuteMap[t.trackId]);
          });
          this.signaling.sendWsMsg("mute-tracks", {
              tracks: tracks.map(t => ({ trackid: t.trackId, muted: t.muted })),
          });
      }
      async kickoutUser(userId) {
          log.log("kickoutUser", userId);
          await this.control("kickplayer", userId);
      }
      /**
       * @internal
       * 向房间中指定目标发送自定义消息
       * @param data string 自定义消息内容
       * @param userIds Array<string> 目标用户名列表，如果为空，则在全房间广播
       */
      sendCustomMessage(data, userIds) {
          if (this.roomState !== exports.RoomState.Connected) {
              throw UNEXPECTED_ERROR("room state is not connected, can not send message");
          }
          this.signaling.sendWsMsg("send-message", {
              msgid: randomStringGen(8),
              target: !userIds || userIds.length === 0 ? undefined : userIds,
              type: "normal",
              text: data,
          });
          log.debug("send custom message", data, userIds);
      }
      /**
       * leaveRoom 将不会本地的发布流，如果想清除本地的发布流
       * 或者手动调用 Track 对象的 release 方法
       */
      leaveRoom() {
          log.log("leave room");
          if (this.signaling) {
              this.signaling.sendDisconnect();
          }
          this.releaseRoom();
      }
      _releasePublishTracks() {
      }
      async control(command, userId) {
          if (this.roomState !== exports.RoomState.Connected) {
              throw UNEXPECTED_ERROR("can not connected to the room, please run joinRoom first");
          }
          const data = await this.signaling.request("control", { command, playerid: userId });
          if (data.error) {
              throw CONTROL_ERROR(data.code, data.error);
          }
      }
      handlePlayerOut(data) {
          const removeElement = this._users.get(data.playerid);
          if (removeElement) {
              this._users.delete(data.playerid);
              lodash_remove(this._trackInfo, info => info.playerid === data.playerid);
              const targetTracks = lodash_remove(this.subscribeTracks, t => t.track.userId === removeElement.userId);
              targetTracks.forEach(t => t.release());
              nextTick(() => {
                  log.debug("user-leave", removeElement);
                  this.emit("user-leave", removeElement);
              });
          }
      }
      handlePlayerIn(signalUser) {
          const user = transferSignalingUserToUser(signalUser);
          this._users.set(user.userId, user);
          nextTick(() => {
              log.debug("user-join", user);
              this.emit("user-join", user);
          });
      }
      handleAddTracks({ tracks }) {
          log.log("receive track-add", tracks, { ...this._trackInfo });
          const publishedUsers = new Set();
          for (const track of tracks) {
              const user = getElementFromArray(this.users, "userId", track.playerid);
              if (!user)
                  continue;
              // 如果在收到这个 master track 之前已经有了 master track
              // 就翻译为 unpublish 后再 publish
              if (user.published && !publishedUsers.has(user.userId) && this.sessionMode === "stream") {
                  const publishedTracks = user.publishedTrackInfo.map(t => transferTrackBaseInfoToSignalingTrack(t, true));
                  this.handleRemoveTracks({ tracks: publishedTracks });
                  publishedTracks.push(track);
                  this.handleAddTracks({ tracks: publishedTracks });
              }
              else {
                  this._trackInfo.push(track);
                  user.addPublishedTrackInfo([transferSignalingTrackToTrackBaseInfo(track)]);
                  publishedUsers.add(user.userId);
              }
          }
          if (this.sessionMode === "stream") {
              for (const userId of Array.from(publishedUsers)) {
                  nextTick(() => {
                      log.debug("user-publish", this._users.get(userId));
                      this.emit("user-publish", this._users.get(userId));
                  });
              }
          }
          nextTick(() => {
              log.debug("track-add", tracks.map(transferSignalingTrackToTrackBaseInfo));
              this.emit("track-add", tracks.map(transferSignalingTrackToTrackBaseInfo));
          });
      }
      handleRemoveTracks({ tracks }) {
          log.log("receive track-remove", tracks, { ...this._trackInfo });
          const targetTracks = lodash_remove(this._trackInfo, t => tracks.map(t => t.trackid).includes(t.trackid));
          const unpublishedUsers = new Set();
          for (const track of targetTracks) {
              const user = this._users.get(track.playerid);
              if (!user)
                  continue;
              user.removePublishedTrackInfo([track.trackid]);
              user.removeTracksByTrackId([track.trackid]);
              unpublishedUsers.add(user.userId);
              const subscribeTrack = lodash_remove(this.subscribeTracks, t => t.trackId === track.trackid)[0];
              if (subscribeTrack) {
                  subscribeTrack.release();
              }
          }
          this.cleanTrackIdsFromMergeJobs(tracks.map(t => t.trackid));
          if (this.sessionMode === "stream") {
              for (const userId of Array.from(unpublishedUsers)) {
                  const user = this._users.get(userId);
                  // 如果收到 master track remove 后还留有 master track
                  // 翻译为先取消发布再重新发布
                  if (user.published) {
                      const publishedTracks = user.publishedTrackInfo.map(t => transferTrackBaseInfoToSignalingTrack(t, true));
                      this.handleRemoveTracks({ tracks: publishedTracks });
                      this.handleAddTracks({ tracks: publishedTracks });
                  }
                  else {
                      nextTick(() => {
                          log.debug("user-unpublish", user);
                          this.emit("user-unpublish", user);
                      });
                  }
              }
          }
          nextTick(() => {
              log.debug("track-remove", targetTracks.map(transferSignalingTrackToTrackBaseInfo));
              this.emit("track-remove", targetTracks.map(transferSignalingTrackToTrackBaseInfo));
          });
      }
      handleMute({ tracks }) {
          for (const sigTrack of tracks) {
              const trackid = sigTrack.trackid;
              const muted = sigTrack.muted;
              const trackInfo = getElementFromArray(this._trackInfo, "trackid", trackid);
              if (!trackInfo) {
                  return;
              }
              const user = this._users.get(trackInfo.playerid);
              if (!user) {
                  return;
              }
              const info = user.publishedTrackInfo.find(t => t.trackId === trackid);
              if (info) {
                  info.muted = muted;
              }
              const track = user.tracks.find(t => t.info.trackId === trackid);
              if (track) {
                  track.info.muted = muted;
                  track.setMute(muted);
              }
              trackInfo.muted = muted;
              const pcTrack = this.subscribeTracks.filter(t => t.trackId === trackid)[0];
              if (pcTrack) {
                  pcTrack.setMute(muted);
              }
              let anotherTrackInfo = undefined;
              for (let i = 0; i < this._trackInfo.length; i += 1) {
                  if (this._trackInfo[i].playerid === trackInfo.playerid && this._trackInfo[i].kind !== trackInfo.kind) {
                      anotherTrackInfo = this._trackInfo[i];
                  }
              }
              const data = {
                  userId: trackInfo.playerid,
                  muteAudio: false, muteVideo: false,
              };
              if (trackInfo.kind === "audio") {
                  data.muteAudio = muted;
                  data.muteVideo = anotherTrackInfo ? anotherTrackInfo.muted : false;
              }
              else {
                  data.muteVideo = muted;
                  data.muteAudio = anotherTrackInfo ? anotherTrackInfo.muted : false;
              }
              if (this.sessionMode === "stream") {
                  nextTick(() => {
                      log.log("user-mute", data);
                      this.emit("user-mute", data);
                  });
              }
          }
          nextTick(() => {
              log.log("mute-tracks", tracks.map(t => ({ trackId: t.trackid, muted: t.muted })));
              this.emit("mute-tracks", tracks.map(t => ({ trackId: t.trackid, muted: t.muted })));
          });
      }
      /** @internal */
      handleCustomMessages({ messages }) {
          log.debug("messages-received", messages.map(transferSignalingCustomMessageToCustomMessage));
          this.emit("messages-received", messages.map(transferSignalingCustomMessageToCustomMessage));
      }
      handleDisconnect(data) {
          log.log("handle disconnect", data);
          if (data.code === 10052 && this.roomToken) {
              this.roomState = exports.RoomState.Reconnecting;
              setTimeout(() => this.signaling.initWs(), 1000);
              return;
          }
          this.releaseRoom();
          switch (data.code) {
              case 10006: {
                  this.emit("disconnect", {
                      code: data.code,
                      data: {
                          userId: data.kickedid,
                      },
                  });
                  break;
              }
              default: {
                  this.emit("disconnect", {
                      code: data.code,
                  });
                  break;
              }
          }
      }
      /** 更新 AccessToken  */
      async updateAccessToken() {
          const roomAccess = getRoomAccessFromToken(this.roomToken);
          this.accessToken = await getAccessToken(roomAccess, this.roomToken);
          if (this.signaling) {
              this.signaling.accessToken = this.accessToken;
          }
          else {
              // 此时 signaling 被释放，已经离开了房间
              throw UNEXPECTED_ERROR("room state is idle");
          }
      }
      async handleAuth(authData) {
          this.filterSignalTracks(authData);
          // auth 鉴权失败，一般是 token 过期，或者长时间断线导致房间被关闭，
          // 直接重新走加入房间的流程
          log.debug("handleAuth", authData);
          if (authData.error) {
              await this.joinRoomWithToken(this.roomToken, this.userData);
              return;
          }
          authData.tracks = authData.tracks || [];
          // 只保留除自己以外的 trackInfo，防止补事件出错
          authData.tracks = authData.tracks.filter(t => t.playerid !== this.userId);
          authData.players = authData.players || [];
          const isGetMissingEvent = this.roomState === exports.RoomState.Reconnecting;
          let missingEvents = {
              join: [], leave: [], add: [], remove: [], mute: [],
          };
          const lastUsers = Array.from(this._users.keys());
          const currentUsers = authData.players.map(player => player.playerid);
          missingEvents = getMissingUserEvent(this.userId, this._trackInfo, authData.tracks, lastUsers, currentUsers);
          // connected 的唯一标准是收到 error 为 0 的 auth-res
          this.roomState = exports.RoomState.Connected;
          // 仅在第一次处理的时候设置用户和 TrackInfo, 其余通过补事件来更新
          if (!isGetMissingEvent) {
              this._trackInfo = authData.tracks;
              this._users.clear();
              for (const player of authData.players || []) {
                  const user = transferSignalingUserToUser(player);
                  const userTracks = this._trackInfo.filter(trackInfo => trackInfo.playerid === user.userId);
                  user.addPublishedTrackInfo(userTracks.map(transferSignalingTrackToTrackBaseInfo));
                  this._users.set(user.userId, user);
              }
          }
          else {
              log.debug("get missing events", missingEvents);
              if (missingEvents.remove.length > 0) {
                  this.handleRemoveTracks({ tracks: missingEvents.remove });
              }
              if (missingEvents.leave.length > 0) {
                  missingEvents.leave.forEach(this.handlePlayerOut.bind(this));
              }
              if (missingEvents.join.length > 0) {
                  missingEvents.join.forEach(this.handlePlayerIn.bind(this));
              }
              if (missingEvents.add.length > 0) {
                  this.handleAddTracks({ tracks: missingEvents.add });
              }
              if (missingEvents.mute.length > 0) {
                  this.handleMute({ tracks: missingEvents.mute });
              }
          }
          if (!this.connectionTransport) {
              this.connectionTransport = this.createConnectionTransport(authData.rtpcaps);
          }
          else {
              const publishingTracks = this.connectionTransport.publishTracks.filter(p => p.connectStatus === exports.TrackConnectStatus.Connecting);
              const subscribingTracks = this.subscribeTracks.filter(p => p.connectStatus === exports.TrackConnectStatus.Connecting);
              this.connectionTransport.extendedRtpCapabilities = authData.rtpcaps;
              if (!this.connectionTransport.sendHandler.isPcReady || this.connectionTransport.sendHandler._isRestartingICE || publishingTracks.length > 0) {
                  this.connectionTransport.reconnectProducer();
              }
              if (!this.connectionTransport.recvHandler.isPcReady || this.connectionTransport.recvHandler._isRestartingICE || subscribingTracks.length > 0) {
                  this.connectionTransport.resetRecvHandler();
              }
          }
      }
      createConnectionTransport(rtpcaps) {
          const signaling = this.signaling;
          const transport = new ConnectionTransport(rtpcaps, signaling);
          transport.on("@needpubpc", (sdp, tracks, cb, errcb) => {
              signaling.request("pubpc", {
                  sdp, tracks: tracks.map(transferTrackToPublishTrack),
                  policy: this.config.transportPolicy,
              })
                  .then((d) => {
                  switch (d.code) {
                      case 0: {
                          cb(d);
                          return;
                      }
                      case 10052: {
                          throw SERVER_UNAVAILABLE();
                      }
                      default: {
                          throw PUB_P2P_ERROR(d.error);
                      }
                  }
              })
                  .catch(errcb);
          });
          transport.on("@needsubpc", (trackIds, cb, errcb) => {
              signaling.request("subpc", {
                  tracks: trackIds.map(t => ({ trackid: t })),
                  policy: this.config.transportPolicy,
              })
                  .then((d) => {
                  switch (d.code) {
                      case 0: {
                          cb(d);
                          return;
                      }
                      case 10052: {
                          throw SERVER_UNAVAILABLE();
                      }
                      default: {
                          throw SUB_P2P_ERROR(d.error);
                      }
                  }
              })
                  .catch(errcb);
          })
              .on("@needresub", () => {
              const allTrackIds = this.subscribeTracks.map(t => t.trackId);
              this.subscribeTracks.forEach(t => t.connectStatus = exports.TrackConnectStatus.Connecting);
              this._subscribe(allTrackIds, true);
          })
              .on("@needrepub", (tracks) => {
              this._publish(tracks.map(t => t.track), true);
          })
              .on("@needresetrecv", () => {
              this.subscribeTracks.filter(p => !!p.track).forEach(p => {
                  p.track.removeAllListeners("@ended");
              });
          });
          return transport;
      }
      cleanTrackIdsFromMergeJobs(trackIds) {
          lodash_remove(this.defaultMergeJobTracks, t => trackIds.indexOf(t) !== -1);
          for (const tracks in this.mergeJobTracks) {
              lodash_remove(tracks, t => trackIds.indexOf(t) !== -1);
          }
      }
      CreateMergerSessionController() {
          const controller = new MergerSessionController();
          const handleTrackAdd = (tracks) => {
              controller.onAddTracks(tracks);
          };
          const handleTrackRemove = (tracks) => {
              controller.onRemoveTracks(tracks);
          };
          this.on("track-add", handleTrackAdd);
          this.on("track-remove", handleTrackRemove);
          controller.getCurrentTracks = () => {
              if (!this.connectionTransport)
                  return [];
              const tracks = this._trackInfo.map(transferSignalingTrackToTrackBaseInfo);
              const selfPublishedTracks = this.connectionTransport.publishTracks.map(t => t.track.info);
              return tracks.concat(selfPublishedTracks);
          };
          controller.addMergeTrack = (mergeOpt, jobId) => {
              this._addMergeTracks(mergeOpt, jobId);
          };
          controller.release = () => {
              this.off("track-add", handleTrackAdd);
              this.off("track-remove", handleTrackRemove);
          };
          return controller;
      }
      getAllMerger() {
          const mergers = [];
          if (this.merger) {
              mergers.push(this.merger);
          }
          for (const jobId in this.mergeJobMerger) {
              mergers.push(this.mergeJobMerger[jobId]);
          }
          return mergers;
      }
      // 退出房间后清空房间状态
      releaseRoom() {
          this.releaseSession();
          if (this.signaling) {
              this.signaling.release();
              this.signaling = undefined;
          }
          if (this.connectionTransport) {
              this.connectionTransport.release();
              this.connectionTransport = undefined;
          }
          this.getAllMerger().map(merger => {
              merger.release();
          });
          this.defaultMergeJobTracks = [];
          this.mergeJobTracks = {};
          this.merger = undefined;
          this.mergeJobMerger = {};
          this.roomState = exports.RoomState.Idle;
          this._trackInfo = [];
          this._users.clear();
          this.userId = undefined;
          this.subscribeTracks.forEach(t => {
              t.release();
          });
          this.subscribeTracks = [];
      }
  }

  class StreamModeSession extends QNRTCCore {
      constructor(config) {
          super(config);
          this.subscribedUsers = {};
          this.sessionMode = "stream";
      }
      async publish(stream) {
          if (this.stream) {
              log.warning("repeat publish, please unpublish first!");
              return;
          }
          stream.userId = this.userId;
          this.stream = stream;
          return await this._publish(stream.trackList);
      }
      async unpublish() {
          if (!this.connectionTransport)
              return;
          const alltrackIds = this.connectionTransport.publishTracks.map(t => {
              return t.trackId;
          });
          await this._unpublish(alltrackIds);
          this.stream = undefined;
      }
      async setMergeStreamLayout(userId, opt) {
          let tracks = undefined;
          if (opt.id) {
              tracks = this.mergeJobTracks[opt.id];
          }
          else {
              tracks = this.defaultMergeJobTracks;
          }
          if (!tracks) {
              throw NO_MERGE_JOB(opt.id);
          }
          const user = getElementFromArray(this.users, "userId", userId);
          if (!user || !user.published) {
              log.warning(`can not setMergeOption, user ${userId} is published ?`);
              return;
          }
          const mergeOptions = opt;
          // 兼容旧版写法
          if (opt.visible === false) {
              mergeOptions.hidden = true;
          }
          const id = mergeOptions.id;
          const hidden = !!mergeOptions.hidden;
          const muted = !!mergeOptions.muted;
          delete mergeOptions.id;
          delete mergeOptions.hidden;
          delete mergeOptions.muted;
          const addTarget = [];
          const removeTarget = [];
          for (const info of user.publishedTrackInfo) {
              if (info.kind === "audio" && muted) {
                  removeTarget.push(info.trackId);
              }
              else if (info.kind === "audio") {
                  addTarget.push({ trackId: info.trackId });
              }
              if (info.kind === "video" && hidden) {
                  removeTarget.push(info.trackId);
              }
              else if (info.kind === "video") {
                  addTarget.push({
                      ...mergeOptions,
                      trackId: info.trackId,
                  });
              }
          }
          await this._addMergeTracks(addTarget, id);
          await this._removeMergeTracks(removeTarget, id);
      }
      stopMergeStream(id) {
          this._stopMerge(id);
      }
      async subscribe(userId) {
          if (userId === this.userId) {
              throw SUB_ERROR(10044, "can not subscribe yourself");
          }
          const targetTracks = this._trackInfo.filter(track => track.playerid === userId && track.master);
          if (targetTracks.length === 0) {
              throw SUB_ERROR(10041, `subscribe user ${userId} is not published`);
          }
          const trackIds = targetTracks.map(t => t.trackid);
          const tracks = await this._subscribe(trackIds, false, true);
          this.subscribedUsers[userId] = new Stream(tracks, "recv", userId);
          this.subscribedUsers[userId].once("release", () => {
              delete this.subscribedUsers[userId];
          });
          return this.subscribedUsers[userId];
      }
      async unsubscribe(userId) {
          if (!this.subscribedUsers[userId]) {
              log.warning("user", userId, "is not in subscribedUsers");
              return;
          }
          await this._unsubscribe(this.subscribedUsers[userId].trackList.map(t => t.info.trackId));
          delete this.subscribedUsers[userId];
      }
      mute(muteaudio, mutevideo = false) {
          if (!this.stream) {
              log.warning("can not mute, please run publish first");
              return;
          }
          const tracks = [];
          if (this.stream._audioTrack && this.stream._audioTrack.info.muted !== muteaudio) {
              tracks.push({ trackId: this.stream._audioTrack.info.trackId, muted: muteaudio });
          }
          if (this.stream._videoTrack && this.stream._videoTrack.info.muted !== mutevideo) {
              tracks.push({ trackId: this.stream._videoTrack.info.trackId, muted: mutevideo });
          }
          this._muteTracks(tracks);
      }
      /**
       * 只关注 master 流
       */
      filterSignalTracks(d) {
          if (!d.tracks)
              return;
          d.tracks = d.tracks.filter((t) => {
              if (t.master !== undefined && t.master !== null)
                  return t.master;
              const track = this._trackInfo.find(info => info.trackid === t.trackid);
              if (!track)
                  return false;
              return track.master;
          });
      }
      releaseSession() {
          if (this.stream) {
              this.stream.release();
              this.stream = undefined;
          }
          for (const key in this.subscribedUsers) {
              this.subscribedUsers[key].release();
          }
          this.subscribedUsers = {};
      }
  }

  class TrackModeSession extends QNRTCCore {
      /**
       * 房间中已经发布的 Track 列表
       */
      get publishedTracks() {
          if (!this.connectionTransport)
              return [];
          return this.connectionTransport.publishTracks.filter(p => p.connectStatus === exports.TrackConnectStatus.Connect).map(p => p.track);
      }
      /**
       * 房间中已经订阅的 Track 列表
       */
      get subscribedTracks() {
          return this.subscribeTracks.filter(p => p.connectStatus === exports.TrackConnectStatus.Connect).map(t => t.track);
      }
      /**
       * 已经添加进合流的 Track 列表（只有 trackid 信息）
       */
      get mergeStreamTracks() {
          return this.defaultMergeJobTracks;
      }
      /**
       * 除了默认合流 job 之外的其他 job 的 合流 Track 列表
       */
      get mergeStreamJobTracks() {
          return this.mergeJobTracks;
      }
      constructor(config) {
          super(config);
          this.sessionMode = "track";
      }
      async publish(tracks) {
          return await this._publish(tracks);
      }
      async unpublish(trackIds) {
          return await this._unpublish(trackIds);
      }
      /**
       * 传入 trackId 列表订阅指定 Track
       * @param trackIds trackId 列表
       * @param strictMode 是否开启严格模式
       * 如果开启严格模式，订阅过程中只要有一个 Track 出现错误就会导致整个订阅失败
       * 默认不开启严格模式
       */
      async subscribe(trackIds, strictMode = false) {
          return await this._subscribe(trackIds, false, strictMode);
      }
      async unsubscribe(trackIds) {
          return await this._unsubscribe(trackIds);
      }
      muteTracks(tracks) {
          this._muteTracks(tracks);
      }
      async addMergeStreamTracks(mergeOpts, jobId) {
          await this._addMergeTracks(mergeOpts, jobId);
      }
      async removeMergeStreamTracks(trackIds, jobId) {
          await this._removeMergeTracks(trackIds, jobId);
      }
      stopMergeStream(id) {
          this._stopMerge(id);
      }
      filterSignalTracks() { }
      releaseSession() { }
  }

  class AudioMixingTrack extends AudioTrack {
      constructor(userId) {
          const destination = audioContext.createMediaStreamDestination();
          const audioTrack = destination.stream.getAudioTracks()[0];
          super(audioTrack, userId, "local");
          this.initAudioManager(true);
          this.destination = destination;
          this.inputList = [];
      }
      appendAudioSource(track) {
          if (this.inputList.find(input => input.track === track)) {
              log.warning("track is already in the track list");
              return;
          }
          this.inputList.push({
              track,
          });
          track.audioManager.gainNode.connect(this.destination);
      }
      removeAudioSource(track) {
          const targetInput = this.inputList.find(input => input.track === track);
          if (!targetInput) {
              return;
          }
          targetInput.track.audioManager.gainNode.disconnect(this.destination);
          lodash_remove(this.inputList, i => i === targetInput);
      }
      release() {
          // remove all audio source
          for (const input of this.inputList) {
              this.removeAudioSource(input.track);
          }
          super.release();
      }
  }

  class AudioEffectManager {
      constructor(output, playbackEngine) {
          /** @inrernal */
          this.effectSourceMap = new Map();
          /** @inrernal */
          this.playback = true;
          this.output = output;
          this.playbackEngine = playbackEngine;
      }
      get effectList() {
          return Array.from(this.effectSourceMap.keys());
      }
      getEffectTrack(key) {
          return this.effectSourceMap.get(key);
      }
      playEffect(key, volume) {
          const audioTrack = this.effectSourceMap.get(key);
          if (!audioTrack) {
              log.warning("can not find target effect", key);
              return;
          }
          if (volume) {
              audioTrack.setVolume(volume);
          }
          if (this.playback && audioTrack.audioManager.audioSource) {
              this.playbackEngine.addAudioNode(audioTrack.audioManager.gainNode);
          }
          audioTrack.startAudioSource();
      }
      /**
       * 添加音效
       * @param source 音效的源文件，支持本地 File 文件或者在线音乐地址
       * @param key 音效的 key，每个音效需要指定一个唯一的 key，用于之后调用
       */
      async addEffectSource(source, key) {
          if (this.effectSourceMap.has(key)) {
              log.warning("duplicate effect key!", key);
              return;
          }
          const audioTrack = await exports.AudioUtils.createAudioTrackFromSource(source);
          this.effectSourceMap.set(key, audioTrack);
          this.output.appendAudioSource(audioTrack);
      }
      /**
       * 移除并释放已经添加的音效
       * @param key 指定音效的 key，如果不指定默认删除全部的音效
       */
      removeEffectSource(key) {
          let targetKeys = [];
          if (!key) {
              targetKeys = Array.from(this.effectSourceMap.keys());
          }
          else {
              targetKeys = [key];
          }
          for (const k of targetKeys) {
              const targetAudioTrack = this.effectSourceMap.get(k);
              if (!targetAudioTrack) {
                  return;
              }
              this.output.removeAudioSource(targetAudioTrack);
              targetAudioTrack.release();
              this.effectSourceMap.delete(k);
          }
      }
  }

  class AudioMusicManager extends EventEmitter {
      constructor(output, playbackEngine) {
          super();
          this.musicOption = {
              loop: false,
              volume: 1,
          };
          /** @internal */
          this.playback = true;
          this.output = output;
          this.playbackEngine = playbackEngine;
      }
      /** @internal */
      get audioNode() {
          if (!this.musicTrack)
              return null;
          return this.musicTrack.audioManager.gainNode;
      }
      /**
       * 更新背景音乐混音的各种参数，支持在混音中途更新
       * @param option Partical<AudioMusicOption>
       */
      setMusicOption(option) {
          this.musicOption = Object.assign(this.musicOption, option);
          if (this.musicTrack) {
              this.musicTrack.setVolume(this.musicOption.volume);
              this.musicTrack.setLoop(this.musicOption.loop);
          }
      }
      /**
       * 开始音乐混音
       * @param source 音乐的源文件，支持本地文件对象或者在线音乐地址
       */
      async startMusicMixing(source) {
          // 如果重复 start，就自动 stop 一次
          if (this.musicTrack) {
              this.stopMusicMixing();
              return await this.startMusicMixing(source);
          }
          this.musicTrack = await exports.AudioUtils.createAudioTrackFromSource(source);
          this.output.appendAudioSource(this.musicTrack);
          this.setMusicOption({});
          if (!this.musicTrack.audioManager.audioSource)
              throw UNEXPECTED_ERROR("can not find audio source");
          if (this.playback && this.audioNode) {
              this.playbackEngine.addAudioNode(this.audioNode);
          }
          this.musicTrack.on("audio-state-change", (curr, last) => {
              this.emit("music-state-change", curr, last);
          });
          this.musicTrack.startAudioSource();
      }
      /**
       * 暂停音乐混音
       */
      pauseMusicMixing() {
          if (!this.musicTrack) {
              log.warning("can not find target music, please run startAudioMixing");
              return;
          }
          this.musicTrack.pauseAudioSource();
      }
      /**
       * 恢复音乐混音
       */
      resumeMusicMixing() {
          if (!this.musicTrack) {
              log.warning("can not find target music, please run startAudioMixing");
              return;
          }
          this.musicTrack.resumeAudioSource();
      }
      /**
       * 停止音乐混音
       */
      stopMusicMixing() {
          if (!this.musicTrack) {
              return;
          }
          this.musicTrack.stopAudioSource();
          this.output.removeAudioSource(this.musicTrack);
          this.musicTrack.release();
          this.musicTrack = undefined;
      }
      getMusicDuration() {
          if (!this.musicTrack) {
              return 0;
          }
          return this.musicTrack.getDuration();
      }
      getMusicCurrentTime() {
          if (!this.musicTrack) {
              return 0;
          }
          return this.musicTrack.getCurrentTime();
      }
      setMusicCurrentTime(currentTime) {
          if (!this.musicTrack) {
              return;
          }
          this.musicTrack.setCurrentTime(currentTime);
          if (!this.musicTrack.audioManager.audioSource)
              throw UNEXPECTED_ERROR("can not find audio source");
      }
  }

  class AudioPlaybackEngine {
      constructor() {
          this.volume = 1;
          this.gainNode = audioContext.createGain();
          this.gainNode.connect(audioContext.destination);
      }
      addAudioNode(audioNode) {
          audioNode.connect(this.gainNode);
      }
      removeAudioNode(audioNode) {
          audioNode.disconnect(this.gainNode);
      }
      release() {
          this.gainNode.disconnect();
      }
  }

  class TrackMixingManager {
      constructor(originSource) {
          this.playbackEngine = new AudioPlaybackEngine();
          this.sourcePlayebackState = false;
          if (originSource instanceof AudioTrack) {
              this.outputTrack = new AudioMixingTrack();
              this.outputTrack.appendAudioSource(originSource);
          }
          else {
              throw UNEXPECTED_ERROR("audio mixing manager: origin track is not audio track");
          }
          this.source = originSource;
          this.effectManager = new AudioEffectManager(this.outputTrack, this.playbackEngine);
          this.musicManager = new AudioMusicManager(this.outputTrack, this.playbackEngine);
      }
      /**
       * 获取背景音乐返听的状态, 默认打开
       */
      getMusicPlaybackState() {
          return this.musicManager.playback;
      }
      /**
       * 设置背景音乐的返听状态，默认打开
       * @param state boolean
       */
      setMusicPlaybackState(state) {
          if (this.musicManager.playback === state)
              return;
          this.musicManager.playback = state;
          if (!this.musicManager.audioNode)
              return;
          if (state) {
              this.playbackEngine.addAudioNode(this.musicManager.audioNode);
          }
          else {
              this.playbackEngine.removeAudioNode(this.musicManager.audioNode);
          }
      }
      /**
       * 获取输入音源返听的状态，默认关闭
       */
      getSourcePlaybackState() {
          return this.sourcePlayebackState;
      }
      /**
       * 设置输入音源的返听状态，默认关闭
       * @param state boolean
       */
      setSourcePlaybackState(state) {
          if (this.sourcePlayebackState === state)
              return;
          this.sourcePlayebackState = state;
          if (!this.source.audioManager.audioSource)
              return;
          if (state) {
              this.playbackEngine.addAudioNode(this.source.audioManager.gainNode);
          }
          else {
              this.playbackEngine.removeAudioNode(this.source.audioManager.gainNode);
          }
      }
      /**
       * 获取音效返听的状态，默认打开
       */
      getEffectPlaybackState() {
          return this.effectManager.playback;
      }
      /**
       * 设置音效返听的状态，默认打开
       */
      setEffectPlaybackState(state) {
          if (this.effectManager.playback === state)
              return;
          this.effectManager.playback = state;
          this.effectManager.effectSourceMap.forEach((v, k) => {
              if (!v.audioManager.audioSource)
                  return;
              if (state) {
                  this.playbackEngine.addAudioNode(v.audioManager.gainNode);
              }
              else {
                  this.playbackEngine.removeAudioNode(v.audioManager.gainNode);
              }
          });
      }
      setBitrate(kbps) {
          this.outputTrack.setInfo({ kbps });
      }
      setTag(tag) {
          this.outputTrack.setInfo({ tag });
      }
      /**
       * 释放整个混音模块，清除 output/音乐/音效等资源
       * 但是不会释放构造函数传入的原始源
       */
      release() {
          this.effectManager.removeEffectSource();
          this.musicManager.stopMusicMixing();
          this.outputTrack.removeAudioSource(this.source);
          this.outputTrack.release();
          this.playbackEngine.release();
      }
  }
  class StreamMixingManager extends TrackMixingManager {
      constructor(input) {
          if (!input._audioTrack) {
              throw UNEXPECTED_ERROR("input stream do not have audio track");
          }
          super(input._audioTrack);
          this.input = input;
          const trackList = [this.outputTrack];
          if (this.input._videoTrack) {
              trackList.push(this.input._videoTrack);
          }
          this.outputStream = new Stream(trackList, "send", this.input.userId);
      }
      /**
       * 设置输出 Stream 的码率
       * @param audio 音频码率
       * @param video 视频码率
       */
      setBitrate(audio, video) {
          if (audio && this.outputStream._audioTrack) {
              this.outputStream._audioTrack.setKbps(audio);
          }
          if (video && this.outputStream._videoTrack) {
              this.outputStream._videoTrack.setKbps(video);
          }
      }
  }

  (function (AudioUtils) {
      function createAudioTrackFromURL(url, crossorigin = "anonymous", tag, bitrate) {
          const audioElement = document.createElement("audio");
          audioElement.preload = "auto";
          audioElement.src = url;
          audioElement.crossOrigin = crossorigin;
          const track = new AudioSourceTrack(audioElement);
          if (bitrate) {
              track.setKbps(bitrate);
          }
          track.setInfo({ tag });
          return track;
      }
      AudioUtils.createAudioTrackFromURL = createAudioTrackFromURL;
      function createAudioTrackFromFile(file, tag, bitrate) {
          return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = (e) => {
                  const data = e.target.result;
                  decodeAudioData(data).then(buffer => {
                      const track = new AudioSourceTrack(buffer);
                      if (bitrate) {
                          track.setKbps(bitrate);
                      }
                      track.setInfo({ tag });
                      resolve(track);
                  }).catch(reject);
              };
              reader.readAsArrayBuffer(file);
          });
      }
      AudioUtils.createAudioTrackFromFile = createAudioTrackFromFile;
      function createAudioTrackFromBuffer(buffer, tag, bitrate) {
          const track = new AudioSourceTrack(buffer);
          if (bitrate) {
              track.setKbps(bitrate);
          }
          track.setInfo({ tag });
          return track;
      }
      AudioUtils.createAudioTrackFromBuffer = createAudioTrackFromBuffer;
      async function createAudioTrackFromSource(source, tag, bitrate) {
          if (source instanceof File) {
              return await createAudioTrackFromFile(source, tag, bitrate);
          }
          else if (source instanceof AudioBuffer) {
              return createAudioTrackFromBuffer(source, tag, bitrate);
          }
          return createAudioTrackFromURL(source, "anonymous", tag, bitrate);
      }
      AudioUtils.createAudioTrackFromSource = createAudioTrackFromSource;
      async function decodeAudioData(data) {
          if (audioContext.state === "suspended") {
              await audioContext.resume();
          }
          const decodePromise = () => new Promise((resolve, reject) => {
              audioContext.decodeAudioData(data, (buffer) => {
                  resolve(buffer);
              }, (e) => {
                  reject(AUDIO_DECODE_ERROR(e));
              });
          });
          return await decodePromise();
      }
      AudioUtils.decodeAudioData = decodeAudioData;
      function createAudioMixingManagerFromTrack(track) {
          return new TrackMixingManager(track);
      }
      AudioUtils.createAudioMixingManagerFromTrack = createAudioMixingManagerFromTrack;
      function createAudioMixingManagerFromStream(stream) {
          return new StreamMixingManager(stream);
      }
      AudioUtils.createAudioMixingManagerFromStream = createAudioMixingManagerFromStream;
  })(exports.AudioUtils || (exports.AudioUtils = {}));

  /*
   * device.ts
   * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
   *
   * Distributed under terms of the MIT license.
  */
  const DEFAULT_RECORD_CONFIG = {
      audio: {
          enabled: true,
      },
      video: {
          enabled: true,
          bitrate: 600,
      },
  };
  class DeviceManager extends EventEmitter {
      constructor() {
          super();
          // 记录每个 device 存在的 tick 数量
          this.deviceMap = {};
          if (!browserReport.support) {
              return;
          }
          this.updateDeivceInfo();
          // safari 11 不支持 ondevicechange，使用 setInterval
          if (!browserReport.ondevicechange) {
              window.setInterval(this.updateDeivceInfo.bind(this), 1000);
          }
          if (browserReport.ondevicechange) {
              navigator.mediaDevices.ondevicechange = this.updateDeivceInfo.bind(this);
          }
      }
      // TODO: 允许 video/screen 同时打开
      async getLocalTracks(config = DEFAULT_RECORD_CONFIG) {
          log.debug("get local tracks", config);
          /**
           * 如果同时开启了摄像头和屏幕采集，分 2 次采集完成
           */
          if (REC_SCREEN_ENABLE(config) && REC_VIDEO_ENABLE(config)) {
              const subConfig = { screen: config.screen };
              const subConfig2 = { video: config.video, audio: config.audio };
              const values = await Promise.all([this.getLocalTracks(subConfig), this.getLocalTracks(subConfig2)]);
              return values[0].concat(values[1]);
          }
          const constraints = await transferRecordOptionToMediaConstraints(config);
          let mediaStream;
          try {
              mediaStream = await this.getUserMedia(config, constraints, true);
          }
          catch (e) {
              if (e.name === "NotAllowedError") {
                  throw DEVICE_NOT_ALLOWED("");
              }
              else {
                  throw e;
              }
          }
          let videoKbps = undefined;
          let audioKbps = undefined;
          let videoTag = undefined;
          let audioTag = undefined;
          if (REC_AUDIO_ENABLE(config)) {
              audioKbps = config.audio.bitrate;
              audioTag = config.audio.tag;
          }
          if (REC_SCREEN_ENABLE(config)) {
              videoKbps = config.screen.bitrate;
              videoTag = config.screen.tag;
          }
          if (REC_VIDEO_ENABLE(config)) {
              videoKbps = config.video.bitrate;
              videoTag = config.video.tag;
          }
          const mediaTracks = mediaStream ? mediaStream.getTracks() : [];
          const tracks = [];
          for (const mediaTrack of mediaTracks) {
              let track;
              if (mediaTrack.kind === "audio") {
                  track = createCustomTrack(mediaTrack, audioTag, audioKbps);
              }
              else {
                  track = createCustomTrack(mediaTrack, videoTag, videoKbps);
              }
              tracks.push(track);
          }
          if (config.audio && !!config.audio.source) {
              const track = await exports.AudioUtils.createAudioTrackFromSource(config.audio.source, audioTag, audioKbps);
              tracks.push(track);
          }
          return tracks;
      }
      async getLocalStream(config) {
          if (config && REC_SCREEN_ENABLE(config) && REC_VIDEO_ENABLE(config)) {
              throw UNEXPECTED_ERROR("can not get local stream with video and screen");
          }
          const tracks = await this.getLocalTracks(config);
          return new Stream(tracks, "send");
      }
      async getUserMedia(config, constraints, init) {
          log.debug("request to get user media", constraints, config);
          if (!constraints.audio && !constraints.video) {
              return null;
          }
          let mediaStream;
          if (REC_SCREEN_ENABLE(config)) {
              mediaStream = await this.getDisplayMedia(constraints);
          }
          else {
              mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
          }
          return mediaStream;
      }
      /**
       * getDisplayMedia 不支持同时录制屏幕和麦克风
       * 在这种情况下分 2 次请求 stream 之后合并
       */
      async getDisplayMedia(constraints) {
          let audioStream;
          if (constraints.audio) {
              audioStream = await navigator.mediaDevices.getUserMedia({
                  audio: constraints.audio,
              });
          }
          let screenStream;
          if (browserReport.getDisplayMedia) {
              screenStream = await navigator.mediaDevices.getDisplayMedia({
                  video: constraints.video,
              });
          }
          else {
              screenStream = await navigator.mediaDevices.getUserMedia({
                  video: constraints.video,
              });
          }
          if (audioStream) {
              screenStream.addTrack(audioStream.getAudioTracks()[0]);
          }
          return screenStream;
      }
      async updateDeivceInfo() {
          this.deviceInfo = await navigator.mediaDevices.enumerateDevices();
          const currentDeviceIds = this.deviceInfo.map(d => d.deviceId);
          const lastDeviceIds = Object.keys(this.deviceMap);
          let updateFlag = false;
          lastDeviceIds.forEach(deviceId => {
              // device 被拔出
              if (currentDeviceIds.indexOf(deviceId) === -1 && deviceId !== "@default") {
                  this.emit("device-remove", this.deviceMap[deviceId].device);
                  delete this.deviceMap[deviceId];
                  updateFlag = true;
              }
              else {
                  this.deviceMap[deviceId].tick += 1;
              }
          });
          currentDeviceIds.forEach((deviceId, index) => {
              // device 插入
              if (lastDeviceIds.indexOf(deviceId) === -1 && deviceId !== "@default") {
                  this.deviceMap[deviceId] = {
                      device: this.deviceInfo[index],
                      tick: 0,
                  };
                  this.emit("device-add", this.deviceMap[deviceId].device);
                  updateFlag = true;
              }
          });
          if (updateFlag) {
              this.emit("device-update", this.deviceInfo);
          }
      }
  }
  const deviceManager = new DeviceManager();

  /*
   * index.ts
   * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
   *
   * Distributed under terms of the MIT license.
  */

  exports.StreamModeSession = StreamModeSession;
  exports.TrackModeSession = TrackModeSession;
  exports.version = version;
  exports.log = log;
  exports.User = User;
  exports.Stream = Stream;
  exports.Track = Track;
  exports.AudioTrack = AudioTrack;
  exports.browserReport = browserReport;
  exports.isChromeExtensionAvailable = isChromeExtensionAvailable;
  exports.createCustomTrack = createCustomTrack;
  exports.REC_AUDIO_ENABLE = REC_AUDIO_ENABLE;
  exports.REC_VIDEO_ENABLE = REC_VIDEO_ENABLE;
  exports.REC_SCREEN_ENABLE = REC_SCREEN_ENABLE;
  exports.defaultMergeJob = defaultMergeJob;
  exports.DeviceManager = DeviceManager;
  exports.deviceManager = deviceManager;
  exports.AudioSourceTrack = AudioSourceTrack;
  exports.TrackMixingManager = TrackMixingManager;
  exports.StreamMixingManager = StreamMixingManager;
  exports.AudioEffectManager = AudioEffectManager;
  exports.AudioMusicManager = AudioMusicManager;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=pili-rtc-web-2.2.0.umd.js.map
