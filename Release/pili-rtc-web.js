(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.QNRTC = {}));
}(this, function (exports) { 'use strict';

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

  var defineProperty = _defineProperty;

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  var objectSpread = _objectSpread;

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

  function detectBrowser$1() {
    const originBrowser = detectBrowser_1();

    if (!navigator || !navigator.appVersion || !originBrowser) {
      return originBrowser;
    }

    const IChrome = /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/;
    const chromeInfo = IChrome.exec(window.navigator.appVersion);

    if (!chromeInfo || !chromeInfo[1]) {
      return originBrowser;
    }

    return objectSpread({}, originBrowser, {
      chromeVersion: chromeInfo[1]
    });
  }

  const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  const isChrome = !!window.chrome;
  const isIOS = navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i);
  const browser = detectBrowser$1() || {};

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
    } catch (e) {
      return false;
    }
  }

  function supportGetDisplayMedia() {
    const hasGetDisplayMediaAPI = navigator && navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia;
    const supportDisplaysurface = navigator && navigator.mediaDevices && navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.getSupportedConstraints().displaySurface; // 在 Firefox 支持标准的选择采集源之前，继续使用老的 API，因为反正都不需要插件

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
        disconnectAudioNode: true
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
          // TODO: 在 2.3.0 提测时候再开启 unifiedPlan: semver.gte(browser.version, "71.0.0"),
          unifiedPlan: false,
          supportTransceivers: true,
          supportRestartICE: true,
          getReceivers: semver_24(browser.version, "55.0.0"),
          needH264FmtpLine: semver_25(browser.version, "51.0.0"),
          audioContextOptions: true,
          getDisplayMedia: supportGetDisplayMedia(),
          disconnectAudioNode: true
        };

      case "ios":
      case "safari":
        return {
          support: semver_24(browser.version, "11.0.0"),
          replaceTrack: semver_24(browser.version, "11.0.0"),
          stats: false,
          ondevicechange: false,
          connectionState: true,
          mediaStreamDest: semver_24(browser.version, "12.0.0"),
          screenSharing: false,
          unifiedPlan: semver_24(browser.version, "12.1.0"),
          supportTransceivers: true,
          minMaxWithIdeal: false,
          supportRestartICE: true,
          getReceivers: true,
          audioContextOptions: true,
          getDisplayMedia: supportGetDisplayMedia(),
          disconnectAudioNode: false
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
          disconnectAudioNode: true
        };

      default:
        return {
          support: baseSupportCheck(),
          supportRestartICE: true,
          getDisplayMedia: supportGetDisplayMedia(),
          disconnectAudioNode: true
        };
    }
  }

  const browserReport = browserCheck();

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

        const r = typeof c[key] === "object" ? c[key] : {
          ideal: c[key]
        };

        if (r.exact !== undefined && typeof r.exact === "number") {
          r.min = r.max = r.exact;
        }

        const oldname_ = function (prefix, name) {
          if (prefix) {
            return prefix + name.charAt(0).toUpperCase() + name.slice(1);
          }

          return name === "deviceId" ? "sourceId" : name;
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
          } else {
            oc[oldname_("", key)] = r.ideal;
            cc.optional.push(oc);
          }
        }

        if (r.exact !== undefined && typeof r.exact !== "number") {
          cc.mandatory = cc.mandatory || {};
          cc.mandatory[oldname_("", key)] = r.exact;
        } else {
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
        face = face && (typeof face === "object" ? face : {
          ideal: face
        });
        const getSupportedFacingModeLies = semver_21(browser.version, "66.0.0");

        if (face && (face.exact === "user" || face.exact === "environment" || face.ideal === "user" || face.ideal === "environment") && !(navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.getSupportedConstraints().facingMode && !getSupportedFacingModeLies)) {
          delete constraints.video.facingMode;
          let matches = undefined;

          if (face.exact === "environment" || face.ideal === "environment") {
            matches = ["back", "rear"];
          } else if (face.exact === "user" || face.ideal === "user") {
            matches = ["front"];
          }

          if (matches) {
            // Look for matches in label, or use last cam for back (typical).
            return navigator.mediaDevices.enumerateDevices().then(devices => {
              devices = devices.filter(d => d.kind === "videoinput");
              let dev = devices.find(d => matches.some(match => d.label.toLowerCase().includes(match)));

              if (!dev && devices.length && matches.includes("back")) {
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
              return func(constraints);
            });
          }
        }

        constraints.video = constraintsToChrome_(constraints.video);
      }

      return func(constraints);
    }; // Returns the result of getUserMedia as a Promise.


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
            const kinds = {
              audio: "audioinput",
              video: "videoinput"
            };
            return window.MediaStreamTrack.getSources(devices => {
              resolve(devices.map(device => ({
                label: device.label,
                kind: kinds[device.kind],
                deviceId: device.id,
                groupId: ""
              })));
            });
          });
        }

      };
    }

    if (!navigator.mediaDevices.getSupportedConstraints) {
      navigator.mediaDevices.getSupportedConstraints = () => {
        return {
          deviceId: true,
          echoCancellation: true,
          facingMode: true,
          frameRate: true,
          height: true,
          width: true
        };
      };
    } // A shim for getUserMedia method on the mediaDevices object.
    // TODO(KaptenJansson) remove once implemented in Chrome stable.


    if (!navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        return getUserMediaPromise_(constraints);
      };
    } else {
      // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
      // function which returns a Promise, it does not accept spec-style
      // constraints.
      const origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);

      navigator.mediaDevices.getUserMedia = function (cs) {
        return shimConstraints_(cs, c => origGetUserMedia(c).then(stream => {
          if (c.audio && !stream.getAudioTracks().length || c.video && !stream.getVideoTracks().length) {
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
      return navigator.mozGetUserMedia(constraints, onSuccess, e => {
        onError(e);
      });
    }; // Returns the result of getUserMedia as a Promise.


    const getUserMediaPromise_ = function (constraints) {
      return new Promise((resolve, reject) => {
        getUserMedia_(constraints, resolve, reject);
      });
    };

    if (!navigator.mediaDevices) {
      navigator.mediaDevices = {
        getUserMedia: getUserMediaPromise_,

        addEventListener() {},

        removeEventListener() {}

      };
    }

    navigator.mediaDevices.enumerateDevices = navigator.mediaDevices.enumerateDevices || function () {
      return new Promise(resolve => {
        const infos = [{
          kind: "audioinput",
          deviceId: "default",
          label: "",
          groupId: ""
        }, {
          kind: "videoinput",
          deviceId: "default",
          label: "",
          groupId: ""
        }];
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

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  var objectWithoutPropertiesLoose = _objectWithoutPropertiesLoose;

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = objectWithoutPropertiesLoose(source, excluded);
    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  var objectWithoutProperties = _objectWithoutProperties;

  /*
   * device.ts
   * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
   *
   * Distributed under terms of the MIT license.
  */
  const REC_AUDIO_ENABLE = config => {
    return !!config && !!config.audio && config.audio.enabled;
  };
  const REC_VIDEO_ENABLE = config => {
    return !!config && !!config.video && config.video.enabled;
  };
  const REC_SCREEN_ENABLE = config => {
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

  (function (TrackSourceType) {
    TrackSourceType[TrackSourceType["NORMAL"] = 0] = "NORMAL";
    TrackSourceType[TrackSourceType["EXTERNAL"] = 1] = "EXTERNAL";
    TrackSourceType[TrackSourceType["MIXING"] = 2] = "MIXING";
  })(exports.TrackSourceType || (exports.TrackSourceType = {}));

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
    stretchMode: "aspectFill"
  };

  (function (AudioSourceState) {
    AudioSourceState["IDLE"] = "idle";
    AudioSourceState["LOADING"] = "loading";
    AudioSourceState["PLAY"] = "play";
    AudioSourceState["PAUSE"] = "pause";
    AudioSourceState["END"] = "end";
  })(exports.AudioSourceState || (exports.AudioSourceState = {}));

  const QosEventType = {
    Init: 1,
    UnInit: 2,
    JoinRoom: 3,
    MCSAuth: 4,
    SignalAuth: 5,
    LeaveRoom: 6,
    PublisherPC: 7,
    PublishTracks: 8,
    UnPublishTracks: 9,
    SubscriberPC: 10,
    SubscribeTracks: 11,
    UnSubscribeTracks: 13,
    MuteTracks: 14,
    ICEConnectionState: 15,
    CallbackStatistics: 16,
    KickoutUser: 17,
    RoomStateChanged: 18,
    AudioDeviceInOut: 19,
    VideoDeviceInOut: 20,
    SDKError: 21,
    ApplicationState: 22,
    CreateMergeJob: 24,
    UpdateMergeTracks: 25,
    StopMerge: 26,
    DeviceChanged: 28,
    DefaultSetting: 29,
    MediaStatistics: 30,
    AbnormalDisconnect: 31
  };

  var fingerprint2 = createCommonjsModule(function (module) {
    /*
    * Fingerprintjs2 2.0.5 - Modern & flexible browser fingerprint library v2
    * https://github.com/Valve/fingerprintjs2
    * Copyright (c) 2015 Valentin Vasilyev (valentin.vasilyev@outlook.com)
    * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
    *
    * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
    * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
    * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
    * ARE DISCLAIMED. IN NO EVENT SHALL VALENTIN VASILYEV BE LIABLE FOR ANY
    * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
    * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
    * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
    * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
    * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
    * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    */

    /* global define */
    (function (name, context, definition) {

      if (typeof window !== 'undefined' && typeof undefined === 'function' && undefined.amd) {
        undefined(definition);
      } else if (module.exports) {
        module.exports = definition();
      } else if (context.exports) {
        context.exports = definition();
      } else {
        context[name] = definition();
      }
    })('Fingerprint2', commonjsGlobal, function () {
      //
      // Given two 64bit ints (as an array of two 32bit ints) returns the two
      // added together as a 64bit int (as an array of two 32bit ints).
      //

      var x64Add = function (m, n) {
        m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff];
        n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff];
        var o = [0, 0, 0, 0];
        o[3] += m[3] + n[3];
        o[2] += o[3] >>> 16;
        o[3] &= 0xffff;
        o[2] += m[2] + n[2];
        o[1] += o[2] >>> 16;
        o[2] &= 0xffff;
        o[1] += m[1] + n[1];
        o[0] += o[1] >>> 16;
        o[1] &= 0xffff;
        o[0] += m[0] + n[0];
        o[0] &= 0xffff;
        return [o[0] << 16 | o[1], o[2] << 16 | o[3]];
      }; //
      // Given two 64bit ints (as an array of two 32bit ints) returns the two
      // multiplied together as a 64bit int (as an array of two 32bit ints).
      //


      var x64Multiply = function (m, n) {
        m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff];
        n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff];
        var o = [0, 0, 0, 0];
        o[3] += m[3] * n[3];
        o[2] += o[3] >>> 16;
        o[3] &= 0xffff;
        o[2] += m[2] * n[3];
        o[1] += o[2] >>> 16;
        o[2] &= 0xffff;
        o[2] += m[3] * n[2];
        o[1] += o[2] >>> 16;
        o[2] &= 0xffff;
        o[1] += m[1] * n[3];
        o[0] += o[1] >>> 16;
        o[1] &= 0xffff;
        o[1] += m[2] * n[2];
        o[0] += o[1] >>> 16;
        o[1] &= 0xffff;
        o[1] += m[3] * n[1];
        o[0] += o[1] >>> 16;
        o[1] &= 0xffff;
        o[0] += m[0] * n[3] + m[1] * n[2] + m[2] * n[1] + m[3] * n[0];
        o[0] &= 0xffff;
        return [o[0] << 16 | o[1], o[2] << 16 | o[3]];
      }; //
      // Given a 64bit int (as an array of two 32bit ints) and an int
      // representing a number of bit positions, returns the 64bit int (as an
      // array of two 32bit ints) rotated left by that number of positions.
      //


      var x64Rotl = function (m, n) {
        n %= 64;

        if (n === 32) {
          return [m[1], m[0]];
        } else if (n < 32) {
          return [m[0] << n | m[1] >>> 32 - n, m[1] << n | m[0] >>> 32 - n];
        } else {
          n -= 32;
          return [m[1] << n | m[0] >>> 32 - n, m[0] << n | m[1] >>> 32 - n];
        }
      }; //
      // Given a 64bit int (as an array of two 32bit ints) and an int
      // representing a number of bit positions, returns the 64bit int (as an
      // array of two 32bit ints) shifted left by that number of positions.
      //


      var x64LeftShift = function (m, n) {
        n %= 64;

        if (n === 0) {
          return m;
        } else if (n < 32) {
          return [m[0] << n | m[1] >>> 32 - n, m[1] << n];
        } else {
          return [m[1] << n - 32, 0];
        }
      }; //
      // Given two 64bit ints (as an array of two 32bit ints) returns the two
      // xored together as a 64bit int (as an array of two 32bit ints).
      //


      var x64Xor = function (m, n) {
        return [m[0] ^ n[0], m[1] ^ n[1]];
      }; //
      // Given a block, returns murmurHash3's final x64 mix of that block.
      // (`[0, h[0] >>> 1]` is a 33 bit unsigned right shift. This is the
      // only place where we need to right shift 64bit ints.)
      //


      var x64Fmix = function (h) {
        h = x64Xor(h, [0, h[0] >>> 1]);
        h = x64Multiply(h, [0xff51afd7, 0xed558ccd]);
        h = x64Xor(h, [0, h[0] >>> 1]);
        h = x64Multiply(h, [0xc4ceb9fe, 0x1a85ec53]);
        h = x64Xor(h, [0, h[0] >>> 1]);
        return h;
      }; //
      // Given a string and an optional seed as an int, returns a 128 bit
      // hash using the x64 flavor of MurmurHash3, as an unsigned hex.
      //


      var x64hash128 = function (key, seed) {
        key = key || '';
        seed = seed || 0;
        var remainder = key.length % 16;
        var bytes = key.length - remainder;
        var h1 = [0, seed];
        var h2 = [0, seed];
        var k1 = [0, 0];
        var k2 = [0, 0];
        var c1 = [0x87c37b91, 0x114253d5];
        var c2 = [0x4cf5ad43, 0x2745937f];

        for (var i = 0; i < bytes; i = i + 16) {
          k1 = [key.charCodeAt(i + 4) & 0xff | (key.charCodeAt(i + 5) & 0xff) << 8 | (key.charCodeAt(i + 6) & 0xff) << 16 | (key.charCodeAt(i + 7) & 0xff) << 24, key.charCodeAt(i) & 0xff | (key.charCodeAt(i + 1) & 0xff) << 8 | (key.charCodeAt(i + 2) & 0xff) << 16 | (key.charCodeAt(i + 3) & 0xff) << 24];
          k2 = [key.charCodeAt(i + 12) & 0xff | (key.charCodeAt(i + 13) & 0xff) << 8 | (key.charCodeAt(i + 14) & 0xff) << 16 | (key.charCodeAt(i + 15) & 0xff) << 24, key.charCodeAt(i + 8) & 0xff | (key.charCodeAt(i + 9) & 0xff) << 8 | (key.charCodeAt(i + 10) & 0xff) << 16 | (key.charCodeAt(i + 11) & 0xff) << 24];
          k1 = x64Multiply(k1, c1);
          k1 = x64Rotl(k1, 31);
          k1 = x64Multiply(k1, c2);
          h1 = x64Xor(h1, k1);
          h1 = x64Rotl(h1, 27);
          h1 = x64Add(h1, h2);
          h1 = x64Add(x64Multiply(h1, [0, 5]), [0, 0x52dce729]);
          k2 = x64Multiply(k2, c2);
          k2 = x64Rotl(k2, 33);
          k2 = x64Multiply(k2, c1);
          h2 = x64Xor(h2, k2);
          h2 = x64Rotl(h2, 31);
          h2 = x64Add(h2, h1);
          h2 = x64Add(x64Multiply(h2, [0, 5]), [0, 0x38495ab5]);
        }

        k1 = [0, 0];
        k2 = [0, 0];

        switch (remainder) {
          case 15:
            k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 14)], 48));
          // fallthrough

          case 14:
            k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 13)], 40));
          // fallthrough

          case 13:
            k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 12)], 32));
          // fallthrough

          case 12:
            k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 11)], 24));
          // fallthrough

          case 11:
            k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 10)], 16));
          // fallthrough

          case 10:
            k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 9)], 8));
          // fallthrough

          case 9:
            k2 = x64Xor(k2, [0, key.charCodeAt(i + 8)]);
            k2 = x64Multiply(k2, c2);
            k2 = x64Rotl(k2, 33);
            k2 = x64Multiply(k2, c1);
            h2 = x64Xor(h2, k2);
          // fallthrough

          case 8:
            k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 7)], 56));
          // fallthrough

          case 7:
            k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 6)], 48));
          // fallthrough

          case 6:
            k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 5)], 40));
          // fallthrough

          case 5:
            k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 4)], 32));
          // fallthrough

          case 4:
            k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 3)], 24));
          // fallthrough

          case 3:
            k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 2)], 16));
          // fallthrough

          case 2:
            k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 1)], 8));
          // fallthrough

          case 1:
            k1 = x64Xor(k1, [0, key.charCodeAt(i)]);
            k1 = x64Multiply(k1, c1);
            k1 = x64Rotl(k1, 31);
            k1 = x64Multiply(k1, c2);
            h1 = x64Xor(h1, k1);
          // fallthrough
        }

        h1 = x64Xor(h1, [0, key.length]);
        h2 = x64Xor(h2, [0, key.length]);
        h1 = x64Add(h1, h2);
        h2 = x64Add(h2, h1);
        h1 = x64Fmix(h1);
        h2 = x64Fmix(h2);
        h1 = x64Add(h1, h2);
        h2 = x64Add(h2, h1);
        return ('00000000' + (h1[0] >>> 0).toString(16)).slice(-8) + ('00000000' + (h1[1] >>> 0).toString(16)).slice(-8) + ('00000000' + (h2[0] >>> 0).toString(16)).slice(-8) + ('00000000' + (h2[1] >>> 0).toString(16)).slice(-8);
      };

      var defaultOptions = {
        preprocessor: null,
        audio: {
          timeout: 1000,
          // On iOS 11, audio context can only be used in response to user interaction.
          // We require users to explicitly enable audio fingerprinting on iOS 11.
          // See https://stackoverflow.com/questions/46363048/onaudioprocess-not-called-on-ios11#46534088
          excludeIOS11: true
        },
        fonts: {
          swfContainerId: 'fingerprintjs2',
          swfPath: 'flash/compiled/FontList.swf',
          userDefinedFonts: [],
          extendedJsFonts: false
        },
        screen: {
          // To ensure consistent fingerprints when users rotate their mobile devices
          detectScreenOrientation: true
        },
        plugins: {
          sortPluginsFor: [/palemoon/i],
          excludeIE: false
        },
        extraComponents: [],
        excludes: {
          // Unreliable on Windows, see https://github.com/Valve/fingerprintjs2/issues/375
          'enumerateDevices': true,
          // devicePixelRatio depends on browser zoom, and it's impossible to detect browser zoom
          'pixelRatio': true,
          // DNT depends on incognito mode for some browsers (Chrome) and it's impossible to detect incognito mode
          'doNotTrack': true,
          // uses js fonts already
          'fontsFlash': true
        },
        NOT_AVAILABLE: 'not available',
        ERROR: 'error',
        EXCLUDED: 'excluded'
      };

      var each = function (obj, iterator) {
        if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
          obj.forEach(iterator);
        } else if (obj.length === +obj.length) {
          for (var i = 0, l = obj.length; i < l; i++) {
            iterator(obj[i], i, obj);
          }
        } else {
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              iterator(obj[key], key, obj);
            }
          }
        }
      };

      var map = function (obj, iterator) {
        var results = []; // Not using strict equality so that this acts as a
        // shortcut to checking for `null` and `undefined`.

        if (obj == null) {
          return results;
        }

        if (Array.prototype.map && obj.map === Array.prototype.map) {
          return obj.map(iterator);
        }

        each(obj, function (value, index, list) {
          results.push(iterator(value, index, list));
        });
        return results;
      };

      var extendSoft = function (target, source) {
        if (source == null) {
          return target;
        }

        var value;
        var key;

        for (key in source) {
          value = source[key];

          if (value != null && !Object.prototype.hasOwnProperty.call(target, key)) {
            target[key] = value;
          }
        }

        return target;
      }; // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices


      var enumerateDevicesKey = function (done, options) {
        if (!isEnumerateDevicesSupported()) {
          return done(options.NOT_AVAILABLE);
        }

        navigator.mediaDevices.enumerateDevices().then(function (devices) {
          done(devices.map(function (device) {
            return 'id=' + device.deviceId + ';gid=' + device.groupId + ';' + device.kind + ';' + device.label;
          }));
        }).catch(function (error) {
          done(error);
        });
      };

      var isEnumerateDevicesSupported = function () {
        return navigator.mediaDevices && navigator.mediaDevices.enumerateDevices;
      }; // Inspired by and based on https://github.com/cozylife/audio-fingerprint


      var audioKey = function (done, options) {
        var audioOptions = options.audio;

        if (audioOptions.excludeIOS11 && navigator.userAgent.match(/OS 11.+Version\/11.+Safari/)) {
          // See comment for excludeUserAgent and https://stackoverflow.com/questions/46363048/onaudioprocess-not-called-on-ios11#46534088
          return done(options.EXCLUDED);
        }

        var AudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;

        if (AudioContext == null) {
          return done(options.NOT_AVAILABLE);
        }

        var context = new AudioContext(1, 44100, 44100);
        var oscillator = context.createOscillator();
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(10000, context.currentTime);
        var compressor = context.createDynamicsCompressor();
        each([['threshold', -50], ['knee', 40], ['ratio', 12], ['reduction', -20], ['attack', 0], ['release', 0.25]], function (item) {
          if (compressor[item[0]] !== undefined && typeof compressor[item[0]].setValueAtTime === 'function') {
            compressor[item[0]].setValueAtTime(item[1], context.currentTime);
          }
        });
        oscillator.connect(compressor);
        compressor.connect(context.destination);
        oscillator.start(0);
        context.startRendering();
        var audioTimeoutId = setTimeout(function () {
          console.warn('Audio fingerprint timed out. Please report bug at https://github.com/Valve/fingerprintjs2 with your user agent: "' + navigator.userAgent + '".');

          context.oncomplete = function () {};

          context = null;
          return done('audioTimeout');
        }, audioOptions.timeout);

        context.oncomplete = function (event) {
          var fingerprint;

          try {
            clearTimeout(audioTimeoutId);
            fingerprint = event.renderedBuffer.getChannelData(0).slice(4500, 5000).reduce(function (acc, val) {
              return acc + Math.abs(val);
            }, 0).toString();
            oscillator.disconnect();
            compressor.disconnect();
          } catch (error) {
            done(error);
            return;
          }

          done(fingerprint);
        };
      };

      var UserAgent = function (done) {
        done(navigator.userAgent);
      };

      var languageKey = function (done, options) {
        done(navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || options.NOT_AVAILABLE);
      };

      var colorDepthKey = function (done, options) {
        done(window.screen.colorDepth || options.NOT_AVAILABLE);
      };

      var deviceMemoryKey = function (done, options) {
        done(navigator.deviceMemory || options.NOT_AVAILABLE);
      };

      var pixelRatioKey = function (done, options) {
        done(window.devicePixelRatio || options.NOT_AVAILABLE);
      };

      var screenResolutionKey = function (done, options) {
        done(getScreenResolution(options));
      };

      var getScreenResolution = function (options) {
        var resolution = [window.screen.width, window.screen.height];

        if (options.screen.detectScreenOrientation) {
          resolution.sort().reverse();
        }

        return resolution;
      };

      var availableScreenResolutionKey = function (done, options) {
        done(getAvailableScreenResolution(options));
      };

      var getAvailableScreenResolution = function (options) {
        if (window.screen.availWidth && window.screen.availHeight) {
          var available = [window.screen.availHeight, window.screen.availWidth];

          if (options.screen.detectScreenOrientation) {
            available.sort().reverse();
          }

          return available;
        } // headless browsers


        return options.NOT_AVAILABLE;
      };

      var timezoneOffset = function (done) {
        done(new Date().getTimezoneOffset());
      };

      var timezone = function (done, options) {
        if (window.Intl && window.Intl.DateTimeFormat) {
          done(new window.Intl.DateTimeFormat().resolvedOptions().timeZone);
          return;
        }

        done(options.NOT_AVAILABLE);
      };

      var sessionStorageKey = function (done, options) {
        done(hasSessionStorage(options));
      };

      var localStorageKey = function (done, options) {
        done(hasLocalStorage(options));
      };

      var indexedDbKey = function (done, options) {
        done(hasIndexedDB(options));
      };

      var addBehaviorKey = function (done) {
        // body might not be defined at this point or removed programmatically
        done(!!(document.body && document.body.addBehavior));
      };

      var openDatabaseKey = function (done) {
        done(!!window.openDatabase);
      };

      var cpuClassKey = function (done, options) {
        done(getNavigatorCpuClass(options));
      };

      var platformKey = function (done, options) {
        done(getNavigatorPlatform(options));
      };

      var doNotTrackKey = function (done, options) {
        done(getDoNotTrack(options));
      };

      var canvasKey = function (done, options) {
        if (isCanvasSupported()) {
          done(getCanvasFp(options));
          return;
        }

        done(options.NOT_AVAILABLE);
      };

      var webglKey = function (done, options) {
        if (isWebGlSupported()) {
          done(getWebglFp());
          return;
        }

        done(options.NOT_AVAILABLE);
      };

      var webglVendorAndRendererKey = function (done) {
        if (isWebGlSupported()) {
          done(getWebglVendorAndRenderer());
          return;
        }

        done();
      };

      var adBlockKey = function (done) {
        done(getAdBlock());
      };

      var hasLiedLanguagesKey = function (done) {
        done(getHasLiedLanguages());
      };

      var hasLiedResolutionKey = function (done) {
        done(getHasLiedResolution());
      };

      var hasLiedOsKey = function (done) {
        done(getHasLiedOs());
      };

      var hasLiedBrowserKey = function (done) {
        done(getHasLiedBrowser());
      }; // flash fonts (will increase fingerprinting time 20X to ~ 130-150ms)


      var flashFontsKey = function (done, options) {
        // we do flash if swfobject is loaded
        if (!hasSwfObjectLoaded()) {
          return done('swf object not loaded');
        }

        if (!hasMinFlashInstalled()) {
          return done('flash not installed');
        }

        if (!options.fonts.swfPath) {
          return done('missing options.fonts.swfPath');
        }

        loadSwfAndDetectFonts(function (fonts) {
          done(fonts);
        }, options);
      }; // kudos to http://www.lalit.org/lab/javascript-css-font-detect/


      var jsFontsKey = function (done, options) {
        // a font will be compared against all the three default fonts.
        // and if it doesn't match all 3 then that font is not available.
        var baseFonts = ['monospace', 'sans-serif', 'serif'];
        var fontList = ['Andale Mono', 'Arial', 'Arial Black', 'Arial Hebrew', 'Arial MT', 'Arial Narrow', 'Arial Rounded MT Bold', 'Arial Unicode MS', 'Bitstream Vera Sans Mono', 'Book Antiqua', 'Bookman Old Style', 'Calibri', 'Cambria', 'Cambria Math', 'Century', 'Century Gothic', 'Century Schoolbook', 'Comic Sans', 'Comic Sans MS', 'Consolas', 'Courier', 'Courier New', 'Geneva', 'Georgia', 'Helvetica', 'Helvetica Neue', 'Impact', 'Lucida Bright', 'Lucida Calligraphy', 'Lucida Console', 'Lucida Fax', 'LUCIDA GRANDE', 'Lucida Handwriting', 'Lucida Sans', 'Lucida Sans Typewriter', 'Lucida Sans Unicode', 'Microsoft Sans Serif', 'Monaco', 'Monotype Corsiva', 'MS Gothic', 'MS Outlook', 'MS PGothic', 'MS Reference Sans Serif', 'MS Sans Serif', 'MS Serif', 'MYRIAD', 'MYRIAD PRO', 'Palatino', 'Palatino Linotype', 'Segoe Print', 'Segoe Script', 'Segoe UI', 'Segoe UI Light', 'Segoe UI Semibold', 'Segoe UI Symbol', 'Tahoma', 'Times', 'Times New Roman', 'Times New Roman PS', 'Trebuchet MS', 'Verdana', 'Wingdings', 'Wingdings 2', 'Wingdings 3'];

        if (options.fonts.extendedJsFonts) {
          var extendedFontList = ['Abadi MT Condensed Light', 'Academy Engraved LET', 'ADOBE CASLON PRO', 'Adobe Garamond', 'ADOBE GARAMOND PRO', 'Agency FB', 'Aharoni', 'Albertus Extra Bold', 'Albertus Medium', 'Algerian', 'Amazone BT', 'American Typewriter', 'American Typewriter Condensed', 'AmerType Md BT', 'Andalus', 'Angsana New', 'AngsanaUPC', 'Antique Olive', 'Aparajita', 'Apple Chancery', 'Apple Color Emoji', 'Apple SD Gothic Neo', 'Arabic Typesetting', 'ARCHER', 'ARNO PRO', 'Arrus BT', 'Aurora Cn BT', 'AvantGarde Bk BT', 'AvantGarde Md BT', 'AVENIR', 'Ayuthaya', 'Bandy', 'Bangla Sangam MN', 'Bank Gothic', 'BankGothic Md BT', 'Baskerville', 'Baskerville Old Face', 'Batang', 'BatangChe', 'Bauer Bodoni', 'Bauhaus 93', 'Bazooka', 'Bell MT', 'Bembo', 'Benguiat Bk BT', 'Berlin Sans FB', 'Berlin Sans FB Demi', 'Bernard MT Condensed', 'BernhardFashion BT', 'BernhardMod BT', 'Big Caslon', 'BinnerD', 'Blackadder ITC', 'BlairMdITC TT', 'Bodoni 72', 'Bodoni 72 Oldstyle', 'Bodoni 72 Smallcaps', 'Bodoni MT', 'Bodoni MT Black', 'Bodoni MT Condensed', 'Bodoni MT Poster Compressed', 'Bookshelf Symbol 7', 'Boulder', 'Bradley Hand', 'Bradley Hand ITC', 'Bremen Bd BT', 'Britannic Bold', 'Broadway', 'Browallia New', 'BrowalliaUPC', 'Brush Script MT', 'Californian FB', 'Calisto MT', 'Calligrapher', 'Candara', 'CaslonOpnface BT', 'Castellar', 'Centaur', 'Cezanne', 'CG Omega', 'CG Times', 'Chalkboard', 'Chalkboard SE', 'Chalkduster', 'Charlesworth', 'Charter Bd BT', 'Charter BT', 'Chaucer', 'ChelthmITC Bk BT', 'Chiller', 'Clarendon', 'Clarendon Condensed', 'CloisterBlack BT', 'Cochin', 'Colonna MT', 'Constantia', 'Cooper Black', 'Copperplate', 'Copperplate Gothic', 'Copperplate Gothic Bold', 'Copperplate Gothic Light', 'CopperplGoth Bd BT', 'Corbel', 'Cordia New', 'CordiaUPC', 'Cornerstone', 'Coronet', 'Cuckoo', 'Curlz MT', 'DaunPenh', 'Dauphin', 'David', 'DB LCD Temp', 'DELICIOUS', 'Denmark', 'DFKai-SB', 'Didot', 'DilleniaUPC', 'DIN', 'DokChampa', 'Dotum', 'DotumChe', 'Ebrima', 'Edwardian Script ITC', 'Elephant', 'English 111 Vivace BT', 'Engravers MT', 'EngraversGothic BT', 'Eras Bold ITC', 'Eras Demi ITC', 'Eras Light ITC', 'Eras Medium ITC', 'EucrosiaUPC', 'Euphemia', 'Euphemia UCAS', 'EUROSTILE', 'Exotc350 Bd BT', 'FangSong', 'Felix Titling', 'Fixedsys', 'FONTIN', 'Footlight MT Light', 'Forte', 'FrankRuehl', 'Fransiscan', 'Freefrm721 Blk BT', 'FreesiaUPC', 'Freestyle Script', 'French Script MT', 'FrnkGothITC Bk BT', 'Fruitger', 'FRUTIGER', 'Futura', 'Futura Bk BT', 'Futura Lt BT', 'Futura Md BT', 'Futura ZBlk BT', 'FuturaBlack BT', 'Gabriola', 'Galliard BT', 'Gautami', 'Geeza Pro', 'Geometr231 BT', 'Geometr231 Hv BT', 'Geometr231 Lt BT', 'GeoSlab 703 Lt BT', 'GeoSlab 703 XBd BT', 'Gigi', 'Gill Sans', 'Gill Sans MT', 'Gill Sans MT Condensed', 'Gill Sans MT Ext Condensed Bold', 'Gill Sans Ultra Bold', 'Gill Sans Ultra Bold Condensed', 'Gisha', 'Gloucester MT Extra Condensed', 'GOTHAM', 'GOTHAM BOLD', 'Goudy Old Style', 'Goudy Stout', 'GoudyHandtooled BT', 'GoudyOLSt BT', 'Gujarati Sangam MN', 'Gulim', 'GulimChe', 'Gungsuh', 'GungsuhChe', 'Gurmukhi MN', 'Haettenschweiler', 'Harlow Solid Italic', 'Harrington', 'Heather', 'Heiti SC', 'Heiti TC', 'HELV', 'Herald', 'High Tower Text', 'Hiragino Kaku Gothic ProN', 'Hiragino Mincho ProN', 'Hoefler Text', 'Humanst 521 Cn BT', 'Humanst521 BT', 'Humanst521 Lt BT', 'Imprint MT Shadow', 'Incised901 Bd BT', 'Incised901 BT', 'Incised901 Lt BT', 'INCONSOLATA', 'Informal Roman', 'Informal011 BT', 'INTERSTATE', 'IrisUPC', 'Iskoola Pota', 'JasmineUPC', 'Jazz LET', 'Jenson', 'Jester', 'Jokerman', 'Juice ITC', 'Kabel Bk BT', 'Kabel Ult BT', 'Kailasa', 'KaiTi', 'Kalinga', 'Kannada Sangam MN', 'Kartika', 'Kaufmann Bd BT', 'Kaufmann BT', 'Khmer UI', 'KodchiangUPC', 'Kokila', 'Korinna BT', 'Kristen ITC', 'Krungthep', 'Kunstler Script', 'Lao UI', 'Latha', 'Leelawadee', 'Letter Gothic', 'Levenim MT', 'LilyUPC', 'Lithograph', 'Lithograph Light', 'Long Island', 'Lydian BT', 'Magneto', 'Maiandra GD', 'Malayalam Sangam MN', 'Malgun Gothic', 'Mangal', 'Marigold', 'Marion', 'Marker Felt', 'Market', 'Marlett', 'Matisse ITC', 'Matura MT Script Capitals', 'Meiryo', 'Meiryo UI', 'Microsoft Himalaya', 'Microsoft JhengHei', 'Microsoft New Tai Lue', 'Microsoft PhagsPa', 'Microsoft Tai Le', 'Microsoft Uighur', 'Microsoft YaHei', 'Microsoft Yi Baiti', 'MingLiU', 'MingLiU_HKSCS', 'MingLiU_HKSCS-ExtB', 'MingLiU-ExtB', 'Minion', 'Minion Pro', 'Miriam', 'Miriam Fixed', 'Mistral', 'Modern', 'Modern No. 20', 'Mona Lisa Solid ITC TT', 'Mongolian Baiti', 'MONO', 'MoolBoran', 'Mrs Eaves', 'MS LineDraw', 'MS Mincho', 'MS PMincho', 'MS Reference Specialty', 'MS UI Gothic', 'MT Extra', 'MUSEO', 'MV Boli', 'Nadeem', 'Narkisim', 'NEVIS', 'News Gothic', 'News GothicMT', 'NewsGoth BT', 'Niagara Engraved', 'Niagara Solid', 'Noteworthy', 'NSimSun', 'Nyala', 'OCR A Extended', 'Old Century', 'Old English Text MT', 'Onyx', 'Onyx BT', 'OPTIMA', 'Oriya Sangam MN', 'OSAKA', 'OzHandicraft BT', 'Palace Script MT', 'Papyrus', 'Parchment', 'Party LET', 'Pegasus', 'Perpetua', 'Perpetua Titling MT', 'PetitaBold', 'Pickwick', 'Plantagenet Cherokee', 'Playbill', 'PMingLiU', 'PMingLiU-ExtB', 'Poor Richard', 'Poster', 'PosterBodoni BT', 'PRINCETOWN LET', 'Pristina', 'PTBarnum BT', 'Pythagoras', 'Raavi', 'Rage Italic', 'Ravie', 'Ribbon131 Bd BT', 'Rockwell', 'Rockwell Condensed', 'Rockwell Extra Bold', 'Rod', 'Roman', 'Sakkal Majalla', 'Santa Fe LET', 'Savoye LET', 'Sceptre', 'Script', 'Script MT Bold', 'SCRIPTINA', 'Serifa', 'Serifa BT', 'Serifa Th BT', 'ShelleyVolante BT', 'Sherwood', 'Shonar Bangla', 'Showcard Gothic', 'Shruti', 'Signboard', 'SILKSCREEN', 'SimHei', 'Simplified Arabic', 'Simplified Arabic Fixed', 'SimSun', 'SimSun-ExtB', 'Sinhala Sangam MN', 'Sketch Rockwell', 'Skia', 'Small Fonts', 'Snap ITC', 'Snell Roundhand', 'Socket', 'Souvenir Lt BT', 'Staccato222 BT', 'Steamer', 'Stencil', 'Storybook', 'Styllo', 'Subway', 'Swis721 BlkEx BT', 'Swiss911 XCm BT', 'Sylfaen', 'Synchro LET', 'System', 'Tamil Sangam MN', 'Technical', 'Teletype', 'Telugu Sangam MN', 'Tempus Sans ITC', 'Terminal', 'Thonburi', 'Traditional Arabic', 'Trajan', 'TRAJAN PRO', 'Tristan', 'Tubular', 'Tunga', 'Tw Cen MT', 'Tw Cen MT Condensed', 'Tw Cen MT Condensed Extra Bold', 'TypoUpright BT', 'Unicorn', 'Univers', 'Univers CE 55 Medium', 'Univers Condensed', 'Utsaah', 'Vagabond', 'Vani', 'Vijaya', 'Viner Hand ITC', 'VisualUI', 'Vivaldi', 'Vladimir Script', 'Vrinda', 'Westminster', 'WHITNEY', 'Wide Latin', 'ZapfEllipt BT', 'ZapfHumnst BT', 'ZapfHumnst Dm BT', 'Zapfino', 'Zurich BlkEx BT', 'Zurich Ex BT', 'ZWAdobeF'];
          fontList = fontList.concat(extendedFontList);
        }

        fontList = fontList.concat(options.fonts.userDefinedFonts); // remove duplicate fonts

        fontList = fontList.filter(function (font, position) {
          return fontList.indexOf(font) === position;
        }); // we use m or w because these two characters take up the maximum width.
        // And we use a LLi so that the same matching fonts can get separated

        var testString = 'mmmmmmmmmmlli'; // we test using 72px font size, we may use any size. I guess larger the better.

        var testSize = '72px';
        var h = document.getElementsByTagName('body')[0]; // div to load spans for the base fonts

        var baseFontsDiv = document.createElement('div'); // div to load spans for the fonts to detect

        var fontsDiv = document.createElement('div');
        var defaultWidth = {};
        var defaultHeight = {}; // creates a span where the fonts will be loaded

        var createSpan = function () {
          var s = document.createElement('span');
          /*
           * We need this css as in some weird browser this
           * span elements shows up for a microSec which creates a
           * bad user experience
           */

          s.style.position = 'absolute';
          s.style.left = '-9999px';
          s.style.fontSize = testSize; // css font reset to reset external styles

          s.style.fontStyle = 'normal';
          s.style.fontWeight = 'normal';
          s.style.letterSpacing = 'normal';
          s.style.lineBreak = 'auto';
          s.style.lineHeight = 'normal';
          s.style.textTransform = 'none';
          s.style.textAlign = 'left';
          s.style.textDecoration = 'none';
          s.style.textShadow = 'none';
          s.style.whiteSpace = 'normal';
          s.style.wordBreak = 'normal';
          s.style.wordSpacing = 'normal';
          s.innerHTML = testString;
          return s;
        }; // creates a span and load the font to detect and a base font for fallback


        var createSpanWithFonts = function (fontToDetect, baseFont) {
          var s = createSpan();
          s.style.fontFamily = "'" + fontToDetect + "'," + baseFont;
          return s;
        }; // creates spans for the base fonts and adds them to baseFontsDiv


        var initializeBaseFontsSpans = function () {
          var spans = [];

          for (var index = 0, length = baseFonts.length; index < length; index++) {
            var s = createSpan();
            s.style.fontFamily = baseFonts[index];
            baseFontsDiv.appendChild(s);
            spans.push(s);
          }

          return spans;
        }; // creates spans for the fonts to detect and adds them to fontsDiv


        var initializeFontsSpans = function () {
          var spans = {};

          for (var i = 0, l = fontList.length; i < l; i++) {
            var fontSpans = [];

            for (var j = 0, numDefaultFonts = baseFonts.length; j < numDefaultFonts; j++) {
              var s = createSpanWithFonts(fontList[i], baseFonts[j]);
              fontsDiv.appendChild(s);
              fontSpans.push(s);
            }

            spans[fontList[i]] = fontSpans; // Stores {fontName : [spans for that font]}
          }

          return spans;
        }; // checks if a font is available


        var isFontAvailable = function (fontSpans) {
          var detected = false;

          for (var i = 0; i < baseFonts.length; i++) {
            detected = fontSpans[i].offsetWidth !== defaultWidth[baseFonts[i]] || fontSpans[i].offsetHeight !== defaultHeight[baseFonts[i]];

            if (detected) {
              return detected;
            }
          }

          return detected;
        }; // create spans for base fonts


        var baseFontsSpans = initializeBaseFontsSpans(); // add the spans to the DOM

        h.appendChild(baseFontsDiv); // get the default width for the three base fonts

        for (var index = 0, length = baseFonts.length; index < length; index++) {
          defaultWidth[baseFonts[index]] = baseFontsSpans[index].offsetWidth; // width for the default font

          defaultHeight[baseFonts[index]] = baseFontsSpans[index].offsetHeight; // height for the default font
        } // create spans for fonts to detect


        var fontsSpans = initializeFontsSpans(); // add all the spans to the DOM

        h.appendChild(fontsDiv); // check available fonts

        var available = [];

        for (var i = 0, l = fontList.length; i < l; i++) {
          if (isFontAvailable(fontsSpans[fontList[i]])) {
            available.push(fontList[i]);
          }
        } // remove spans from DOM


        h.removeChild(fontsDiv);
        h.removeChild(baseFontsDiv);
        done(available);
      };

      var pluginsComponent = function (done, options) {
        if (isIE()) {
          if (!options.plugins.excludeIE) {
            done(getIEPlugins(options));
          } else {
            done(options.EXCLUDED);
          }
        } else {
          done(getRegularPlugins(options));
        }
      };

      var getRegularPlugins = function (options) {
        if (navigator.plugins == null) {
          return options.NOT_AVAILABLE;
        }

        var plugins = []; // plugins isn't defined in Node envs.

        for (var i = 0, l = navigator.plugins.length; i < l; i++) {
          if (navigator.plugins[i]) {
            plugins.push(navigator.plugins[i]);
          }
        } // sorting plugins only for those user agents, that we know randomize the plugins
        // every time we try to enumerate them


        if (pluginsShouldBeSorted(options)) {
          plugins = plugins.sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }

            if (a.name < b.name) {
              return -1;
            }

            return 0;
          });
        }

        return map(plugins, function (p) {
          var mimeTypes = map(p, function (mt) {
            return [mt.type, mt.suffixes];
          });
          return [p.name, p.description, mimeTypes];
        });
      };

      var getIEPlugins = function (options) {
        var result = [];

        if (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, 'ActiveXObject') || 'ActiveXObject' in window) {
          var names = ['AcroPDF.PDF', // Adobe PDF reader 7+
          'Adodb.Stream', 'AgControl.AgControl', // Silverlight
          'DevalVRXCtrl.DevalVRXCtrl.1', 'MacromediaFlashPaper.MacromediaFlashPaper', 'Msxml2.DOMDocument', 'Msxml2.XMLHTTP', 'PDF.PdfCtrl', // Adobe PDF reader 6 and earlier, brrr
          'QuickTime.QuickTime', // QuickTime
          'QuickTimeCheckObject.QuickTimeCheck.1', 'RealPlayer', 'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)', 'RealVideo.RealVideo(tm) ActiveX Control (32-bit)', 'Scripting.Dictionary', 'SWCtl.SWCtl', // ShockWave player
          'Shell.UIHelper', 'ShockwaveFlash.ShockwaveFlash', // flash plugin
          'Skype.Detection', 'TDCCtl.TDCCtl', 'WMPlayer.OCX', // Windows media player
          'rmocx.RealPlayer G2 Control', 'rmocx.RealPlayer G2 Control.1']; // starting to detect plugins in IE

          result = map(names, function (name) {
            try {
              // eslint-disable-next-line no-new
              new window.ActiveXObject(name);
              return name;
            } catch (e) {
              return options.ERROR;
            }
          });
        } else {
          result.push(options.NOT_AVAILABLE);
        }

        if (navigator.plugins) {
          result = result.concat(getRegularPlugins(options));
        }

        return result;
      };

      var pluginsShouldBeSorted = function (options) {
        var should = false;

        for (var i = 0, l = options.plugins.sortPluginsFor.length; i < l; i++) {
          var re = options.plugins.sortPluginsFor[i];

          if (navigator.userAgent.match(re)) {
            should = true;
            break;
          }
        }

        return should;
      };

      var touchSupportKey = function (done) {
        done(getTouchSupport());
      };

      var hardwareConcurrencyKey = function (done, options) {
        done(getHardwareConcurrency(options));
      };

      var hasSessionStorage = function (options) {
        try {
          return !!window.sessionStorage;
        } catch (e) {
          return options.ERROR; // SecurityError when referencing it means it exists
        }
      }; // https://bugzilla.mozilla.org/show_bug.cgi?id=781447


      var hasLocalStorage = function (options) {
        try {
          return !!window.localStorage;
        } catch (e) {
          return options.ERROR; // SecurityError when referencing it means it exists
        }
      };

      var hasIndexedDB = function (options) {
        try {
          return !!window.indexedDB;
        } catch (e) {
          return options.ERROR; // SecurityError when referencing it means it exists
        }
      };

      var getHardwareConcurrency = function (options) {
        if (navigator.hardwareConcurrency) {
          return navigator.hardwareConcurrency;
        }

        return options.NOT_AVAILABLE;
      };

      var getNavigatorCpuClass = function (options) {
        return navigator.cpuClass || options.NOT_AVAILABLE;
      };

      var getNavigatorPlatform = function (options) {
        if (navigator.platform) {
          return navigator.platform;
        } else {
          return options.NOT_AVAILABLE;
        }
      };

      var getDoNotTrack = function (options) {
        if (navigator.doNotTrack) {
          return navigator.doNotTrack;
        } else if (navigator.msDoNotTrack) {
          return navigator.msDoNotTrack;
        } else if (window.doNotTrack) {
          return window.doNotTrack;
        } else {
          return options.NOT_AVAILABLE;
        }
      }; // This is a crude and primitive touch screen detection.
      // It's not possible to currently reliably detect the  availability of a touch screen
      // with a JS, without actually subscribing to a touch event.
      // http://www.stucox.com/blog/you-cant-detect-a-touchscreen/
      // https://github.com/Modernizr/Modernizr/issues/548
      // method returns an array of 3 values:
      // maxTouchPoints, the success or failure of creating a TouchEvent,
      // and the availability of the 'ontouchstart' property


      var getTouchSupport = function () {
        var maxTouchPoints = 0;
        var touchEvent;

        if (typeof navigator.maxTouchPoints !== 'undefined') {
          maxTouchPoints = navigator.maxTouchPoints;
        } else if (typeof navigator.msMaxTouchPoints !== 'undefined') {
          maxTouchPoints = navigator.msMaxTouchPoints;
        }

        try {
          document.createEvent('TouchEvent');
          touchEvent = true;
        } catch (_) {
          touchEvent = false;
        }

        var touchStart = 'ontouchstart' in window;
        return [maxTouchPoints, touchEvent, touchStart];
      }; // https://www.browserleaks.com/canvas#how-does-it-work


      var getCanvasFp = function (options) {
        var result = []; // Very simple now, need to make it more complex (geo shapes etc)

        var canvas = document.createElement('canvas');
        canvas.width = 2000;
        canvas.height = 200;
        canvas.style.display = 'inline';
        var ctx = canvas.getContext('2d'); // detect browser support of canvas winding
        // http://blogs.adobe.com/webplatform/2013/01/30/winding-rules-in-canvas/
        // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/canvas/winding.js

        ctx.rect(0, 0, 10, 10);
        ctx.rect(2, 2, 6, 6);
        result.push('canvas winding:' + (ctx.isPointInPath(5, 5, 'evenodd') === false ? 'yes' : 'no'));
        ctx.textBaseline = 'alphabetic';
        ctx.fillStyle = '#f60';
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = '#069'; // https://github.com/Valve/fingerprintjs2/issues/66

        if (options.dontUseFakeFontInCanvas) {
          ctx.font = '11pt Arial';
        } else {
          ctx.font = '11pt no-real-font-123';
        }

        ctx.fillText('Cwm fjordbank glyphs vext quiz, \ud83d\ude03', 2, 15);
        ctx.fillStyle = 'rgba(102, 204, 0, 0.2)';
        ctx.font = '18pt Arial';
        ctx.fillText('Cwm fjordbank glyphs vext quiz, \ud83d\ude03', 4, 45); // canvas blending
        // http://blogs.adobe.com/webplatform/2013/01/28/blending-features-in-canvas/
        // http://jsfiddle.net/NDYV8/16/

        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = 'rgb(255,0,255)';
        ctx.beginPath();
        ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = 'rgb(0,255,255)';
        ctx.beginPath();
        ctx.arc(100, 50, 50, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = 'rgb(255,255,0)';
        ctx.beginPath();
        ctx.arc(75, 100, 50, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = 'rgb(255,0,255)'; // canvas winding
        // http://blogs.adobe.com/webplatform/2013/01/30/winding-rules-in-canvas/
        // http://jsfiddle.net/NDYV8/19/

        ctx.arc(75, 75, 75, 0, Math.PI * 2, true);
        ctx.arc(75, 75, 25, 0, Math.PI * 2, true);
        ctx.fill('evenodd');

        if (canvas.toDataURL) {
          result.push('canvas fp:' + canvas.toDataURL());
        }

        return result;
      };

      var getWebglFp = function () {
        var gl;

        var fa2s = function (fa) {
          gl.clearColor(0.0, 0.0, 0.0, 1.0);
          gl.enable(gl.DEPTH_TEST);
          gl.depthFunc(gl.LEQUAL);
          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
          return '[' + fa[0] + ', ' + fa[1] + ']';
        };

        var maxAnisotropy = function (gl) {
          var ext = gl.getExtension('EXT_texture_filter_anisotropic') || gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic') || gl.getExtension('MOZ_EXT_texture_filter_anisotropic');

          if (ext) {
            var anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);

            if (anisotropy === 0) {
              anisotropy = 2;
            }

            return anisotropy;
          } else {
            return null;
          }
        };

        gl = getWebglCanvas();

        if (!gl) {
          return null;
        } // WebGL fingerprinting is a combination of techniques, found in MaxMind antifraud script & Augur fingerprinting.
        // First it draws a gradient object with shaders and convers the image to the Base64 string.
        // Then it enumerates all WebGL extensions & capabilities and appends them to the Base64 string, resulting in a huge WebGL string, potentially very unique on each device
        // Since iOS supports webgl starting from version 8.1 and 8.1 runs on several graphics chips, the results may be different across ios devices, but we need to verify it.


        var result = [];
        var vShaderTemplate = 'attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}';
        var fShaderTemplate = 'precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}';
        var vertexPosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
        var vertices = new Float32Array([-0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.732134444, 0]);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        vertexPosBuffer.itemSize = 3;
        vertexPosBuffer.numItems = 3;
        var program = gl.createProgram();
        var vshader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vshader, vShaderTemplate);
        gl.compileShader(vshader);
        var fshader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fshader, fShaderTemplate);
        gl.compileShader(fshader);
        gl.attachShader(program, vshader);
        gl.attachShader(program, fshader);
        gl.linkProgram(program);
        gl.useProgram(program);
        program.vertexPosAttrib = gl.getAttribLocation(program, 'attrVertex');
        program.offsetUniform = gl.getUniformLocation(program, 'uniformOffset');
        gl.enableVertexAttribArray(program.vertexPosArray);
        gl.vertexAttribPointer(program.vertexPosAttrib, vertexPosBuffer.itemSize, gl.FLOAT, !1, 0, 0);
        gl.uniform2f(program.offsetUniform, 1, 1);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems);

        try {
          result.push(gl.canvas.toDataURL());
        } catch (e) {
          /* .toDataURL may be absent or broken (blocked by extension) */
        }

        result.push('extensions:' + (gl.getSupportedExtensions() || []).join(';'));
        result.push('webgl aliased line width range:' + fa2s(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)));
        result.push('webgl aliased point size range:' + fa2s(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)));
        result.push('webgl alpha bits:' + gl.getParameter(gl.ALPHA_BITS));
        result.push('webgl antialiasing:' + (gl.getContextAttributes().antialias ? 'yes' : 'no'));
        result.push('webgl blue bits:' + gl.getParameter(gl.BLUE_BITS));
        result.push('webgl depth bits:' + gl.getParameter(gl.DEPTH_BITS));
        result.push('webgl green bits:' + gl.getParameter(gl.GREEN_BITS));
        result.push('webgl max anisotropy:' + maxAnisotropy(gl));
        result.push('webgl max combined texture image units:' + gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
        result.push('webgl max cube map texture size:' + gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE));
        result.push('webgl max fragment uniform vectors:' + gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS));
        result.push('webgl max render buffer size:' + gl.getParameter(gl.MAX_RENDERBUFFER_SIZE));
        result.push('webgl max texture image units:' + gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
        result.push('webgl max texture size:' + gl.getParameter(gl.MAX_TEXTURE_SIZE));
        result.push('webgl max varying vectors:' + gl.getParameter(gl.MAX_VARYING_VECTORS));
        result.push('webgl max vertex attribs:' + gl.getParameter(gl.MAX_VERTEX_ATTRIBS));
        result.push('webgl max vertex texture image units:' + gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
        result.push('webgl max vertex uniform vectors:' + gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS));
        result.push('webgl max viewport dims:' + fa2s(gl.getParameter(gl.MAX_VIEWPORT_DIMS)));
        result.push('webgl red bits:' + gl.getParameter(gl.RED_BITS));
        result.push('webgl renderer:' + gl.getParameter(gl.RENDERER));
        result.push('webgl shading language version:' + gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
        result.push('webgl stencil bits:' + gl.getParameter(gl.STENCIL_BITS));
        result.push('webgl vendor:' + gl.getParameter(gl.VENDOR));
        result.push('webgl version:' + gl.getParameter(gl.VERSION));

        try {
          // Add the unmasked vendor and unmasked renderer if the debug_renderer_info extension is available
          var extensionDebugRendererInfo = gl.getExtension('WEBGL_debug_renderer_info');

          if (extensionDebugRendererInfo) {
            result.push('webgl unmasked vendor:' + gl.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL));
            result.push('webgl unmasked renderer:' + gl.getParameter(extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL));
          }
        } catch (e) {
          /* squelch */
        }

        if (!gl.getShaderPrecisionFormat) {
          return result;
        }

        each(['FLOAT', 'INT'], function (numType) {
          each(['VERTEX', 'FRAGMENT'], function (shader) {
            each(['HIGH', 'MEDIUM', 'LOW'], function (numSize) {
              each(['precision', 'rangeMin', 'rangeMax'], function (key) {
                var format = gl.getShaderPrecisionFormat(gl[shader + '_SHADER'], gl[numSize + '_' + numType])[key];

                if (key !== 'precision') {
                  key = 'precision ' + key;
                }

                var line = ['webgl ', shader.toLowerCase(), ' shader ', numSize.toLowerCase(), ' ', numType.toLowerCase(), ' ', key, ':', format].join('');
                result.push(line);
              });
            });
          });
        });
        return result;
      };

      var getWebglVendorAndRenderer = function () {
        /* This a subset of the WebGL fingerprint with a lot of entropy, while being reasonably browser-independent */
        try {
          var glContext = getWebglCanvas();
          var extensionDebugRendererInfo = glContext.getExtension('WEBGL_debug_renderer_info');
          return glContext.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL) + '~' + glContext.getParameter(extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL);
        } catch (e) {
          return null;
        }
      };

      var getAdBlock = function () {
        var ads = document.createElement('div');
        ads.innerHTML = '&nbsp;';
        ads.className = 'adsbox';
        var result = false;

        try {
          // body may not exist, that's why we need try/catch
          document.body.appendChild(ads);
          result = document.getElementsByClassName('adsbox')[0].offsetHeight === 0;
          document.body.removeChild(ads);
        } catch (e) {
          result = false;
        }

        return result;
      };

      var getHasLiedLanguages = function () {
        // We check if navigator.language is equal to the first language of navigator.languages
        if (typeof navigator.languages !== 'undefined') {
          try {
            var firstLanguages = navigator.languages[0].substr(0, 2);

            if (firstLanguages !== navigator.language.substr(0, 2)) {
              return true;
            }
          } catch (err) {
            return true;
          }
        }

        return false;
      };

      var getHasLiedResolution = function () {
        return window.screen.width < window.screen.availWidth || window.screen.height < window.screen.availHeight;
      };

      var getHasLiedOs = function () {
        var userAgent = navigator.userAgent.toLowerCase();
        var oscpu = navigator.oscpu;
        var platform = navigator.platform.toLowerCase();
        var os; // We extract the OS from the user agent (respect the order of the if else if statement)

        if (userAgent.indexOf('windows phone') >= 0) {
          os = 'Windows Phone';
        } else if (userAgent.indexOf('win') >= 0) {
          os = 'Windows';
        } else if (userAgent.indexOf('android') >= 0) {
          os = 'Android';
        } else if (userAgent.indexOf('linux') >= 0) {
          os = 'Linux';
        } else if (userAgent.indexOf('iphone') >= 0 || userAgent.indexOf('ipad') >= 0) {
          os = 'iOS';
        } else if (userAgent.indexOf('mac') >= 0) {
          os = 'Mac';
        } else {
          os = 'Other';
        } // We detect if the person uses a mobile device


        var mobileDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

        if (mobileDevice && os !== 'Windows Phone' && os !== 'Android' && os !== 'iOS' && os !== 'Other') {
          return true;
        } // We compare oscpu with the OS extracted from the UA


        if (typeof oscpu !== 'undefined') {
          oscpu = oscpu.toLowerCase();

          if (oscpu.indexOf('win') >= 0 && os !== 'Windows' && os !== 'Windows Phone') {
            return true;
          } else if (oscpu.indexOf('linux') >= 0 && os !== 'Linux' && os !== 'Android') {
            return true;
          } else if (oscpu.indexOf('mac') >= 0 && os !== 'Mac' && os !== 'iOS') {
            return true;
          } else if ((oscpu.indexOf('win') === -1 && oscpu.indexOf('linux') === -1 && oscpu.indexOf('mac') === -1) !== (os === 'Other')) {
            return true;
          }
        } // We compare platform with the OS extracted from the UA


        if (platform.indexOf('win') >= 0 && os !== 'Windows' && os !== 'Windows Phone') {
          return true;
        } else if ((platform.indexOf('linux') >= 0 || platform.indexOf('android') >= 0 || platform.indexOf('pike') >= 0) && os !== 'Linux' && os !== 'Android') {
          return true;
        } else if ((platform.indexOf('mac') >= 0 || platform.indexOf('ipad') >= 0 || platform.indexOf('ipod') >= 0 || platform.indexOf('iphone') >= 0) && os !== 'Mac' && os !== 'iOS') {
          return true;
        } else if ((platform.indexOf('win') === -1 && platform.indexOf('linux') === -1 && platform.indexOf('mac') === -1) !== (os === 'Other')) {
          return true;
        }

        return typeof navigator.plugins === 'undefined' && os !== 'Windows' && os !== 'Windows Phone';
      };

      var getHasLiedBrowser = function () {
        var userAgent = navigator.userAgent.toLowerCase();
        var productSub = navigator.productSub; // we extract the browser from the user agent (respect the order of the tests)

        var browser;

        if (userAgent.indexOf('firefox') >= 0) {
          browser = 'Firefox';
        } else if (userAgent.indexOf('opera') >= 0 || userAgent.indexOf('opr') >= 0) {
          browser = 'Opera';
        } else if (userAgent.indexOf('chrome') >= 0) {
          browser = 'Chrome';
        } else if (userAgent.indexOf('safari') >= 0) {
          browser = 'Safari';
        } else if (userAgent.indexOf('trident') >= 0) {
          browser = 'Internet Explorer';
        } else {
          browser = 'Other';
        }

        if ((browser === 'Chrome' || browser === 'Safari' || browser === 'Opera') && productSub !== '20030107') {
          return true;
        } // eslint-disable-next-line no-eval


        var tempRes = eval.toString().length;

        if (tempRes === 37 && browser !== 'Safari' && browser !== 'Firefox' && browser !== 'Other') {
          return true;
        } else if (tempRes === 39 && browser !== 'Internet Explorer' && browser !== 'Other') {
          return true;
        } else if (tempRes === 33 && browser !== 'Chrome' && browser !== 'Opera' && browser !== 'Other') {
          return true;
        } // We create an error to see how it is handled


        var errFirefox;

        try {
          // eslint-disable-next-line no-throw-literal
          throw 'a';
        } catch (err) {
          try {
            err.toSource();
            errFirefox = true;
          } catch (errOfErr) {
            errFirefox = false;
          }
        }

        return errFirefox && browser !== 'Firefox' && browser !== 'Other';
      };

      var isCanvasSupported = function () {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
      };

      var isWebGlSupported = function () {
        // code taken from Modernizr
        if (!isCanvasSupported()) {
          return false;
        }

        var glContext = getWebglCanvas();
        return !!window.WebGLRenderingContext && !!glContext;
      };

      var isIE = function () {
        if (navigator.appName === 'Microsoft Internet Explorer') {
          return true;
        } else if (navigator.appName === 'Netscape' && /Trident/.test(navigator.userAgent)) {
          // IE 11
          return true;
        }

        return false;
      };

      var hasSwfObjectLoaded = function () {
        return typeof window.swfobject !== 'undefined';
      };

      var hasMinFlashInstalled = function () {
        return window.swfobject.hasFlashPlayerVersion('9.0.0');
      };

      var addFlashDivNode = function (options) {
        var node = document.createElement('div');
        node.setAttribute('id', options.fonts.swfContainerId);
        document.body.appendChild(node);
      };

      var loadSwfAndDetectFonts = function (done, options) {
        var hiddenCallback = '___fp_swf_loaded';

        window[hiddenCallback] = function (fonts) {
          done(fonts);
        };

        var id = options.fonts.swfContainerId;
        addFlashDivNode();
        var flashvars = {
          onReady: hiddenCallback
        };
        var flashparams = {
          allowScriptAccess: 'always',
          menu: 'false'
        };
        window.swfobject.embedSWF(options.fonts.swfPath, id, '1', '1', '9.0.0', false, flashvars, flashparams, {});
      };

      var getWebglCanvas = function () {
        var canvas = document.createElement('canvas');
        var gl = null;

        try {
          gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        } catch (e) {
          /* squelch */
        }

        if (!gl) {
          gl = null;
        }

        return gl;
      };

      var components = [{
        key: 'userAgent',
        getData: UserAgent
      }, {
        key: 'language',
        getData: languageKey
      }, {
        key: 'colorDepth',
        getData: colorDepthKey
      }, {
        key: 'deviceMemory',
        getData: deviceMemoryKey
      }, {
        key: 'pixelRatio',
        getData: pixelRatioKey
      }, {
        key: 'hardwareConcurrency',
        getData: hardwareConcurrencyKey
      }, {
        key: 'screenResolution',
        getData: screenResolutionKey
      }, {
        key: 'availableScreenResolution',
        getData: availableScreenResolutionKey
      }, {
        key: 'timezoneOffset',
        getData: timezoneOffset
      }, {
        key: 'timezone',
        getData: timezone
      }, {
        key: 'sessionStorage',
        getData: sessionStorageKey
      }, {
        key: 'localStorage',
        getData: localStorageKey
      }, {
        key: 'indexedDb',
        getData: indexedDbKey
      }, {
        key: 'addBehavior',
        getData: addBehaviorKey
      }, {
        key: 'openDatabase',
        getData: openDatabaseKey
      }, {
        key: 'cpuClass',
        getData: cpuClassKey
      }, {
        key: 'platform',
        getData: platformKey
      }, {
        key: 'doNotTrack',
        getData: doNotTrackKey
      }, {
        key: 'plugins',
        getData: pluginsComponent
      }, {
        key: 'canvas',
        getData: canvasKey
      }, {
        key: 'webgl',
        getData: webglKey
      }, {
        key: 'webglVendorAndRenderer',
        getData: webglVendorAndRendererKey
      }, {
        key: 'adBlock',
        getData: adBlockKey
      }, {
        key: 'hasLiedLanguages',
        getData: hasLiedLanguagesKey
      }, {
        key: 'hasLiedResolution',
        getData: hasLiedResolutionKey
      }, {
        key: 'hasLiedOs',
        getData: hasLiedOsKey
      }, {
        key: 'hasLiedBrowser',
        getData: hasLiedBrowserKey
      }, {
        key: 'touchSupport',
        getData: touchSupportKey
      }, {
        key: 'fonts',
        getData: jsFontsKey,
        pauseBefore: true
      }, {
        key: 'fontsFlash',
        getData: flashFontsKey,
        pauseBefore: true
      }, {
        key: 'audio',
        getData: audioKey
      }, {
        key: 'enumerateDevices',
        getData: enumerateDevicesKey
      }];

      var Fingerprint2 = function (options) {
        throw new Error("'new Fingerprint()' is deprecated, see https://github.com/Valve/fingerprintjs2#upgrade-guide-from-182-to-200");
      };

      Fingerprint2.get = function (options, callback) {
        if (!callback) {
          callback = options;
          options = {};
        } else if (!options) {
          options = {};
        }

        extendSoft(options, defaultOptions);
        options.components = options.extraComponents.concat(components);
        var keys = {
          data: [],
          addPreprocessedComponent: function (key, value) {
            if (typeof options.preprocessor === 'function') {
              value = options.preprocessor(key, value);
            }

            keys.data.push({
              key: key,
              value: value
            });
          }
        };
        var i = -1;

        var chainComponents = function (alreadyWaited) {
          i += 1;

          if (i >= options.components.length) {
            // on finish
            callback(keys.data);
            return;
          }

          var component = options.components[i];

          if (options.excludes[component.key]) {
            chainComponents(false); // skip

            return;
          }

          if (!alreadyWaited && component.pauseBefore) {
            i -= 1;
            setTimeout(function () {
              chainComponents(true);
            }, 1);
            return;
          }

          try {
            component.getData(function (value) {
              keys.addPreprocessedComponent(component.key, value);
              chainComponents(false);
            }, options);
          } catch (error) {
            // main body error
            keys.addPreprocessedComponent(component.key, String(error));
            chainComponents(false);
          }
        };

        chainComponents(false);
      };

      Fingerprint2.getPromise = function (options) {
        return new Promise(function (resolve, reject) {
          Fingerprint2.get(options, resolve);
        });
      };

      Fingerprint2.getV18 = function (options, callback) {
        if (callback == null) {
          callback = options;
          options = {};
        }

        return Fingerprint2.get(options, function (components) {
          var newComponents = [];

          for (var i = 0; i < components.length; i++) {
            var component = components[i];

            if (component.value === (options.NOT_AVAILABLE || 'not available')) {
              newComponents.push({
                key: component.key,
                value: 'unknown'
              });
            } else if (component.key === 'plugins') {
              newComponents.push({
                key: 'plugins',
                value: map(component.value, function (p) {
                  var mimeTypes = map(p[2], function (mt) {
                    if (mt.join) {
                      return mt.join('~');
                    }

                    return mt;
                  }).join(',');
                  return [p[0], p[1], mimeTypes].join('::');
                })
              });
            } else if (['canvas', 'webgl'].indexOf(component.key) !== -1) {
              newComponents.push({
                key: component.key,
                value: component.value.join('~')
              });
            } else if (['sessionStorage', 'localStorage', 'indexedDb', 'addBehavior', 'openDatabase'].indexOf(component.key) !== -1) {
              if (component.value) {
                newComponents.push({
                  key: component.key,
                  value: 1
                });
              } else {
                // skip
                continue;
              }
            } else {
              if (component.value) {
                newComponents.push(component.value.join ? {
                  key: component.key,
                  value: component.value.join(';')
                } : component);
              } else {
                newComponents.push({
                  key: component.key,
                  value: component.value
                });
              }
            }
          }

          var murmur = x64hash128(map(newComponents, function (component) {
            return component.value;
          }).join('~~~'), 31);
          callback(murmur, newComponents);
        });
      };

      Fingerprint2.x64hash128 = x64hash128;
      Fingerprint2.VERSION = '2.0.0';
      return Fingerprint2;
    });
  });

  var localforage = createCommonjsModule(function (module, exports) {
    /*!
        localForage -- Offline Storage, Improved
        Version 1.7.3
        https://localforage.github.io/localForage
        (c) 2013-2017 Mozilla, Apache License 2.0
    */
    (function (f) {
      {
        module.exports = f();
      }
    })(function () {
      return function e(t, n, r) {
        function s(o, u) {
          if (!n[o]) {
            if (!t[o]) {
              var a = typeof commonjsRequire == "function" && commonjsRequire;
              if (!u && a) return a(o, !0);
              if (i) return i(o, !0);
              var f = new Error("Cannot find module '" + o + "'");
              throw f.code = "MODULE_NOT_FOUND", f;
            }

            var l = n[o] = {
              exports: {}
            };
            t[o][0].call(l.exports, function (e) {
              var n = t[o][1][e];
              return s(n ? n : e);
            }, l, l.exports, e, t, n, r);
          }

          return n[o].exports;
        }

        var i = typeof commonjsRequire == "function" && commonjsRequire;

        for (var o = 0; o < r.length; o++) s(r[o]);

        return s;
      }({
        1: [function (_dereq_, module, exports) {
          (function (global) {

            var Mutation = global.MutationObserver || global.WebKitMutationObserver;
            var scheduleDrain;
            {
              if (Mutation) {
                var called = 0;
                var observer = new Mutation(nextTick);
                var element = global.document.createTextNode('');
                observer.observe(element, {
                  characterData: true
                });

                scheduleDrain = function () {
                  element.data = called = ++called % 2;
                };
              } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
                var channel = new global.MessageChannel();
                channel.port1.onmessage = nextTick;

                scheduleDrain = function () {
                  channel.port2.postMessage(0);
                };
              } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
                scheduleDrain = function () {
                  // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
                  // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
                  var scriptEl = global.document.createElement('script');

                  scriptEl.onreadystatechange = function () {
                    nextTick();
                    scriptEl.onreadystatechange = null;
                    scriptEl.parentNode.removeChild(scriptEl);
                    scriptEl = null;
                  };

                  global.document.documentElement.appendChild(scriptEl);
                };
              } else {
                scheduleDrain = function () {
                  setTimeout(nextTick, 0);
                };
              }
            }
            var draining;
            var queue = []; //named nextTick for less confusing stack traces

            function nextTick() {
              draining = true;
              var i, oldQueue;
              var len = queue.length;

              while (len) {
                oldQueue = queue;
                queue = [];
                i = -1;

                while (++i < len) {
                  oldQueue[i]();
                }

                len = queue.length;
              }

              draining = false;
            }

            module.exports = immediate;

            function immediate(task) {
              if (queue.push(task) === 1 && !draining) {
                scheduleDrain();
              }
            }
          }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, {}],
        2: [function (_dereq_, module, exports) {

          var immediate = _dereq_(1);
          /* istanbul ignore next */


          function INTERNAL() {}

          var handlers = {};
          var REJECTED = ['REJECTED'];
          var FULFILLED = ['FULFILLED'];
          var PENDING = ['PENDING'];
          module.exports = Promise;

          function Promise(resolver) {
            if (typeof resolver !== 'function') {
              throw new TypeError('resolver must be a function');
            }

            this.state = PENDING;
            this.queue = [];
            this.outcome = void 0;

            if (resolver !== INTERNAL) {
              safelyResolveThenable(this, resolver);
            }
          }

          Promise.prototype["catch"] = function (onRejected) {
            return this.then(null, onRejected);
          };

          Promise.prototype.then = function (onFulfilled, onRejected) {
            if (typeof onFulfilled !== 'function' && this.state === FULFILLED || typeof onRejected !== 'function' && this.state === REJECTED) {
              return this;
            }

            var promise = new this.constructor(INTERNAL);

            if (this.state !== PENDING) {
              var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
              unwrap(promise, resolver, this.outcome);
            } else {
              this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
            }

            return promise;
          };

          function QueueItem(promise, onFulfilled, onRejected) {
            this.promise = promise;

            if (typeof onFulfilled === 'function') {
              this.onFulfilled = onFulfilled;
              this.callFulfilled = this.otherCallFulfilled;
            }

            if (typeof onRejected === 'function') {
              this.onRejected = onRejected;
              this.callRejected = this.otherCallRejected;
            }
          }

          QueueItem.prototype.callFulfilled = function (value) {
            handlers.resolve(this.promise, value);
          };

          QueueItem.prototype.otherCallFulfilled = function (value) {
            unwrap(this.promise, this.onFulfilled, value);
          };

          QueueItem.prototype.callRejected = function (value) {
            handlers.reject(this.promise, value);
          };

          QueueItem.prototype.otherCallRejected = function (value) {
            unwrap(this.promise, this.onRejected, value);
          };

          function unwrap(promise, func, value) {
            immediate(function () {
              var returnValue;

              try {
                returnValue = func(value);
              } catch (e) {
                return handlers.reject(promise, e);
              }

              if (returnValue === promise) {
                handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
              } else {
                handlers.resolve(promise, returnValue);
              }
            });
          }

          handlers.resolve = function (self, value) {
            var result = tryCatch(getThen, value);

            if (result.status === 'error') {
              return handlers.reject(self, result.value);
            }

            var thenable = result.value;

            if (thenable) {
              safelyResolveThenable(self, thenable);
            } else {
              self.state = FULFILLED;
              self.outcome = value;
              var i = -1;
              var len = self.queue.length;

              while (++i < len) {
                self.queue[i].callFulfilled(value);
              }
            }

            return self;
          };

          handlers.reject = function (self, error) {
            self.state = REJECTED;
            self.outcome = error;
            var i = -1;
            var len = self.queue.length;

            while (++i < len) {
              self.queue[i].callRejected(error);
            }

            return self;
          };

          function getThen(obj) {
            // Make sure we only access the accessor once as required by the spec
            var then = obj && obj.then;

            if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
              return function appyThen() {
                then.apply(obj, arguments);
              };
            }
          }

          function safelyResolveThenable(self, thenable) {
            // Either fulfill, reject or reject with error
            var called = false;

            function onError(value) {
              if (called) {
                return;
              }

              called = true;
              handlers.reject(self, value);
            }

            function onSuccess(value) {
              if (called) {
                return;
              }

              called = true;
              handlers.resolve(self, value);
            }

            function tryToUnwrap() {
              thenable(onSuccess, onError);
            }

            var result = tryCatch(tryToUnwrap);

            if (result.status === 'error') {
              onError(result.value);
            }
          }

          function tryCatch(func, value) {
            var out = {};

            try {
              out.value = func(value);
              out.status = 'success';
            } catch (e) {
              out.status = 'error';
              out.value = e;
            }

            return out;
          }

          Promise.resolve = resolve;

          function resolve(value) {
            if (value instanceof this) {
              return value;
            }

            return handlers.resolve(new this(INTERNAL), value);
          }

          Promise.reject = reject;

          function reject(reason) {
            var promise = new this(INTERNAL);
            return handlers.reject(promise, reason);
          }

          Promise.all = all;

          function all(iterable) {
            var self = this;

            if (Object.prototype.toString.call(iterable) !== '[object Array]') {
              return this.reject(new TypeError('must be an array'));
            }

            var len = iterable.length;
            var called = false;

            if (!len) {
              return this.resolve([]);
            }

            var values = new Array(len);
            var resolved = 0;
            var i = -1;
            var promise = new this(INTERNAL);

            while (++i < len) {
              allResolver(iterable[i], i);
            }

            return promise;

            function allResolver(value, i) {
              self.resolve(value).then(resolveFromAll, function (error) {
                if (!called) {
                  called = true;
                  handlers.reject(promise, error);
                }
              });

              function resolveFromAll(outValue) {
                values[i] = outValue;

                if (++resolved === len && !called) {
                  called = true;
                  handlers.resolve(promise, values);
                }
              }
            }
          }

          Promise.race = race;

          function race(iterable) {
            var self = this;

            if (Object.prototype.toString.call(iterable) !== '[object Array]') {
              return this.reject(new TypeError('must be an array'));
            }

            var len = iterable.length;
            var called = false;

            if (!len) {
              return this.resolve([]);
            }

            var i = -1;
            var promise = new this(INTERNAL);

            while (++i < len) {
              resolver(iterable[i]);
            }

            return promise;

            function resolver(value) {
              self.resolve(value).then(function (response) {
                if (!called) {
                  called = true;
                  handlers.resolve(promise, response);
                }
              }, function (error) {
                if (!called) {
                  called = true;
                  handlers.reject(promise, error);
                }
              });
            }
          }
        }, {
          "1": 1
        }],
        3: [function (_dereq_, module, exports) {
          (function (global) {

            if (typeof global.Promise !== 'function') {
              global.Promise = _dereq_(2);
            }
          }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, {
          "2": 2
        }],
        4: [function (_dereq_, module, exports) {

          var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
            return typeof obj;
          } : function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
          };

          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function getIDB() {
            /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
            try {
              if (typeof indexedDB !== 'undefined') {
                return indexedDB;
              }

              if (typeof webkitIndexedDB !== 'undefined') {
                return webkitIndexedDB;
              }

              if (typeof mozIndexedDB !== 'undefined') {
                return mozIndexedDB;
              }

              if (typeof OIndexedDB !== 'undefined') {
                return OIndexedDB;
              }

              if (typeof msIndexedDB !== 'undefined') {
                return msIndexedDB;
              }
            } catch (e) {
              return;
            }
          }

          var idb = getIDB();

          function isIndexedDBValid() {
            try {
              // Initialize IndexedDB; fall back to vendor-prefixed versions
              // if needed.
              if (!idb) {
                return false;
              } // We mimic PouchDB here;
              //
              // We test for openDatabase because IE Mobile identifies itself
              // as Safari. Oh the lulz...


              var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);
              var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1; // Safari <10.1 does not meet our requirements for IDB support (#5572)
              // since Safari 10.1 shipped with fetch, we can use that to detect it

              return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' && // some outdated implementations of IDB that appear on Samsung
              // and HTC Android devices <4.4 are missing IDBKeyRange
              // See: https://github.com/mozilla/localForage/issues/128
              // See: https://github.com/mozilla/localForage/issues/272
              typeof IDBKeyRange !== 'undefined';
            } catch (e) {
              return false;
            }
          } // Abstracts constructing a Blob object, so it also works in older
          // browsers that don't support the native Blob constructor. (i.e.
          // old QtWebKit versions, at least).
          // Abstracts constructing a Blob object, so it also works in older
          // browsers that don't support the native Blob constructor. (i.e.
          // old QtWebKit versions, at least).


          function createBlob(parts, properties) {
            /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
            parts = parts || [];
            properties = properties || {};

            try {
              return new Blob(parts, properties);
            } catch (e) {
              if (e.name !== 'TypeError') {
                throw e;
              }

              var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
              var builder = new Builder();

              for (var i = 0; i < parts.length; i += 1) {
                builder.append(parts[i]);
              }

              return builder.getBlob(properties.type);
            }
          } // This is CommonJS because lie is an external dependency, so Rollup
          // can just ignore it.


          if (typeof Promise === 'undefined') {
            // In the "nopromises" build this will just throw if you don't have
            // a global promise object, but it would throw anyway later.
            _dereq_(3);
          }

          var Promise$1 = Promise;

          function executeCallback(promise, callback) {
            if (callback) {
              promise.then(function (result) {
                callback(null, result);
              }, function (error) {
                callback(error);
              });
            }
          }

          function executeTwoCallbacks(promise, callback, errorCallback) {
            if (typeof callback === 'function') {
              promise.then(callback);
            }

            if (typeof errorCallback === 'function') {
              promise["catch"](errorCallback);
            }
          }

          function normalizeKey(key) {
            // Cast the key to a string, as that's all we can set as a key.
            if (typeof key !== 'string') {
              console.warn(key + ' used as a key, but it is not a string.');
              key = String(key);
            }

            return key;
          }

          function getCallback() {
            if (arguments.length && typeof arguments[arguments.length - 1] === 'function') {
              return arguments[arguments.length - 1];
            }
          } // Some code originally from async_storage.js in
          // [Gaia](https://github.com/mozilla-b2g/gaia).


          var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
          var supportsBlobs = void 0;
          var dbContexts = {};
          var toString = Object.prototype.toString; // Transaction Modes

          var READ_ONLY = 'readonly';
          var READ_WRITE = 'readwrite'; // Transform a binary string to an array buffer, because otherwise
          // weird stuff happens when you try to work with the binary string directly.
          // It is known.
          // From http://stackoverflow.com/questions/14967647/ (continues on next line)
          // encode-decode-image-with-base64-breaks-image (2013-04-21)

          function _binStringToArrayBuffer(bin) {
            var length = bin.length;
            var buf = new ArrayBuffer(length);
            var arr = new Uint8Array(buf);

            for (var i = 0; i < length; i++) {
              arr[i] = bin.charCodeAt(i);
            }

            return buf;
          } //
          // Blobs are not supported in all versions of IndexedDB, notably
          // Chrome <37 and Android <5. In those versions, storing a blob will throw.
          //
          // Various other blob bugs exist in Chrome v37-42 (inclusive).
          // Detecting them is expensive and confusing to users, and Chrome 37-42
          // is at very low usage worldwide, so we do a hacky userAgent check instead.
          //
          // content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
          // 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
          // FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
          //
          // Code borrowed from PouchDB. See:
          // https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js
          //


          function _checkBlobSupportWithoutCaching(idb) {
            return new Promise$1(function (resolve) {
              var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
              var blob = createBlob(['']);
              txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');

              txn.onabort = function (e) {
                // If the transaction aborts now its due to not being able to
                // write to the database, likely due to the disk being full
                e.preventDefault();
                e.stopPropagation();
                resolve(false);
              };

              txn.oncomplete = function () {
                var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
                var matchedEdge = navigator.userAgent.match(/Edge\//); // MS Edge pretends to be Chrome 42:
                // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx

                resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
              };
            })["catch"](function () {
              return false; // error, so assume unsupported
            });
          }

          function _checkBlobSupport(idb) {
            if (typeof supportsBlobs === 'boolean') {
              return Promise$1.resolve(supportsBlobs);
            }

            return _checkBlobSupportWithoutCaching(idb).then(function (value) {
              supportsBlobs = value;
              return supportsBlobs;
            });
          }

          function _deferReadiness(dbInfo) {
            var dbContext = dbContexts[dbInfo.name]; // Create a deferred object representing the current database operation.

            var deferredOperation = {};
            deferredOperation.promise = new Promise$1(function (resolve, reject) {
              deferredOperation.resolve = resolve;
              deferredOperation.reject = reject;
            }); // Enqueue the deferred operation.

            dbContext.deferredOperations.push(deferredOperation); // Chain its promise to the database readiness.

            if (!dbContext.dbReady) {
              dbContext.dbReady = deferredOperation.promise;
            } else {
              dbContext.dbReady = dbContext.dbReady.then(function () {
                return deferredOperation.promise;
              });
            }
          }

          function _advanceReadiness(dbInfo) {
            var dbContext = dbContexts[dbInfo.name]; // Dequeue a deferred operation.

            var deferredOperation = dbContext.deferredOperations.pop(); // Resolve its promise (which is part of the database readiness
            // chain of promises).

            if (deferredOperation) {
              deferredOperation.resolve();
              return deferredOperation.promise;
            }
          }

          function _rejectReadiness(dbInfo, err) {
            var dbContext = dbContexts[dbInfo.name]; // Dequeue a deferred operation.

            var deferredOperation = dbContext.deferredOperations.pop(); // Reject its promise (which is part of the database readiness
            // chain of promises).

            if (deferredOperation) {
              deferredOperation.reject(err);
              return deferredOperation.promise;
            }
          }

          function _getConnection(dbInfo, upgradeNeeded) {
            return new Promise$1(function (resolve, reject) {
              dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();

              if (dbInfo.db) {
                if (upgradeNeeded) {
                  _deferReadiness(dbInfo);

                  dbInfo.db.close();
                } else {
                  return resolve(dbInfo.db);
                }
              }

              var dbArgs = [dbInfo.name];

              if (upgradeNeeded) {
                dbArgs.push(dbInfo.version);
              }

              var openreq = idb.open.apply(idb, dbArgs);

              if (upgradeNeeded) {
                openreq.onupgradeneeded = function (e) {
                  var db = openreq.result;

                  try {
                    db.createObjectStore(dbInfo.storeName);

                    if (e.oldVersion <= 1) {
                      // Added when support for blob shims was added
                      db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                    }
                  } catch (ex) {
                    if (ex.name === 'ConstraintError') {
                      console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                    } else {
                      throw ex;
                    }
                  }
                };
              }

              openreq.onerror = function (e) {
                e.preventDefault();
                reject(openreq.error);
              };

              openreq.onsuccess = function () {
                resolve(openreq.result);

                _advanceReadiness(dbInfo);
              };
            });
          }

          function _getOriginalConnection(dbInfo) {
            return _getConnection(dbInfo, false);
          }

          function _getUpgradedConnection(dbInfo) {
            return _getConnection(dbInfo, true);
          }

          function _isUpgradeNeeded(dbInfo, defaultVersion) {
            if (!dbInfo.db) {
              return true;
            }

            var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
            var isDowngrade = dbInfo.version < dbInfo.db.version;
            var isUpgrade = dbInfo.version > dbInfo.db.version;

            if (isDowngrade) {
              // If the version is not the default one
              // then warn for impossible downgrade.
              if (dbInfo.version !== defaultVersion) {
                console.warn('The database "' + dbInfo.name + '"' + " can't be downgraded from version " + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
              } // Align the versions to prevent errors.


              dbInfo.version = dbInfo.db.version;
            }

            if (isUpgrade || isNewStore) {
              // If the store is new then increment the version (if needed).
              // This will trigger an "upgradeneeded" event which is required
              // for creating a store.
              if (isNewStore) {
                var incVersion = dbInfo.db.version + 1;

                if (incVersion > dbInfo.version) {
                  dbInfo.version = incVersion;
                }
              }

              return true;
            }

            return false;
          } // encode a blob for indexeddb engines that don't support blobs


          function _encodeBlob(blob) {
            return new Promise$1(function (resolve, reject) {
              var reader = new FileReader();
              reader.onerror = reject;

              reader.onloadend = function (e) {
                var base64 = btoa(e.target.result || '');
                resolve({
                  __local_forage_encoded_blob: true,
                  data: base64,
                  type: blob.type
                });
              };

              reader.readAsBinaryString(blob);
            });
          } // decode an encoded blob


          function _decodeBlob(encodedBlob) {
            var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));

            return createBlob([arrayBuff], {
              type: encodedBlob.type
            });
          } // is this one of our fancy encoded blobs?


          function _isEncodedBlob(value) {
            return value && value.__local_forage_encoded_blob;
          } // Specialize the default `ready()` function by making it dependent
          // on the current database operations. Thus, the driver will be actually
          // ready when it's been initialized (default) *and* there are no pending
          // operations on the database (initiated by some other instances).


          function _fullyReady(callback) {
            var self = this;

            var promise = self._initReady().then(function () {
              var dbContext = dbContexts[self._dbInfo.name];

              if (dbContext && dbContext.dbReady) {
                return dbContext.dbReady;
              }
            });

            executeTwoCallbacks(promise, callback, callback);
            return promise;
          } // Try to establish a new db connection to replace the
          // current one which is broken (i.e. experiencing
          // InvalidStateError while creating a transaction).


          function _tryReconnect(dbInfo) {
            _deferReadiness(dbInfo);

            var dbContext = dbContexts[dbInfo.name];
            var forages = dbContext.forages;

            for (var i = 0; i < forages.length; i++) {
              var forage = forages[i];

              if (forage._dbInfo.db) {
                forage._dbInfo.db.close();

                forage._dbInfo.db = null;
              }
            }

            dbInfo.db = null;
            return _getOriginalConnection(dbInfo).then(function (db) {
              dbInfo.db = db;

              if (_isUpgradeNeeded(dbInfo)) {
                // Reopen the database for upgrading.
                return _getUpgradedConnection(dbInfo);
              }

              return db;
            }).then(function (db) {
              // store the latest db reference
              // in case the db was upgraded
              dbInfo.db = dbContext.db = db;

              for (var i = 0; i < forages.length; i++) {
                forages[i]._dbInfo.db = db;
              }
            })["catch"](function (err) {
              _rejectReadiness(dbInfo, err);

              throw err;
            });
          } // FF doesn't like Promises (micro-tasks) and IDDB store operations,
          // so we have to do it with callbacks


          function createTransaction(dbInfo, mode, callback, retries) {
            if (retries === undefined) {
              retries = 1;
            }

            try {
              var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
              callback(null, tx);
            } catch (err) {
              if (retries > 0 && (!dbInfo.db || err.name === 'InvalidStateError' || err.name === 'NotFoundError')) {
                return Promise$1.resolve().then(function () {
                  if (!dbInfo.db || err.name === 'NotFoundError' && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                    // increase the db version, to create the new ObjectStore
                    if (dbInfo.db) {
                      dbInfo.version = dbInfo.db.version + 1;
                    } // Reopen the database for upgrading.


                    return _getUpgradedConnection(dbInfo);
                  }
                }).then(function () {
                  return _tryReconnect(dbInfo).then(function () {
                    createTransaction(dbInfo, mode, callback, retries - 1);
                  });
                })["catch"](callback);
              }

              callback(err);
            }
          }

          function createDbContext() {
            return {
              // Running localForages sharing a database.
              forages: [],
              // Shared database.
              db: null,
              // Database readiness (promise).
              dbReady: null,
              // Deferred operations on the database.
              deferredOperations: []
            };
          } // Open the IndexedDB database (automatically creates one if one didn't
          // previously exist), using any options set in the config.


          function _initStorage(options) {
            var self = this;
            var dbInfo = {
              db: null
            };

            if (options) {
              for (var i in options) {
                dbInfo[i] = options[i];
              }
            } // Get the current context of the database;


            var dbContext = dbContexts[dbInfo.name]; // ...or create a new context.

            if (!dbContext) {
              dbContext = createDbContext(); // Register the new context in the global container.

              dbContexts[dbInfo.name] = dbContext;
            } // Register itself as a running localForage in the current context.


            dbContext.forages.push(self); // Replace the default `ready()` function with the specialized one.

            if (!self._initReady) {
              self._initReady = self.ready;
              self.ready = _fullyReady;
            } // Create an array of initialization states of the related localForages.


            var initPromises = [];

            function ignoreErrors() {
              // Don't handle errors here,
              // just makes sure related localForages aren't pending.
              return Promise$1.resolve();
            }

            for (var j = 0; j < dbContext.forages.length; j++) {
              var forage = dbContext.forages[j];

              if (forage !== self) {
                // Don't wait for itself...
                initPromises.push(forage._initReady()["catch"](ignoreErrors));
              }
            } // Take a snapshot of the related localForages.


            var forages = dbContext.forages.slice(0); // Initialize the connection process only when
            // all the related localForages aren't pending.

            return Promise$1.all(initPromises).then(function () {
              dbInfo.db = dbContext.db; // Get the connection or open a new one without upgrade.

              return _getOriginalConnection(dbInfo);
            }).then(function (db) {
              dbInfo.db = db;

              if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
                // Reopen the database for upgrading.
                return _getUpgradedConnection(dbInfo);
              }

              return db;
            }).then(function (db) {
              dbInfo.db = dbContext.db = db;
              self._dbInfo = dbInfo; // Share the final connection amongst related localForages.

              for (var k = 0; k < forages.length; k++) {
                var forage = forages[k];

                if (forage !== self) {
                  // Self is already up-to-date.
                  forage._dbInfo.db = dbInfo.db;
                  forage._dbInfo.version = dbInfo.version;
                }
              }
            });
          }

          function getItem(key, callback) {
            var self = this;
            key = normalizeKey(key);
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                  if (err) {
                    return reject(err);
                  }

                  try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.get(key);

                    req.onsuccess = function () {
                      var value = req.result;

                      if (value === undefined) {
                        value = null;
                      }

                      if (_isEncodedBlob(value)) {
                        value = _decodeBlob(value);
                      }

                      resolve(value);
                    };

                    req.onerror = function () {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          } // Iterate over all items stored in database.


          function iterate(iterator, callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                  if (err) {
                    return reject(err);
                  }

                  try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openCursor();
                    var iterationNumber = 1;

                    req.onsuccess = function () {
                      var cursor = req.result;

                      if (cursor) {
                        var value = cursor.value;

                        if (_isEncodedBlob(value)) {
                          value = _decodeBlob(value);
                        }

                        var result = iterator(value, cursor.key, iterationNumber++); // when the iterator callback retuns any
                        // (non-`undefined`) value, then we stop
                        // the iteration immediately

                        if (result !== void 0) {
                          resolve(result);
                        } else {
                          cursor["continue"]();
                        }
                      } else {
                        resolve();
                      }
                    };

                    req.onerror = function () {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }

          function setItem(key, value, callback) {
            var self = this;
            key = normalizeKey(key);
            var promise = new Promise$1(function (resolve, reject) {
              var dbInfo;
              self.ready().then(function () {
                dbInfo = self._dbInfo;

                if (toString.call(value) === '[object Blob]') {
                  return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
                    if (blobSupport) {
                      return value;
                    }

                    return _encodeBlob(value);
                  });
                }

                return value;
              }).then(function (value) {
                createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                  if (err) {
                    return reject(err);
                  }

                  try {
                    var store = transaction.objectStore(self._dbInfo.storeName); // The reason we don't _save_ null is because IE 10 does
                    // not support saving the `null` type in IndexedDB. How
                    // ironic, given the bug below!
                    // See: https://github.com/mozilla/localForage/issues/161

                    if (value === null) {
                      value = undefined;
                    }

                    var req = store.put(value, key);

                    transaction.oncomplete = function () {
                      // Cast to undefined so the value passed to
                      // callback/promise is the same as what one would get out
                      // of `getItem()` later. This leads to some weirdness
                      // (setItem('foo', undefined) will return `null`), but
                      // it's not my fault localStorage is our baseline and that
                      // it's weird.
                      if (value === undefined) {
                        value = null;
                      }

                      resolve(value);
                    };

                    transaction.onabort = transaction.onerror = function () {
                      var err = req.error ? req.error : req.transaction.error;
                      reject(err);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }

          function removeItem(key, callback) {
            var self = this;
            key = normalizeKey(key);
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                  if (err) {
                    return reject(err);
                  }

                  try {
                    var store = transaction.objectStore(self._dbInfo.storeName); // We use a Grunt task to make this safe for IE and some
                    // versions of Android (including those used by Cordova).
                    // Normally IE won't like `.delete()` and will insist on
                    // using `['delete']()`, but we have a build step that
                    // fixes this for us now.

                    var req = store["delete"](key);

                    transaction.oncomplete = function () {
                      resolve();
                    };

                    transaction.onerror = function () {
                      reject(req.error);
                    }; // The request will be also be aborted if we've exceeded our storage
                    // space.


                    transaction.onabort = function () {
                      var err = req.error ? req.error : req.transaction.error;
                      reject(err);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }

          function clear(callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                  if (err) {
                    return reject(err);
                  }

                  try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.clear();

                    transaction.oncomplete = function () {
                      resolve();
                    };

                    transaction.onabort = transaction.onerror = function () {
                      var err = req.error ? req.error : req.transaction.error;
                      reject(err);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }

          function length(callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                  if (err) {
                    return reject(err);
                  }

                  try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.count();

                    req.onsuccess = function () {
                      resolve(req.result);
                    };

                    req.onerror = function () {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }

          function key(n, callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              if (n < 0) {
                resolve(null);
                return;
              }

              self.ready().then(function () {
                createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                  if (err) {
                    return reject(err);
                  }

                  try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var advanced = false;
                    var req = store.openCursor();

                    req.onsuccess = function () {
                      var cursor = req.result;

                      if (!cursor) {
                        // this means there weren't enough keys
                        resolve(null);
                        return;
                      }

                      if (n === 0) {
                        // We have the first key, return it if that's what they
                        // wanted.
                        resolve(cursor.key);
                      } else {
                        if (!advanced) {
                          // Otherwise, ask the cursor to skip ahead n
                          // records.
                          advanced = true;
                          cursor.advance(n);
                        } else {
                          // When we get here, we've got the nth key.
                          resolve(cursor.key);
                        }
                      }
                    };

                    req.onerror = function () {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }

          function keys(callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                  if (err) {
                    return reject(err);
                  }

                  try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openCursor();
                    var keys = [];

                    req.onsuccess = function () {
                      var cursor = req.result;

                      if (!cursor) {
                        resolve(keys);
                        return;
                      }

                      keys.push(cursor.key);
                      cursor["continue"]();
                    };

                    req.onerror = function () {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }

          function dropInstance(options, callback) {
            callback = getCallback.apply(this, arguments);
            var currentConfig = this.config();
            options = typeof options !== 'function' && options || {};

            if (!options.name) {
              options.name = options.name || currentConfig.name;
              options.storeName = options.storeName || currentConfig.storeName;
            }

            var self = this;
            var promise;

            if (!options.name) {
              promise = Promise$1.reject('Invalid arguments');
            } else {
              var isCurrentDb = options.name === currentConfig.name && self._dbInfo.db;
              var dbPromise = isCurrentDb ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then(function (db) {
                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;
                dbContext.db = db;

                for (var i = 0; i < forages.length; i++) {
                  forages[i]._dbInfo.db = db;
                }

                return db;
              });

              if (!options.storeName) {
                promise = dbPromise.then(function (db) {
                  _deferReadiness(options);

                  var dbContext = dbContexts[options.name];
                  var forages = dbContext.forages;
                  db.close();

                  for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                  }

                  var dropDBPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.deleteDatabase(options.name);

                    req.onerror = req.onblocked = function (err) {
                      var db = req.result;

                      if (db) {
                        db.close();
                      }

                      reject(err);
                    };

                    req.onsuccess = function () {
                      var db = req.result;

                      if (db) {
                        db.close();
                      }

                      resolve(db);
                    };
                  });
                  return dropDBPromise.then(function (db) {
                    dbContext.db = db;

                    for (var i = 0; i < forages.length; i++) {
                      var _forage = forages[i];

                      _advanceReadiness(_forage._dbInfo);
                    }
                  })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                  });
                });
              } else {
                promise = dbPromise.then(function (db) {
                  if (!db.objectStoreNames.contains(options.storeName)) {
                    return;
                  }

                  var newVersion = db.version + 1;

                  _deferReadiness(options);

                  var dbContext = dbContexts[options.name];
                  var forages = dbContext.forages;
                  db.close();

                  for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                    forage._dbInfo.version = newVersion;
                  }

                  var dropObjectPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.open(options.name, newVersion);

                    req.onerror = function (err) {
                      var db = req.result;
                      db.close();
                      reject(err);
                    };

                    req.onupgradeneeded = function () {
                      var db = req.result;
                      db.deleteObjectStore(options.storeName);
                    };

                    req.onsuccess = function () {
                      var db = req.result;
                      db.close();
                      resolve(db);
                    };
                  });
                  return dropObjectPromise.then(function (db) {
                    dbContext.db = db;

                    for (var j = 0; j < forages.length; j++) {
                      var _forage2 = forages[j];
                      _forage2._dbInfo.db = db;

                      _advanceReadiness(_forage2._dbInfo);
                    }
                  })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                  });
                });
              }
            }

            executeCallback(promise, callback);
            return promise;
          }

          var asyncStorage = {
            _driver: 'asyncStorage',
            _initStorage: _initStorage,
            _support: isIndexedDBValid(),
            iterate: iterate,
            getItem: getItem,
            setItem: setItem,
            removeItem: removeItem,
            clear: clear,
            length: length,
            key: key,
            keys: keys,
            dropInstance: dropInstance
          };

          function isWebSQLValid() {
            return typeof openDatabase === 'function';
          } // Sadly, the best way to save binary data in WebSQL/localStorage is serializing
          // it to Base64, so this is how we store it to prevent very strange errors with less
          // verbose ways of binary <-> string data storage.


          var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
          var BLOB_TYPE_PREFIX = '~~local_forage_type~';
          var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;
          var SERIALIZED_MARKER = '__lfsc__:';
          var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length; // OMG the serializations!

          var TYPE_ARRAYBUFFER = 'arbf';
          var TYPE_BLOB = 'blob';
          var TYPE_INT8ARRAY = 'si08';
          var TYPE_UINT8ARRAY = 'ui08';
          var TYPE_UINT8CLAMPEDARRAY = 'uic8';
          var TYPE_INT16ARRAY = 'si16';
          var TYPE_INT32ARRAY = 'si32';
          var TYPE_UINT16ARRAY = 'ur16';
          var TYPE_UINT32ARRAY = 'ui32';
          var TYPE_FLOAT32ARRAY = 'fl32';
          var TYPE_FLOAT64ARRAY = 'fl64';
          var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;
          var toString$1 = Object.prototype.toString;

          function stringToBuffer(serializedString) {
            // Fill the string into a ArrayBuffer.
            var bufferLength = serializedString.length * 0.75;
            var len = serializedString.length;
            var i;
            var p = 0;
            var encoded1, encoded2, encoded3, encoded4;

            if (serializedString[serializedString.length - 1] === '=') {
              bufferLength--;

              if (serializedString[serializedString.length - 2] === '=') {
                bufferLength--;
              }
            }

            var buffer = new ArrayBuffer(bufferLength);
            var bytes = new Uint8Array(buffer);

            for (i = 0; i < len; i += 4) {
              encoded1 = BASE_CHARS.indexOf(serializedString[i]);
              encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
              encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
              encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);
              /*jslint bitwise: true */

              bytes[p++] = encoded1 << 2 | encoded2 >> 4;
              bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
              bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
            }

            return buffer;
          } // Converts a buffer to a string to store, serialized, in the backend
          // storage library.


          function bufferToString(buffer) {
            // base64-arraybuffer
            var bytes = new Uint8Array(buffer);
            var base64String = '';
            var i;

            for (i = 0; i < bytes.length; i += 3) {
              /*jslint bitwise: true */
              base64String += BASE_CHARS[bytes[i] >> 2];
              base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
              base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
              base64String += BASE_CHARS[bytes[i + 2] & 63];
            }

            if (bytes.length % 3 === 2) {
              base64String = base64String.substring(0, base64String.length - 1) + '=';
            } else if (bytes.length % 3 === 1) {
              base64String = base64String.substring(0, base64String.length - 2) + '==';
            }

            return base64String;
          } // Serialize a value, afterwards executing a callback (which usually
          // instructs the `setItem()` callback/promise to be executed). This is how
          // we store binary data with localStorage.


          function serialize(value, callback) {
            var valueType = '';

            if (value) {
              valueType = toString$1.call(value);
            } // Cannot use `value instanceof ArrayBuffer` or such here, as these
            // checks fail when running the tests using casper.js...
            //
            // TODO: See why those tests fail and use a better solution.


            if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
              // Convert binary arrays to a string and prefix the string with
              // a special marker.
              var buffer;
              var marker = SERIALIZED_MARKER;

              if (value instanceof ArrayBuffer) {
                buffer = value;
                marker += TYPE_ARRAYBUFFER;
              } else {
                buffer = value.buffer;

                if (valueType === '[object Int8Array]') {
                  marker += TYPE_INT8ARRAY;
                } else if (valueType === '[object Uint8Array]') {
                  marker += TYPE_UINT8ARRAY;
                } else if (valueType === '[object Uint8ClampedArray]') {
                  marker += TYPE_UINT8CLAMPEDARRAY;
                } else if (valueType === '[object Int16Array]') {
                  marker += TYPE_INT16ARRAY;
                } else if (valueType === '[object Uint16Array]') {
                  marker += TYPE_UINT16ARRAY;
                } else if (valueType === '[object Int32Array]') {
                  marker += TYPE_INT32ARRAY;
                } else if (valueType === '[object Uint32Array]') {
                  marker += TYPE_UINT32ARRAY;
                } else if (valueType === '[object Float32Array]') {
                  marker += TYPE_FLOAT32ARRAY;
                } else if (valueType === '[object Float64Array]') {
                  marker += TYPE_FLOAT64ARRAY;
                } else {
                  callback(new Error('Failed to get type for BinaryArray'));
                }
              }

              callback(marker + bufferToString(buffer));
            } else if (valueType === '[object Blob]') {
              // Conver the blob to a binaryArray and then to a string.
              var fileReader = new FileReader();

              fileReader.onload = function () {
                // Backwards-compatible prefix for the blob type.
                var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);
                callback(SERIALIZED_MARKER + TYPE_BLOB + str);
              };

              fileReader.readAsArrayBuffer(value);
            } else {
              try {
                callback(JSON.stringify(value));
              } catch (e) {
                console.error("Couldn't convert value into a JSON string: ", value);
                callback(null, e);
              }
            }
          } // Deserialize data we've inserted into a value column/field. We place
          // special markers into our strings to mark them as encoded; this isn't
          // as nice as a meta field, but it's the only sane thing we can do whilst
          // keeping localStorage support intact.
          //
          // Oftentimes this will just deserialize JSON content, but if we have a
          // special marker (SERIALIZED_MARKER, defined above), we will extract
          // some kind of arraybuffer/binary data/typed array out of the string.


          function deserialize(value) {
            // If we haven't marked this string as being specially serialized (i.e.
            // something other than serialized JSON), we can just return it and be
            // done with it.
            if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
              return JSON.parse(value);
            } // The following code deals with deserializing some kind of Blob or
            // TypedArray. First we separate out the type of data we're dealing
            // with from the data itself.


            var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
            var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);
            var blobType; // Backwards-compatible blob type serialization strategy.
            // DBs created with older versions of localForage will simply not have the blob type.

            if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
              var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
              blobType = matcher[1];
              serializedString = serializedString.substring(matcher[0].length);
            }

            var buffer = stringToBuffer(serializedString); // Return the right type based on the code/type set during
            // serialization.

            switch (type) {
              case TYPE_ARRAYBUFFER:
                return buffer;

              case TYPE_BLOB:
                return createBlob([buffer], {
                  type: blobType
                });

              case TYPE_INT8ARRAY:
                return new Int8Array(buffer);

              case TYPE_UINT8ARRAY:
                return new Uint8Array(buffer);

              case TYPE_UINT8CLAMPEDARRAY:
                return new Uint8ClampedArray(buffer);

              case TYPE_INT16ARRAY:
                return new Int16Array(buffer);

              case TYPE_UINT16ARRAY:
                return new Uint16Array(buffer);

              case TYPE_INT32ARRAY:
                return new Int32Array(buffer);

              case TYPE_UINT32ARRAY:
                return new Uint32Array(buffer);

              case TYPE_FLOAT32ARRAY:
                return new Float32Array(buffer);

              case TYPE_FLOAT64ARRAY:
                return new Float64Array(buffer);

              default:
                throw new Error('Unkown type: ' + type);
            }
          }

          var localforageSerializer = {
            serialize: serialize,
            deserialize: deserialize,
            stringToBuffer: stringToBuffer,
            bufferToString: bufferToString
          };
          /*
           * Includes code from:
           *
           * base64-arraybuffer
           * https://github.com/niklasvh/base64-arraybuffer
           *
           * Copyright (c) 2012 Niklas von Hertzen
           * Licensed under the MIT license.
           */

          function createDbTable(t, dbInfo, callback, errorCallback) {
            t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' ' + '(id INTEGER PRIMARY KEY, key unique, value)', [], callback, errorCallback);
          } // Open the WebSQL database (automatically creates one if one didn't
          // previously exist), using any options set in the config.


          function _initStorage$1(options) {
            var self = this;
            var dbInfo = {
              db: null
            };

            if (options) {
              for (var i in options) {
                dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
              }
            }

            var dbInfoPromise = new Promise$1(function (resolve, reject) {
              // Open the database; the openDatabase API will automatically
              // create it for us if it doesn't exist.
              try {
                dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
              } catch (e) {
                return reject(e);
              } // Create our key/value table if it doesn't exist.


              dbInfo.db.transaction(function (t) {
                createDbTable(t, dbInfo, function () {
                  self._dbInfo = dbInfo;
                  resolve();
                }, function (t, error) {
                  reject(error);
                });
              }, reject);
            });
            dbInfo.serializer = localforageSerializer;
            return dbInfoPromise;
          }

          function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
            t.executeSql(sqlStatement, args, callback, function (t, error) {
              if (error.code === error.SYNTAX_ERR) {
                t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name = ?", [dbInfo.storeName], function (t, results) {
                  if (!results.rows.length) {
                    // if the table is missing (was deleted)
                    // re-create it table and retry
                    createDbTable(t, dbInfo, function () {
                      t.executeSql(sqlStatement, args, callback, errorCallback);
                    }, errorCallback);
                  } else {
                    errorCallback(t, error);
                  }
                }, errorCallback);
              } else {
                errorCallback(t, error);
              }
            }, errorCallback);
          }

          function getItem$1(key, callback) {
            var self = this;
            key = normalizeKey(key);
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function (t) {
                  tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).value : null; // Check to see if this is serialized content we need to
                    // unpack.

                    if (result) {
                      result = dbInfo.serializer.deserialize(result);
                    }

                    resolve(result);
                  }, function (t, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }

          function iterate$1(iterator, callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function (t) {
                  tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
                    var rows = results.rows;
                    var length = rows.length;

                    for (var i = 0; i < length; i++) {
                      var item = rows.item(i);
                      var result = item.value; // Check to see if this is serialized content
                      // we need to unpack.

                      if (result) {
                        result = dbInfo.serializer.deserialize(result);
                      }

                      result = iterator(result, item.key, i + 1); // void(0) prevents problems with redefinition
                      // of `undefined`.

                      if (result !== void 0) {
                        resolve(result);
                        return;
                      }
                    }

                    resolve();
                  }, function (t, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }

          function _setItem(key, value, callback, retriesLeft) {
            var self = this;
            key = normalizeKey(key);
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                // The localStorage API doesn't return undefined values in an
                // "expected" way, so undefined is always cast to null in all
                // drivers. See: https://github.com/mozilla/localForage/pull/42
                if (value === undefined) {
                  value = null;
                } // Save the original value to pass to the callback.


                var originalValue = value;
                var dbInfo = self._dbInfo;
                dbInfo.serializer.serialize(value, function (value, error) {
                  if (error) {
                    reject(error);
                  } else {
                    dbInfo.db.transaction(function (t) {
                      tryExecuteSql(t, dbInfo, 'INSERT OR REPLACE INTO ' + dbInfo.storeName + ' ' + '(key, value) VALUES (?, ?)', [key, value], function () {
                        resolve(originalValue);
                      }, function (t, error) {
                        reject(error);
                      });
                    }, function (sqlError) {
                      // The transaction failed; check
                      // to see if it's a quota error.
                      if (sqlError.code === sqlError.QUOTA_ERR) {
                        // We reject the callback outright for now, but
                        // it's worth trying to re-run the transaction.
                        // Even if the user accepts the prompt to use
                        // more storage on Safari, this error will
                        // be called.
                        //
                        // Try to re-run the transaction.
                        if (retriesLeft > 0) {
                          resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));
                          return;
                        }

                        reject(sqlError);
                      }
                    });
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }

          function setItem$1(key, value, callback) {
            return _setItem.apply(this, [key, value, callback, 1]);
          }

          function removeItem$1(key, callback) {
            var self = this;
            key = normalizeKey(key);
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function (t) {
                  tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
                    resolve();
                  }, function (t, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          } // Deletes every item in the table.
          // TODO: Find out if this resets the AUTO_INCREMENT number.


          function clear$1(callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function (t) {
                  tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName, [], function () {
                    resolve();
                  }, function (t, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          } // Does a simple `COUNT(key)` to get the number of items stored in
          // localForage.


          function length$1(callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function (t) {
                  // Ahhh, SQL makes this one soooooo easy.
                  tryExecuteSql(t, dbInfo, 'SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
                    var result = results.rows.item(0).c;
                    resolve(result);
                  }, function (t, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          } // Return the key located at key index X; essentially gets the key from a
          // `WHERE id = ?`. This is the most efficient way I can think to implement
          // this rarely-used (in my experience) part of the API, but it can seem
          // inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
          // the ID of each key will change every time it's updated. Perhaps a stored
          // procedure for the `setItem()` SQL would solve this problem?
          // TODO: Don't change ID on `setItem()`.


          function key$1(n, callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function (t) {
                  tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).key : null;
                    resolve(result);
                  }, function (t, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }

          function keys$1(callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function (t) {
                  tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
                    var keys = [];

                    for (var i = 0; i < results.rows.length; i++) {
                      keys.push(results.rows.item(i).key);
                    }

                    resolve(keys);
                  }, function (t, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          } // https://www.w3.org/TR/webdatabase/#databases
          // > There is no way to enumerate or delete the databases available for an origin from this API.


          function getAllStoreNames(db) {
            return new Promise$1(function (resolve, reject) {
              db.transaction(function (t) {
                t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function (t, results) {
                  var storeNames = [];

                  for (var i = 0; i < results.rows.length; i++) {
                    storeNames.push(results.rows.item(i).name);
                  }

                  resolve({
                    db: db,
                    storeNames: storeNames
                  });
                }, function (t, error) {
                  reject(error);
                });
              }, function (sqlError) {
                reject(sqlError);
              });
            });
          }

          function dropInstance$1(options, callback) {
            callback = getCallback.apply(this, arguments);
            var currentConfig = this.config();
            options = typeof options !== 'function' && options || {};

            if (!options.name) {
              options.name = options.name || currentConfig.name;
              options.storeName = options.storeName || currentConfig.storeName;
            }

            var self = this;
            var promise;

            if (!options.name) {
              promise = Promise$1.reject('Invalid arguments');
            } else {
              promise = new Promise$1(function (resolve) {
                var db;

                if (options.name === currentConfig.name) {
                  // use the db reference of the current instance
                  db = self._dbInfo.db;
                } else {
                  db = openDatabase(options.name, '', '', 0);
                }

                if (!options.storeName) {
                  // drop all database tables
                  resolve(getAllStoreNames(db));
                } else {
                  resolve({
                    db: db,
                    storeNames: [options.storeName]
                  });
                }
              }).then(function (operationInfo) {
                return new Promise$1(function (resolve, reject) {
                  operationInfo.db.transaction(function (t) {
                    function dropTable(storeName) {
                      return new Promise$1(function (resolve, reject) {
                        t.executeSql('DROP TABLE IF EXISTS ' + storeName, [], function () {
                          resolve();
                        }, function (t, error) {
                          reject(error);
                        });
                      });
                    }

                    var operations = [];

                    for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
                      operations.push(dropTable(operationInfo.storeNames[i]));
                    }

                    Promise$1.all(operations).then(function () {
                      resolve();
                    })["catch"](function (e) {
                      reject(e);
                    });
                  }, function (sqlError) {
                    reject(sqlError);
                  });
                });
              });
            }

            executeCallback(promise, callback);
            return promise;
          }

          var webSQLStorage = {
            _driver: 'webSQLStorage',
            _initStorage: _initStorage$1,
            _support: isWebSQLValid(),
            iterate: iterate$1,
            getItem: getItem$1,
            setItem: setItem$1,
            removeItem: removeItem$1,
            clear: clear$1,
            length: length$1,
            key: key$1,
            keys: keys$1,
            dropInstance: dropInstance$1
          };

          function isLocalStorageValid() {
            try {
              return typeof localStorage !== 'undefined' && 'setItem' in localStorage && // in IE8 typeof localStorage.setItem === 'object'
              !!localStorage.setItem;
            } catch (e) {
              return false;
            }
          }

          function _getKeyPrefix(options, defaultConfig) {
            var keyPrefix = options.name + '/';

            if (options.storeName !== defaultConfig.storeName) {
              keyPrefix += options.storeName + '/';
            }

            return keyPrefix;
          } // Check if localStorage throws when saving an item


          function checkIfLocalStorageThrows() {
            var localStorageTestKey = '_localforage_support_test';

            try {
              localStorage.setItem(localStorageTestKey, true);
              localStorage.removeItem(localStorageTestKey);
              return false;
            } catch (e) {
              return true;
            }
          } // Check if localStorage is usable and allows to save an item
          // This method checks if localStorage is usable in Safari Private Browsing
          // mode, or in any other case where the available quota for localStorage
          // is 0 and there wasn't any saved items yet.


          function _isLocalStorageUsable() {
            return !checkIfLocalStorageThrows() || localStorage.length > 0;
          } // Config the localStorage backend, using options set in the config.


          function _initStorage$2(options) {
            var self = this;
            var dbInfo = {};

            if (options) {
              for (var i in options) {
                dbInfo[i] = options[i];
              }
            }

            dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig);

            if (!_isLocalStorageUsable()) {
              return Promise$1.reject();
            }

            self._dbInfo = dbInfo;
            dbInfo.serializer = localforageSerializer;
            return Promise$1.resolve();
          } // Remove all keys from the datastore, effectively destroying all data in
          // the app's key/value store!


          function clear$2(callback) {
            var self = this;
            var promise = self.ready().then(function () {
              var keyPrefix = self._dbInfo.keyPrefix;

              for (var i = localStorage.length - 1; i >= 0; i--) {
                var key = localStorage.key(i);

                if (key.indexOf(keyPrefix) === 0) {
                  localStorage.removeItem(key);
                }
              }
            });
            executeCallback(promise, callback);
            return promise;
          } // Retrieve an item from the store. Unlike the original async_storage
          // library in Gaia, we don't modify return values at all. If a key's value
          // is `undefined`, we pass that value to the callback function.


          function getItem$2(key, callback) {
            var self = this;
            key = normalizeKey(key);
            var promise = self.ready().then(function () {
              var dbInfo = self._dbInfo;
              var result = localStorage.getItem(dbInfo.keyPrefix + key); // If a result was found, parse it from the serialized
              // string into a JS object. If result isn't truthy, the key
              // is likely undefined and we'll pass it straight to the
              // callback.

              if (result) {
                result = dbInfo.serializer.deserialize(result);
              }

              return result;
            });
            executeCallback(promise, callback);
            return promise;
          } // Iterate over all items in the store.


          function iterate$2(iterator, callback) {
            var self = this;
            var promise = self.ready().then(function () {
              var dbInfo = self._dbInfo;
              var keyPrefix = dbInfo.keyPrefix;
              var keyPrefixLength = keyPrefix.length;
              var length = localStorage.length; // We use a dedicated iterator instead of the `i` variable below
              // so other keys we fetch in localStorage aren't counted in
              // the `iterationNumber` argument passed to the `iterate()`
              // callback.
              //
              // See: github.com/mozilla/localForage/pull/435#discussion_r38061530

              var iterationNumber = 1;

              for (var i = 0; i < length; i++) {
                var key = localStorage.key(i);

                if (key.indexOf(keyPrefix) !== 0) {
                  continue;
                }

                var value = localStorage.getItem(key); // If a result was found, parse it from the serialized
                // string into a JS object. If result isn't truthy, the
                // key is likely undefined and we'll pass it straight
                // to the iterator.

                if (value) {
                  value = dbInfo.serializer.deserialize(value);
                }

                value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);

                if (value !== void 0) {
                  return value;
                }
              }
            });
            executeCallback(promise, callback);
            return promise;
          } // Same as localStorage's key() method, except takes a callback.


          function key$2(n, callback) {
            var self = this;
            var promise = self.ready().then(function () {
              var dbInfo = self._dbInfo;
              var result;

              try {
                result = localStorage.key(n);
              } catch (error) {
                result = null;
              } // Remove the prefix from the key, if a key is found.


              if (result) {
                result = result.substring(dbInfo.keyPrefix.length);
              }

              return result;
            });
            executeCallback(promise, callback);
            return promise;
          }

          function keys$2(callback) {
            var self = this;
            var promise = self.ready().then(function () {
              var dbInfo = self._dbInfo;
              var length = localStorage.length;
              var keys = [];

              for (var i = 0; i < length; i++) {
                var itemKey = localStorage.key(i);

                if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                  keys.push(itemKey.substring(dbInfo.keyPrefix.length));
                }
              }

              return keys;
            });
            executeCallback(promise, callback);
            return promise;
          } // Supply the number of keys in the datastore to the callback function.


          function length$2(callback) {
            var self = this;
            var promise = self.keys().then(function (keys) {
              return keys.length;
            });
            executeCallback(promise, callback);
            return promise;
          } // Remove an item from the store, nice and simple.


          function removeItem$2(key, callback) {
            var self = this;
            key = normalizeKey(key);
            var promise = self.ready().then(function () {
              var dbInfo = self._dbInfo;
              localStorage.removeItem(dbInfo.keyPrefix + key);
            });
            executeCallback(promise, callback);
            return promise;
          } // Set a key's value and run an optional callback once the value is set.
          // Unlike Gaia's implementation, the callback function is passed the value,
          // in case you want to operate on that value only after you're sure it
          // saved, or something like that.


          function setItem$2(key, value, callback) {
            var self = this;
            key = normalizeKey(key);
            var promise = self.ready().then(function () {
              // Convert undefined values to null.
              // https://github.com/mozilla/localForage/pull/42
              if (value === undefined) {
                value = null;
              } // Save the original value to pass to the callback.


              var originalValue = value;
              return new Promise$1(function (resolve, reject) {
                var dbInfo = self._dbInfo;
                dbInfo.serializer.serialize(value, function (value, error) {
                  if (error) {
                    reject(error);
                  } else {
                    try {
                      localStorage.setItem(dbInfo.keyPrefix + key, value);
                      resolve(originalValue);
                    } catch (e) {
                      // localStorage capacity exceeded.
                      // TODO: Make this a specific error/event.
                      if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                        reject(e);
                      }

                      reject(e);
                    }
                  }
                });
              });
            });
            executeCallback(promise, callback);
            return promise;
          }

          function dropInstance$2(options, callback) {
            callback = getCallback.apply(this, arguments);
            options = typeof options !== 'function' && options || {};

            if (!options.name) {
              var currentConfig = this.config();
              options.name = options.name || currentConfig.name;
              options.storeName = options.storeName || currentConfig.storeName;
            }

            var self = this;
            var promise;

            if (!options.name) {
              promise = Promise$1.reject('Invalid arguments');
            } else {
              promise = new Promise$1(function (resolve) {
                if (!options.storeName) {
                  resolve(options.name + '/');
                } else {
                  resolve(_getKeyPrefix(options, self._defaultConfig));
                }
              }).then(function (keyPrefix) {
                for (var i = localStorage.length - 1; i >= 0; i--) {
                  var key = localStorage.key(i);

                  if (key.indexOf(keyPrefix) === 0) {
                    localStorage.removeItem(key);
                  }
                }
              });
            }

            executeCallback(promise, callback);
            return promise;
          }

          var localStorageWrapper = {
            _driver: 'localStorageWrapper',
            _initStorage: _initStorage$2,
            _support: isLocalStorageValid(),
            iterate: iterate$2,
            getItem: getItem$2,
            setItem: setItem$2,
            removeItem: removeItem$2,
            clear: clear$2,
            length: length$2,
            key: key$2,
            keys: keys$2,
            dropInstance: dropInstance$2
          };

          var sameValue = function sameValue(x, y) {
            return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
          };

          var includes = function includes(array, searchElement) {
            var len = array.length;
            var i = 0;

            while (i < len) {
              if (sameValue(array[i], searchElement)) {
                return true;
              }

              i++;
            }

            return false;
          };

          var isArray = Array.isArray || function (arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
          }; // Drivers are stored here when `defineDriver()` is called.
          // They are shared across all instances of localForage.


          var DefinedDrivers = {};
          var DriverSupport = {};
          var DefaultDrivers = {
            INDEXEDDB: asyncStorage,
            WEBSQL: webSQLStorage,
            LOCALSTORAGE: localStorageWrapper
          };
          var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];
          var OptionalDriverMethods = ['dropInstance'];
          var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'].concat(OptionalDriverMethods);
          var DefaultConfig = {
            description: '',
            driver: DefaultDriverOrder.slice(),
            name: 'localforage',
            // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
            // we can use without a prompt.
            size: 4980736,
            storeName: 'keyvaluepairs',
            version: 1.0
          };

          function callWhenReady(localForageInstance, libraryMethod) {
            localForageInstance[libraryMethod] = function () {
              var _args = arguments;
              return localForageInstance.ready().then(function () {
                return localForageInstance[libraryMethod].apply(localForageInstance, _args);
              });
            };
          }

          function extend() {
            for (var i = 1; i < arguments.length; i++) {
              var arg = arguments[i];

              if (arg) {
                for (var _key in arg) {
                  if (arg.hasOwnProperty(_key)) {
                    if (isArray(arg[_key])) {
                      arguments[0][_key] = arg[_key].slice();
                    } else {
                      arguments[0][_key] = arg[_key];
                    }
                  }
                }
              }
            }

            return arguments[0];
          }

          var LocalForage = function () {
            function LocalForage(options) {
              _classCallCheck(this, LocalForage);

              for (var driverTypeKey in DefaultDrivers) {
                if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                  var driver = DefaultDrivers[driverTypeKey];
                  var driverName = driver._driver;
                  this[driverTypeKey] = driverName;

                  if (!DefinedDrivers[driverName]) {
                    // we don't need to wait for the promise,
                    // since the default drivers can be defined
                    // in a blocking manner
                    this.defineDriver(driver);
                  }
                }
              }

              this._defaultConfig = extend({}, DefaultConfig);
              this._config = extend({}, this._defaultConfig, options);
              this._driverSet = null;
              this._initDriver = null;
              this._ready = false;
              this._dbInfo = null;

              this._wrapLibraryMethodsWithReady();

              this.setDriver(this._config.driver)["catch"](function () {});
            } // Set any config values for localForage; can be called anytime before
            // the first API call (e.g. `getItem`, `setItem`).
            // We loop through options so we don't overwrite existing config
            // values.


            LocalForage.prototype.config = function config(options) {
              // If the options argument is an object, we use it to set values.
              // Otherwise, we return either a specified config value or all
              // config values.
              if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
                // If localforage is ready and fully initialized, we can't set
                // any new configuration values. Instead, we return an error.
                if (this._ready) {
                  return new Error("Can't call config() after localforage " + 'has been used.');
                }

                for (var i in options) {
                  if (i === 'storeName') {
                    options[i] = options[i].replace(/\W/g, '_');
                  }

                  if (i === 'version' && typeof options[i] !== 'number') {
                    return new Error('Database version must be a number.');
                  }

                  this._config[i] = options[i];
                } // after all config options are set and
                // the driver option is used, try setting it


                if ('driver' in options && options.driver) {
                  return this.setDriver(this._config.driver);
                }

                return true;
              } else if (typeof options === 'string') {
                return this._config[options];
              } else {
                return this._config;
              }
            }; // Used to define a custom driver, shared across all instances of
            // localForage.


            LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
              var promise = new Promise$1(function (resolve, reject) {
                try {
                  var driverName = driverObject._driver;
                  var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver'); // A driver name should be defined and not overlap with the
                  // library-defined, default drivers.

                  if (!driverObject._driver) {
                    reject(complianceError);
                    return;
                  }

                  var driverMethods = LibraryMethods.concat('_initStorage');

                  for (var i = 0, len = driverMethods.length; i < len; i++) {
                    var driverMethodName = driverMethods[i]; // when the property is there,
                    // it should be a method even when optional

                    var isRequired = !includes(OptionalDriverMethods, driverMethodName);

                    if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== 'function') {
                      reject(complianceError);
                      return;
                    }
                  }

                  var configureMissingMethods = function configureMissingMethods() {
                    var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
                      return function () {
                        var error = new Error('Method ' + methodName + ' is not implemented by the current driver');
                        var promise = Promise$1.reject(error);
                        executeCallback(promise, arguments[arguments.length - 1]);
                        return promise;
                      };
                    };

                    for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                      var optionalDriverMethod = OptionalDriverMethods[_i];

                      if (!driverObject[optionalDriverMethod]) {
                        driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                      }
                    }
                  };

                  configureMissingMethods();

                  var setDriverSupport = function setDriverSupport(support) {
                    if (DefinedDrivers[driverName]) {
                      console.info('Redefining LocalForage driver: ' + driverName);
                    }

                    DefinedDrivers[driverName] = driverObject;
                    DriverSupport[driverName] = support; // don't use a then, so that we can define
                    // drivers that have simple _support methods
                    // in a blocking manner

                    resolve();
                  };

                  if ('_support' in driverObject) {
                    if (driverObject._support && typeof driverObject._support === 'function') {
                      driverObject._support().then(setDriverSupport, reject);
                    } else {
                      setDriverSupport(!!driverObject._support);
                    }
                  } else {
                    setDriverSupport(true);
                  }
                } catch (e) {
                  reject(e);
                }
              });
              executeTwoCallbacks(promise, callback, errorCallback);
              return promise;
            };

            LocalForage.prototype.driver = function driver() {
              return this._driver || null;
            };

            LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
              var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));
              executeTwoCallbacks(getDriverPromise, callback, errorCallback);
              return getDriverPromise;
            };

            LocalForage.prototype.getSerializer = function getSerializer(callback) {
              var serializerPromise = Promise$1.resolve(localforageSerializer);
              executeTwoCallbacks(serializerPromise, callback);
              return serializerPromise;
            };

            LocalForage.prototype.ready = function ready(callback) {
              var self = this;

              var promise = self._driverSet.then(function () {
                if (self._ready === null) {
                  self._ready = self._initDriver();
                }

                return self._ready;
              });

              executeTwoCallbacks(promise, callback, callback);
              return promise;
            };

            LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
              var self = this;

              if (!isArray(drivers)) {
                drivers = [drivers];
              }

              var supportedDrivers = this._getSupportedDrivers(drivers);

              function setDriverToConfig() {
                self._config.driver = self.driver();
              }

              function extendSelfWithDriver(driver) {
                self._extend(driver);

                setDriverToConfig();
                self._ready = self._initStorage(self._config);
                return self._ready;
              }

              function initDriver(supportedDrivers) {
                return function () {
                  var currentDriverIndex = 0;

                  function driverPromiseLoop() {
                    while (currentDriverIndex < supportedDrivers.length) {
                      var driverName = supportedDrivers[currentDriverIndex];
                      currentDriverIndex++;
                      self._dbInfo = null;
                      self._ready = null;
                      return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                    }

                    setDriverToConfig();
                    var error = new Error('No available storage method found.');
                    self._driverSet = Promise$1.reject(error);
                    return self._driverSet;
                  }

                  return driverPromiseLoop();
                };
              } // There might be a driver initialization in progress
              // so wait for it to finish in order to avoid a possible
              // race condition to set _dbInfo


              var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
                return Promise$1.resolve();
              }) : Promise$1.resolve();
              this._driverSet = oldDriverSetDone.then(function () {
                var driverName = supportedDrivers[0];
                self._dbInfo = null;
                self._ready = null;
                return self.getDriver(driverName).then(function (driver) {
                  self._driver = driver._driver;
                  setDriverToConfig();

                  self._wrapLibraryMethodsWithReady();

                  self._initDriver = initDriver(supportedDrivers);
                });
              })["catch"](function () {
                setDriverToConfig();
                var error = new Error('No available storage method found.');
                self._driverSet = Promise$1.reject(error);
                return self._driverSet;
              });
              executeTwoCallbacks(this._driverSet, callback, errorCallback);
              return this._driverSet;
            };

            LocalForage.prototype.supports = function supports(driverName) {
              return !!DriverSupport[driverName];
            };

            LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
              extend(this, libraryMethodsAndProperties);
            };

            LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
              var supportedDrivers = [];

              for (var i = 0, len = drivers.length; i < len; i++) {
                var driverName = drivers[i];

                if (this.supports(driverName)) {
                  supportedDrivers.push(driverName);
                }
              }

              return supportedDrivers;
            };

            LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
              // Add a stub for each driver API method that delays the call to the
              // corresponding driver method until localForage is ready. These stubs
              // will be replaced by the driver methods as soon as the driver is
              // loaded, so there is no performance impact.
              for (var i = 0, len = LibraryMethods.length; i < len; i++) {
                callWhenReady(this, LibraryMethods[i]);
              }
            };

            LocalForage.prototype.createInstance = function createInstance(options) {
              return new LocalForage(options);
            };

            return LocalForage;
          }(); // The actual localForage object that we expose as a module or via a
          // global. It's extended by pulling in one of our other libraries.


          var localforage_js = new LocalForage();
          module.exports = localforage_js;
        }, {
          "3": 3
        }]
      }, {}, [4])(4);
    });
  });

  var crc32 = createCommonjsModule(function (module) {
    (function () {

      var table = [],
          poly = 0xEDB88320; // reverse polynomial
      // build the table

      function makeTable() {
        var c, n, k;

        for (n = 0; n < 256; n += 1) {
          c = n;

          for (k = 0; k < 8; k += 1) {
            if (c & 1) {
              c = poly ^ c >>> 1;
            } else {
              c = c >>> 1;
            }
          }

          table[n] = c >>> 0;
        }
      }

      function strToArr(str) {
        // sweet hack to turn string into a 'byte' array
        return Array.prototype.map.call(str, function (c) {
          return c.charCodeAt(0);
        });
      }
      /*
       * Compute CRC of array directly.
       *
       * This is slower for repeated calls, so append mode is not supported.
       */


      function crcDirect(arr) {
        var crc = -1,
            // initial contents of LFBSR
        i,
            j,
            l,
            temp;

        for (i = 0, l = arr.length; i < l; i += 1) {
          temp = (crc ^ arr[i]) & 0xff; // read 8 bits one at a time

          for (j = 0; j < 8; j += 1) {
            if ((temp & 1) === 1) {
              temp = temp >>> 1 ^ poly;
            } else {
              temp = temp >>> 1;
            }
          }

          crc = crc >>> 8 ^ temp;
        } // flip bits


        return crc ^ -1;
      }
      /*
       * Compute CRC with the help of a pre-calculated table.
       *
       * This supports append mode, if the second parameter is set.
       */


      function crcTable(arr, append) {
        var crc, i, l; // if we're in append mode, don't reset crc
        // if arr is null or undefined, reset table and return

        if (typeof crcTable.crc === 'undefined' || !append || !arr) {
          crcTable.crc = 0 ^ -1;

          if (!arr) {
            return;
          }
        } // store in temp variable for minor speed gain


        crc = crcTable.crc;

        for (i = 0, l = arr.length; i < l; i += 1) {
          crc = crc >>> 8 ^ table[(crc ^ arr[i]) & 0xff];
        }

        crcTable.crc = crc;
        return crc ^ -1;
      } // build the table
      // this isn't that costly, and most uses will be for table assisted mode


      makeTable();

      module.exports = function (val, direct) {
        var val = typeof val === 'string' ? strToArr(val) : val,
            ret = direct ? crcDirect(val) : crcTable(val); // convert to 2's complement hex

        return (ret >>> 0).toString(16);
      };

      module.exports.direct = crcDirect;
      module.exports.table = crcTable;
    })();
  });
  var crc32_1 = crc32.direct;
  var crc32_2 = crc32.table;

  var rawinflate = createCommonjsModule(function (module) {
    /*
     * $Id: rawinflate.js,v 0.2 2009/03/01 18:32:24 dankogai Exp $
     *
     * original:
     * http://www.onicos.com/staff/iz/amuse/javascript/expert/inflate.txt
     */

    /* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
     * Version: 1.0.0.1
     * LastModified: Dec 25 1999
     */

    /* Interface:
     * data = inflate(src);
     */
    (function () {
      /* constant parameters */
      var WSIZE = 32768,
          // Sliding Window size
      STORED_BLOCK = 0,
          STATIC_TREES = 1,
          DYN_TREES = 2,

      /* for inflate */
      lbits = 9,
          // bits in base literal/length lookup table
      dbits = 6,
          // bits in base distance lookup table

      /* variables (inflate) */
      slide,
          wp,
          // current position in slide
      fixed_tl = null,
          // inflate static
      fixed_td,
          // inflate static
      fixed_bl,
          // inflate static
      fixed_bd,
          // inflate static
      bit_buf,
          // bit buffer
      bit_len,
          // bits in bit buffer
      method,
          eof,
          copy_leng,
          copy_dist,
          tl,
          // literal length decoder table
      td,
          // literal distance decoder table
      bl,
          // number of bits decoded by tl
      bd,
          // number of bits decoded by td
      inflate_data,
          inflate_pos,

      /* constant tables (inflate) */
      MASK_BITS = [0x0000, 0x0001, 0x0003, 0x0007, 0x000f, 0x001f, 0x003f, 0x007f, 0x00ff, 0x01ff, 0x03ff, 0x07ff, 0x0fff, 0x1fff, 0x3fff, 0x7fff, 0xffff],
          // Tables for deflate from PKZIP's appnote.txt.
      // Copy lengths for literal codes 257..285
      cplens = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],

      /* note: see note #13 above about the 258 in this list. */
      // Extra bits for literal codes 257..285
      cplext = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99 // 99==invalid
      ],
          // Copy offsets for distance codes 0..29
      cpdist = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577],
          // Extra bits for distance codes
      cpdext = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
          // Order of the bit length code lengths
      border = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
      /* objects (inflate) */

      function HuftList() {
        this.next = null;
        this.list = null;
      }

      function HuftNode() {
        this.e = 0; // number of extra bits or operation

        this.b = 0; // number of bits in this code or subcode
        // union

        this.n = 0; // literal, length base, or distance base

        this.t = null; // (HuftNode) pointer to next level of table
      }
      /*
       * @param b-  code lengths in bits (all assumed <= BMAX)
       * @param n- number of codes (assumed <= N_MAX)
       * @param s- number of simple-valued codes (0..s-1)
       * @param d- list of base values for non-simple codes
       * @param e- list of extra bits for non-simple codes
       * @param mm- maximum lookup bits
       */


      function HuftBuild(b, n, s, d, e, mm) {
        this.BMAX = 16; // maximum bit length of any code

        this.N_MAX = 288; // maximum number of codes in any set

        this.status = 0; // 0: success, 1: incomplete table, 2: bad input

        this.root = null; // (HuftList) starting table

        this.m = 0; // maximum lookup bits, returns actual

        /* Given a list of code lengths and a maximum table size, make a set of
           tables to decode that set of codes. Return zero on success, one if
           the given code set is incomplete (the tables are still built in this
           case), two if the input is invalid (all zero length codes or an
           oversubscribed set of lengths), and three if not enough memory.
           The code with value 256 is special, and the tables are constructed
           so that no bits beyond that code are fetched when that code is
           decoded. */

        var a; // counter for codes of length k

        var c = [];
        var el; // length of EOB code (value 256)

        var f; // i repeats in table every f entries

        var g; // maximum code length

        var h; // table level

        var i; // counter, current code

        var j; // counter

        var k; // number of bits in current code

        var lx = [];
        var p; // pointer into c[], b[], or v[]

        var pidx; // index of p

        var q; // (HuftNode) points to current table

        var r = new HuftNode(); // table entry for structure assignment

        var u = [];
        var v = [];
        var w;
        var x = [];
        var xp; // pointer into x or c

        var y; // number of dummy codes added

        var z; // number of entries in current table

        var o;
        var tail; // (HuftList)

        tail = this.root = null; // bit length count table

        for (i = 0; i < this.BMAX + 1; i++) {
          c[i] = 0;
        } // stack of bits per table


        for (i = 0; i < this.BMAX + 1; i++) {
          lx[i] = 0;
        } // HuftNode[BMAX][]  table stack


        for (i = 0; i < this.BMAX; i++) {
          u[i] = null;
        } // values in order of bit length


        for (i = 0; i < this.N_MAX; i++) {
          v[i] = 0;
        } // bit offsets, then code stack


        for (i = 0; i < this.BMAX + 1; i++) {
          x[i] = 0;
        } // Generate counts for each bit length


        el = n > 256 ? b[256] : this.BMAX; // set length of EOB code, if any

        p = b;
        pidx = 0;
        i = n;

        do {
          c[p[pidx]]++; // assume all entries <= BMAX

          pidx++;
        } while (--i > 0);

        if (c[0] === n) {
          // null input--all zero length codes
          this.root = null;
          this.m = 0;
          this.status = 0;
          return;
        } // Find minimum and maximum length, bound *m by those


        for (j = 1; j <= this.BMAX; j++) {
          if (c[j] !== 0) {
            break;
          }
        }

        k = j; // minimum code length

        if (mm < j) {
          mm = j;
        }

        for (i = this.BMAX; i !== 0; i--) {
          if (c[i] !== 0) {
            break;
          }
        }

        g = i; // maximum code length

        if (mm > i) {
          mm = i;
        } // Adjust last length count to fill out codes, if needed


        for (y = 1 << j; j < i; j++, y <<= 1) {
          if ((y -= c[j]) < 0) {
            this.status = 2; // bad input: more codes than bits

            this.m = mm;
            return;
          }
        }

        if ((y -= c[i]) < 0) {
          this.status = 2;
          this.m = mm;
          return;
        }

        c[i] += y; // Generate starting offsets into the value table for each length

        x[1] = j = 0;
        p = c;
        pidx = 1;
        xp = 2;

        while (--i > 0) {
          // note that i == g from above
          x[xp++] = j += p[pidx++];
        } // Make a table of values in order of bit lengths


        p = b;
        pidx = 0;
        i = 0;

        do {
          if ((j = p[pidx++]) !== 0) {
            v[x[j]++] = i;
          }
        } while (++i < n);

        n = x[g]; // set n to length of v
        // Generate the Huffman codes and for each, make the table entries

        x[0] = i = 0; // first Huffman code is zero

        p = v;
        pidx = 0; // grab values in bit order

        h = -1; // no tables yet--level -1

        w = lx[0] = 0; // no bits decoded yet

        q = null; // ditto

        z = 0; // ditto
        // go through the bit lengths (k already is bits in shortest code)

        for (null; k <= g; k++) {
          a = c[k];

          while (a-- > 0) {
            // here i is the Huffman code of length k bits for value p[pidx]
            // make tables up to required level
            while (k > w + lx[1 + h]) {
              w += lx[1 + h]; // add bits already decoded

              h++; // compute minimum size table less than or equal to *m bits

              z = (z = g - w) > mm ? mm : z; // upper limit

              if ((f = 1 << (j = k - w)) > a + 1) {
                // try a k-w bit table
                // too few codes for k-w bit table
                f -= a + 1; // deduct codes from patterns left

                xp = k;

                while (++j < z) {
                  // try smaller tables up to z bits
                  if ((f <<= 1) <= c[++xp]) {
                    break; // enough codes to use up j bits
                  }

                  f -= c[xp]; // else deduct codes from patterns
                }
              }

              if (w + j > el && w < el) {
                j = el - w; // make EOB code end at table
              }

              z = 1 << j; // table entries for j-bit table

              lx[1 + h] = j; // set table size in stack
              // allocate and link in new table

              q = [];

              for (o = 0; o < z; o++) {
                q[o] = new HuftNode();
              }

              if (!tail) {
                tail = this.root = new HuftList();
              } else {
                tail = tail.next = new HuftList();
              }

              tail.next = null;
              tail.list = q;
              u[h] = q; // table starts after link

              /* connect to last table, if there is one */

              if (h > 0) {
                x[h] = i; // save pattern for backing up

                r.b = lx[h]; // bits to dump before this table

                r.e = 16 + j; // bits in this table

                r.t = q; // pointer to this table

                j = (i & (1 << w) - 1) >> w - lx[h];
                u[h - 1][j].e = r.e;
                u[h - 1][j].b = r.b;
                u[h - 1][j].n = r.n;
                u[h - 1][j].t = r.t;
              }
            } // set up table entry in r


            r.b = k - w;

            if (pidx >= n) {
              r.e = 99; // out of values--invalid code
            } else if (p[pidx] < s) {
              r.e = p[pidx] < 256 ? 16 : 15; // 256 is end-of-block code

              r.n = p[pidx++]; // simple code is just the value
            } else {
              r.e = e[p[pidx] - s]; // non-simple--look up in lists

              r.n = d[p[pidx++] - s];
            } // fill code-like entries with r //


            f = 1 << k - w;

            for (j = i >> w; j < z; j += f) {
              q[j].e = r.e;
              q[j].b = r.b;
              q[j].n = r.n;
              q[j].t = r.t;
            } // backwards increment the k-bit code i


            for (j = 1 << k - 1; (i & j) !== 0; j >>= 1) {
              i ^= j;
            }

            i ^= j; // backup over finished tables

            while ((i & (1 << w) - 1) !== x[h]) {
              w -= lx[h]; // don't need to update q

              h--;
            }
          }
        }
        /* return actual size of base table */


        this.m = lx[1];
        /* Return true (1) if we were given an incomplete table */

        this.status = y !== 0 && g !== 1 ? 1 : 0;
      }
      /* routines (inflate) */


      function GET_BYTE() {
        if (inflate_data.length === inflate_pos) {
          return -1;
        }

        return inflate_data[inflate_pos++] & 0xff;
      }

      function NEEDBITS(n) {
        while (bit_len < n) {
          bit_buf |= GET_BYTE() << bit_len;
          bit_len += 8;
        }
      }

      function GETBITS(n) {
        return bit_buf & MASK_BITS[n];
      }

      function DUMPBITS(n) {
        bit_buf >>= n;
        bit_len -= n;
      }

      function inflate_codes(buff, off, size) {
        // inflate (decompress) the codes in a deflated (compressed) block.
        // Return an error code or zero if it all goes ok.
        var e; // table entry flag/number of extra bits

        var t; // (HuftNode) pointer to table entry

        var n;

        if (size === 0) {
          return 0;
        } // inflate the coded data


        n = 0;

        for (;;) {
          // do until end of block
          NEEDBITS(bl);
          t = tl.list[GETBITS(bl)];
          e = t.e;

          while (e > 16) {
            if (e === 99) {
              return -1;
            }

            DUMPBITS(t.b);
            e -= 16;
            NEEDBITS(e);
            t = t.t[GETBITS(e)];
            e = t.e;
          }

          DUMPBITS(t.b);

          if (e === 16) {
            // then it's a literal
            wp &= WSIZE - 1;
            buff[off + n++] = slide[wp++] = t.n;

            if (n === size) {
              return size;
            }

            continue;
          } // exit if end of block


          if (e === 15) {
            break;
          } // it's an EOB or a length
          // get length of block to copy


          NEEDBITS(e);
          copy_leng = t.n + GETBITS(e);
          DUMPBITS(e); // decode distance of block to copy

          NEEDBITS(bd);
          t = td.list[GETBITS(bd)];
          e = t.e;

          while (e > 16) {
            if (e === 99) {
              return -1;
            }

            DUMPBITS(t.b);
            e -= 16;
            NEEDBITS(e);
            t = t.t[GETBITS(e)];
            e = t.e;
          }

          DUMPBITS(t.b);
          NEEDBITS(e);
          copy_dist = wp - t.n - GETBITS(e);
          DUMPBITS(e); // do the copy

          while (copy_leng > 0 && n < size) {
            copy_leng--;
            copy_dist &= WSIZE - 1;
            wp &= WSIZE - 1;
            buff[off + n++] = slide[wp++] = slide[copy_dist++];
          }

          if (n === size) {
            return size;
          }
        }

        method = -1; // done

        return n;
      }

      function inflate_stored(buff, off, size) {
        /* "decompress" an inflated type 0 (stored) block. */
        var n; // go to byte boundary

        n = bit_len & 7;
        DUMPBITS(n); // get the length and its complement

        NEEDBITS(16);
        n = GETBITS(16);
        DUMPBITS(16);
        NEEDBITS(16);

        if (n !== (~bit_buf & 0xffff)) {
          return -1; // error in compressed data
        }

        DUMPBITS(16); // read and output the compressed data

        copy_leng = n;
        n = 0;

        while (copy_leng > 0 && n < size) {
          copy_leng--;
          wp &= WSIZE - 1;
          NEEDBITS(8);
          buff[off + n++] = slide[wp++] = GETBITS(8);
          DUMPBITS(8);
        }

        if (copy_leng === 0) {
          method = -1; // done
        }

        return n;
      }

      function inflate_fixed(buff, off, size) {
        // decompress an inflated type 1 (fixed Huffman codes) block.  We should
        // either replace this with a custom decoder, or at least precompute the
        // Huffman tables.
        // if first time, set up tables for fixed blocks
        if (!fixed_tl) {
          var i; // temporary variable

          var l = []; // 288 length list for huft_build (initialized below)

          var h; // HuftBuild
          // literal table

          for (i = 0; i < 144; i++) {
            l[i] = 8;
          }

          for (null; i < 256; i++) {
            l[i] = 9;
          }

          for (null; i < 280; i++) {
            l[i] = 7;
          }

          for (null; i < 288; i++) {
            // make a complete, but wrong code set
            l[i] = 8;
          }

          fixed_bl = 7;
          h = new HuftBuild(l, 288, 257, cplens, cplext, fixed_bl);

          if (h.status !== 0) {
            console.error("HufBuild error: " + h.status);
            return -1;
          }

          fixed_tl = h.root;
          fixed_bl = h.m; // distance table

          for (i = 0; i < 30; i++) {
            // make an incomplete code set
            l[i] = 5;
          }

          fixed_bd = 5;
          h = new HuftBuild(l, 30, 0, cpdist, cpdext, fixed_bd);

          if (h.status > 1) {
            fixed_tl = null;
            console.error("HufBuild error: " + h.status);
            return -1;
          }

          fixed_td = h.root;
          fixed_bd = h.m;
        }

        tl = fixed_tl;
        td = fixed_td;
        bl = fixed_bl;
        bd = fixed_bd;
        return inflate_codes(buff, off, size);
      }

      function inflate_dynamic(buff, off, size) {
        // decompress an inflated type 2 (dynamic Huffman codes) block.
        var i; // temporary variables

        var j;
        var l; // last length

        var n; // number of lengths to get

        var t; // (HuftNode) literal/length code table

        var nb; // number of bit length codes

        var nl; // number of literal/length codes

        var nd; // number of distance codes

        var ll = [];
        var h; // (HuftBuild)
        // literal/length and distance code lengths

        for (i = 0; i < 286 + 30; i++) {
          ll[i] = 0;
        } // read in table lengths


        NEEDBITS(5);
        nl = 257 + GETBITS(5); // number of literal/length codes

        DUMPBITS(5);
        NEEDBITS(5);
        nd = 1 + GETBITS(5); // number of distance codes

        DUMPBITS(5);
        NEEDBITS(4);
        nb = 4 + GETBITS(4); // number of bit length codes

        DUMPBITS(4);

        if (nl > 286 || nd > 30) {
          return -1; // bad lengths
        } // read in bit-length-code lengths


        for (j = 0; j < nb; j++) {
          NEEDBITS(3);
          ll[border[j]] = GETBITS(3);
          DUMPBITS(3);
        }

        for (null; j < 19; j++) {
          ll[border[j]] = 0;
        } // build decoding table for trees--single level, 7 bit lookup


        bl = 7;
        h = new HuftBuild(ll, 19, 19, null, null, bl);

        if (h.status !== 0) {
          return -1; // incomplete code set
        }

        tl = h.root;
        bl = h.m; // read in literal and distance code lengths

        n = nl + nd;
        i = l = 0;

        while (i < n) {
          NEEDBITS(bl);
          t = tl.list[GETBITS(bl)];
          j = t.b;
          DUMPBITS(j);
          j = t.n;

          if (j < 16) {
            // length of code in bits (0..15)
            ll[i++] = l = j; // save last length in l
          } else if (j === 16) {
            // repeat last length 3 to 6 times
            NEEDBITS(2);
            j = 3 + GETBITS(2);
            DUMPBITS(2);

            if (i + j > n) {
              return -1;
            }

            while (j-- > 0) {
              ll[i++] = l;
            }
          } else if (j === 17) {
            // 3 to 10 zero length codes
            NEEDBITS(3);
            j = 3 + GETBITS(3);
            DUMPBITS(3);

            if (i + j > n) {
              return -1;
            }

            while (j-- > 0) {
              ll[i++] = 0;
            }

            l = 0;
          } else {
            // j === 18: 11 to 138 zero length codes
            NEEDBITS(7);
            j = 11 + GETBITS(7);
            DUMPBITS(7);

            if (i + j > n) {
              return -1;
            }

            while (j-- > 0) {
              ll[i++] = 0;
            }

            l = 0;
          }
        } // build the decoding tables for literal/length and distance codes


        bl = lbits;
        h = new HuftBuild(ll, nl, 257, cplens, cplext, bl);

        if (bl === 0) {
          // no literals or lengths
          h.status = 1;
        }

        if (h.status !== 0) {
          if (h.status !== 1) {
            return -1; // incomplete code set
          } // **incomplete literal tree**

        }

        tl = h.root;
        bl = h.m;

        for (i = 0; i < nd; i++) {
          ll[i] = ll[i + nl];
        }

        bd = dbits;
        h = new HuftBuild(ll, nd, 0, cpdist, cpdext, bd);
        td = h.root;
        bd = h.m;

        if (bd === 0 && nl > 257) {
          // lengths but no distances
          // **incomplete distance tree**
          return -1;
        }
        /*
        		if (h.status === 1) {
        			// **incomplete distance tree**
        		}
        */


        if (h.status !== 0) {
          return -1;
        } // decompress until an end-of-block code


        return inflate_codes(buff, off, size);
      }

      function inflate_start() {
        if (!slide) {
          slide = []; // new Array(2 * WSIZE); // slide.length is never called
        }

        wp = 0;
        bit_buf = 0;
        bit_len = 0;
        method = -1;
        eof = false;
        copy_leng = copy_dist = 0;
        tl = null;
      }

      function inflate_internal(buff, off, size) {
        // decompress an inflated entry
        var n, i;
        n = 0;

        while (n < size) {
          if (eof && method === -1) {
            return n;
          }

          if (copy_leng > 0) {
            if (method !== STORED_BLOCK) {
              // STATIC_TREES or DYN_TREES
              while (copy_leng > 0 && n < size) {
                copy_leng--;
                copy_dist &= WSIZE - 1;
                wp &= WSIZE - 1;
                buff[off + n++] = slide[wp++] = slide[copy_dist++];
              }
            } else {
              while (copy_leng > 0 && n < size) {
                copy_leng--;
                wp &= WSIZE - 1;
                NEEDBITS(8);
                buff[off + n++] = slide[wp++] = GETBITS(8);
                DUMPBITS(8);
              }

              if (copy_leng === 0) {
                method = -1; // done
              }
            }

            if (n === size) {
              return n;
            }
          }

          if (method === -1) {
            if (eof) {
              break;
            } // read in last block bit


            NEEDBITS(1);

            if (GETBITS(1) !== 0) {
              eof = true;
            }

            DUMPBITS(1); // read in block type

            NEEDBITS(2);
            method = GETBITS(2);
            DUMPBITS(2);
            tl = null;
            copy_leng = 0;
          }

          switch (method) {
            case STORED_BLOCK:
              i = inflate_stored(buff, off + n, size - n);
              break;

            case STATIC_TREES:
              if (tl) {
                i = inflate_codes(buff, off + n, size - n);
              } else {
                i = inflate_fixed(buff, off + n, size - n);
              }

              break;

            case DYN_TREES:
              if (tl) {
                i = inflate_codes(buff, off + n, size - n);
              } else {
                i = inflate_dynamic(buff, off + n, size - n);
              }

              break;

            default:
              // error
              i = -1;
              break;
          }

          if (i === -1) {
            if (eof) {
              return 0;
            }

            return -1;
          }

          n += i;
        }

        return n;
      }

      function inflate(arr) {
        var buff = [],
            i;
        inflate_start();
        inflate_data = arr;
        inflate_pos = 0;

        do {
          i = inflate_internal(buff, buff.length, 1024);
        } while (i > 0);

        inflate_data = null; // G.C.

        return buff;
      }

      module.exports = inflate;
    })();
  });

  var rawdeflate = createCommonjsModule(function (module) {
    /*
     * $Id: rawdeflate.js,v 0.3 2009/03/01 19:05:05 dankogai Exp dankogai $
     *
     * Original:
     *   http://www.onicos.com/staff/iz/amuse/javascript/expert/deflate.txt
     */

    /* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
     * Version: 1.0.1
     * LastModified: Dec 25 1999
     */

    /* Interface:
     * data = deflate(src);
     */
    (function () {
      /* constant parameters */
      var WSIZE = 32768,
          // Sliding Window size
      STORED_BLOCK = 0,
          STATIC_TREES = 1,
          DYN_TREES = 2,

      /* for deflate */
      DEFAULT_LEVEL = 6,
          // Input buffer size
      //INBUF_EXTRA = 64, // Extra buffer
      OUTBUFSIZ = 1024 * 8,
          window_size = 2 * WSIZE,
          MIN_MATCH = 3,
          MAX_MATCH = 258,
          // for SMALL_MEM
      LIT_BUFSIZE = 0x2000,
          //		HASH_BITS = 13,
      //for MEDIUM_MEM
      //	LIT_BUFSIZE = 0x4000,
      //	HASH_BITS = 14,
      // for BIG_MEM
      //	LIT_BUFSIZE = 0x8000,
      HASH_BITS = 15,
          DIST_BUFSIZE = LIT_BUFSIZE,
          HASH_SIZE = 1 << HASH_BITS,
          HASH_MASK = HASH_SIZE - 1,
          WMASK = WSIZE - 1,
          NIL = 0,
          // Tail of hash chains
      TOO_FAR = 4096,
          MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1,
          MAX_DIST = WSIZE - MIN_LOOKAHEAD,
          SMALLEST = 1,
          MAX_BITS = 15,
          MAX_BL_BITS = 7,
          LENGTH_CODES = 29,
          LITERALS = 256,
          END_BLOCK = 256,
          L_CODES = LITERALS + 1 + LENGTH_CODES,
          D_CODES = 30,
          BL_CODES = 19,
          REP_3_6 = 16,
          REPZ_3_10 = 17,
          REPZ_11_138 = 18,
          HEAP_SIZE = 2 * L_CODES + 1,
          H_SHIFT = parseInt((HASH_BITS + MIN_MATCH - 1) / MIN_MATCH, 10),

      /* variables */
      free_queue,
          qhead,
          qtail,
          initflag,
          outbuf = null,
          outcnt,
          outoff,
          complete,
          window,
          d_buf,
          l_buf,
          prev,
          bi_buf,
          bi_valid,
          block_start,
          ins_h,
          hash_head,
          prev_match,
          match_available,
          match_length,
          prev_length,
          strstart,
          match_start,
          eofile,
          lookahead,
          max_chain_length,
          max_lazy_match,
          compr_level,
          good_match,
          nice_match,
          dyn_ltree,
          dyn_dtree,
          static_ltree,
          static_dtree,
          bl_tree,
          l_desc,
          d_desc,
          bl_desc,
          bl_count,
          heap,
          heap_len,
          heap_max,
          depth,
          length_code,
          dist_code,
          base_length,
          base_dist,
          flag_buf,
          last_lit,
          last_dist,
          last_flags,
          flags,
          flag_bit,
          opt_len,
          static_len,
          deflate_data,
          deflate_pos;
      /* objects (deflate) */


      function DeflateCT() {
        this.fc = 0; // frequency count or bit string

        this.dl = 0; // father node in Huffman tree or length of bit string
      }

      function DeflateTreeDesc() {
        this.dyn_tree = null; // the dynamic tree

        this.static_tree = null; // corresponding static tree or NULL

        this.extra_bits = null; // extra bits for each code or NULL

        this.extra_base = 0; // base index for extra_bits

        this.elems = 0; // max number of elements in the tree

        this.max_length = 0; // max bit length for the codes

        this.max_code = 0; // largest code with non zero frequency
      }
      /* Values for max_lazy_match, good_match and max_chain_length, depending on
       * the desired pack level (0..9). The values given below have been tuned to
       * exclude worst case performance for pathological files. Better values may be
       * found for specific files.
       */


      function DeflateConfiguration(a, b, c, d) {
        this.good_length = a; // reduce lazy search above this match length

        this.max_lazy = b; // do not perform lazy search above this match length

        this.nice_length = c; // quit search above this match length

        this.max_chain = d;
      }

      function DeflateBuffer() {
        this.next = null;
        this.len = 0;
        this.ptr = []; // new Array(OUTBUFSIZ); // ptr.length is never read

        this.off = 0;
      }
      /* constant tables */


      var extra_lbits = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
      var extra_dbits = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
      var extra_blbits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];
      var bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
      var configuration_table = [new DeflateConfiguration(0, 0, 0, 0), new DeflateConfiguration(4, 4, 8, 4), new DeflateConfiguration(4, 5, 16, 8), new DeflateConfiguration(4, 6, 32, 32), new DeflateConfiguration(4, 4, 16, 16), new DeflateConfiguration(8, 16, 32, 32), new DeflateConfiguration(8, 16, 128, 128), new DeflateConfiguration(8, 32, 128, 256), new DeflateConfiguration(32, 128, 258, 1024), new DeflateConfiguration(32, 258, 258, 4096)];
      /* routines (deflate) */

      function deflate_start(level) {
        var i;

        if (!level) {
          level = DEFAULT_LEVEL;
        } else if (level < 1) {
          level = 1;
        } else if (level > 9) {
          level = 9;
        }

        compr_level = level;
        initflag = false;
        eofile = false;

        if (outbuf !== null) {
          return;
        }

        free_queue = qhead = qtail = null;
        outbuf = []; // new Array(OUTBUFSIZ); // outbuf.length never called

        window = []; // new Array(window_size); // window.length never called

        d_buf = []; // new Array(DIST_BUFSIZE); // d_buf.length never called

        l_buf = []; // new Array(INBUFSIZ + INBUF_EXTRA); // l_buf.length never called

        prev = []; // new Array(1 << BITS); // prev.length never called

        dyn_ltree = [];

        for (i = 0; i < HEAP_SIZE; i++) {
          dyn_ltree[i] = new DeflateCT();
        }

        dyn_dtree = [];

        for (i = 0; i < 2 * D_CODES + 1; i++) {
          dyn_dtree[i] = new DeflateCT();
        }

        static_ltree = [];

        for (i = 0; i < L_CODES + 2; i++) {
          static_ltree[i] = new DeflateCT();
        }

        static_dtree = [];

        for (i = 0; i < D_CODES; i++) {
          static_dtree[i] = new DeflateCT();
        }

        bl_tree = [];

        for (i = 0; i < 2 * BL_CODES + 1; i++) {
          bl_tree[i] = new DeflateCT();
        }

        l_desc = new DeflateTreeDesc();
        d_desc = new DeflateTreeDesc();
        bl_desc = new DeflateTreeDesc();
        bl_count = []; // new Array(MAX_BITS+1); // bl_count.length never called

        heap = []; // new Array(2*L_CODES+1); // heap.length never called

        depth = []; // new Array(2*L_CODES+1); // depth.length never called

        length_code = []; // new Array(MAX_MATCH-MIN_MATCH+1); // length_code.length never called

        dist_code = []; // new Array(512); // dist_code.length never called

        base_length = []; // new Array(LENGTH_CODES); // base_length.length never called

        base_dist = []; // new Array(D_CODES); // base_dist.length never called

        flag_buf = []; // new Array(parseInt(LIT_BUFSIZE / 8, 10)); // flag_buf.length never called
      }

      function reuse_queue(p) {
        p.next = free_queue;
        free_queue = p;
      }

      function new_queue() {
        var p;

        if (free_queue !== null) {
          p = free_queue;
          free_queue = free_queue.next;
        } else {
          p = new DeflateBuffer();
        }

        p.next = null;
        p.len = p.off = 0;
        return p;
      }

      function head1(i) {
        return prev[WSIZE + i];
      }

      function head2(i, val) {
        return prev[WSIZE + i] = val;
      }
      /* put_byte is used for the compressed output, put_ubyte for the
       * uncompressed output. However unlzw() uses window for its
       * suffix table instead of its output buffer, so it does not use put_ubyte
       * (to be cleaned up).
       */


      function put_byte(c) {
        outbuf[outoff + outcnt++] = c;

        if (outoff + outcnt === OUTBUFSIZ) {
          qoutbuf();
        }
      }
      /* Output a 16 bit value, lsb first */


      function put_short(w) {
        w &= 0xffff;

        if (outoff + outcnt < OUTBUFSIZ - 2) {
          outbuf[outoff + outcnt++] = w & 0xff;
          outbuf[outoff + outcnt++] = w >>> 8;
        } else {
          put_byte(w & 0xff);
          put_byte(w >>> 8);
        }
      }
      /* ==========================================================================
       * Insert string s in the dictionary and set match_head to the previous head
       * of the hash chain (the most recent string with same hash key). Return
       * the previous length of the hash chain.
       * IN  assertion: all calls to to INSERT_STRING are made with consecutive
       *    input characters and the first MIN_MATCH bytes of s are valid
       *    (except for the last MIN_MATCH-1 bytes of the input file).
       */


      function INSERT_STRING() {
        ins_h = (ins_h << H_SHIFT ^ window[strstart + MIN_MATCH - 1] & 0xff) & HASH_MASK;
        hash_head = head1(ins_h);
        prev[strstart & WMASK] = hash_head;
        head2(ins_h, strstart);
      }
      /* Send a code of the given tree. c and tree must not have side effects */


      function SEND_CODE(c, tree) {
        send_bits(tree[c].fc, tree[c].dl);
      }
      /* Mapping from a distance to a distance code. dist is the distance - 1 and
       * must not have side effects. dist_code[256] and dist_code[257] are never
       * used.
       */


      function D_CODE(dist) {
        return (dist < 256 ? dist_code[dist] : dist_code[256 + (dist >> 7)]) & 0xff;
      }
      /* ==========================================================================
       * Compares to subtrees, using the tree depth as tie breaker when
       * the subtrees have equal frequency. This minimizes the worst case length.
       */


      function SMALLER(tree, n, m) {
        return tree[n].fc < tree[m].fc || tree[n].fc === tree[m].fc && depth[n] <= depth[m];
      }
      /* ==========================================================================
       * read string data
       */


      function read_buff(buff, offset, n) {
        var i;

        for (i = 0; i < n && deflate_pos < deflate_data.length; i++) {
          buff[offset + i] = deflate_data[deflate_pos++] & 0xff;
        }

        return i;
      }
      /* ==========================================================================
       * Initialize the "longest match" routines for a new file
       */


      function lm_init() {
        var j; // Initialize the hash table. */

        for (j = 0; j < HASH_SIZE; j++) {
          // head2(j, NIL);
          prev[WSIZE + j] = 0;
        } // prev will be initialized on the fly */
        // Set the default configuration parameters:


        max_lazy_match = configuration_table[compr_level].max_lazy;
        good_match = configuration_table[compr_level].good_length;

        {
          nice_match = configuration_table[compr_level].nice_length;
        }

        max_chain_length = configuration_table[compr_level].max_chain;
        strstart = 0;
        block_start = 0;
        lookahead = read_buff(window, 0, 2 * WSIZE);

        if (lookahead <= 0) {
          eofile = true;
          lookahead = 0;
          return;
        }

        eofile = false; // Make sure that we always have enough lookahead. This is important
        // if input comes from a device such as a tty.

        while (lookahead < MIN_LOOKAHEAD && !eofile) {
          fill_window();
        } // If lookahead < MIN_MATCH, ins_h is garbage, but this is
        // not important since only literal bytes will be emitted.


        ins_h = 0;

        for (j = 0; j < MIN_MATCH - 1; j++) {
          // UPDATE_HASH(ins_h, window[j]);
          ins_h = (ins_h << H_SHIFT ^ window[j] & 0xff) & HASH_MASK;
        }
      }
      /* ==========================================================================
       * Set match_start to the longest match starting at the given string and
       * return its length. Matches shorter or equal to prev_length are discarded,
       * in which case the result is equal to prev_length and match_start is
       * garbage.
       * IN assertions: cur_match is the head of the hash chain for the current
       *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
       */


      function longest_match(cur_match) {
        var chain_length = max_chain_length; // max hash chain length

        var scanp = strstart; // current string

        var matchp; // matched string

        var len; // length of current match

        var best_len = prev_length; // best match length so far
        // Stop when cur_match becomes <= limit. To simplify the code,
        // we prevent matches with the string of window index 0.

        var limit = strstart > MAX_DIST ? strstart - MAX_DIST : NIL;
        var strendp = strstart + MAX_MATCH;
        var scan_end1 = window[scanp + best_len - 1];
        var scan_end = window[scanp + best_len];
        var i, broke; // Do not waste too much time if we already have a good match: */

        if (prev_length >= good_match) {
          chain_length >>= 2;
        } // Assert(encoder->strstart <= window_size-MIN_LOOKAHEAD, "insufficient lookahead");


        do {
          // Assert(cur_match < encoder->strstart, "no future");
          matchp = cur_match; // Skip to next match if the match length cannot increase
          // or if the match length is less than 2:

          if (window[matchp + best_len] !== scan_end || window[matchp + best_len - 1] !== scan_end1 || window[matchp] !== window[scanp] || window[++matchp] !== window[scanp + 1]) {
            continue;
          } // The check at best_len-1 can be removed because it will be made
          // again later. (This heuristic is not always a win.)
          // It is not necessary to compare scan[2] and match[2] since they
          // are always equal when the other bytes match, given that
          // the hash keys are equal and that HASH_BITS >= 8.


          scanp += 2;
          matchp++; // We check for insufficient lookahead only every 8th comparison;
          // the 256th check will be made at strstart+258.

          while (scanp < strendp) {
            broke = false;

            for (i = 0; i < 8; i += 1) {
              scanp += 1;
              matchp += 1;

              if (window[scanp] !== window[matchp]) {
                broke = true;
                break;
              }
            }

            if (broke) {
              break;
            }
          }

          len = MAX_MATCH - (strendp - scanp);
          scanp = strendp - MAX_MATCH;

          if (len > best_len) {
            match_start = cur_match;
            best_len = len;

            {
              if (len >= nice_match) {
                break;
              }
            }

            scan_end1 = window[scanp + best_len - 1];
            scan_end = window[scanp + best_len];
          }
        } while ((cur_match = prev[cur_match & WMASK]) > limit && --chain_length !== 0);

        return best_len;
      }
      /* ==========================================================================
       * Fill the window when the lookahead becomes insufficient.
       * Updates strstart and lookahead, and sets eofile if end of input file.
       * IN assertion: lookahead < MIN_LOOKAHEAD && strstart + lookahead > 0
       * OUT assertions: at least one byte has been read, or eofile is set;
       *    file reads are performed for at least two bytes (required for the
       *    translate_eol option).
       */


      function fill_window() {
        var n, m; // Amount of free space at the end of the window.

        var more = window_size - lookahead - strstart; // If the window is almost full and there is insufficient lookahead,
        // move the upper half to the lower one to make room in the upper half.

        if (more === -1) {
          // Very unlikely, but possible on 16 bit machine if strstart == 0
          // and lookahead == 1 (input done one byte at time)
          more--;
        } else if (strstart >= WSIZE + MAX_DIST) {
          // By the IN assertion, the window is not empty so we can't confuse
          // more == 0 with more == 64K on a 16 bit machine.
          // Assert(window_size == (ulg)2*WSIZE, "no sliding with BIG_MEM");
          // System.arraycopy(window, WSIZE, window, 0, WSIZE);
          for (n = 0; n < WSIZE; n++) {
            window[n] = window[n + WSIZE];
          }

          match_start -= WSIZE;
          strstart -= WSIZE;
          /* we now have strstart >= MAX_DIST: */

          block_start -= WSIZE;

          for (n = 0; n < HASH_SIZE; n++) {
            m = head1(n);
            head2(n, m >= WSIZE ? m - WSIZE : NIL);
          }

          for (n = 0; n < WSIZE; n++) {
            // If n is not on any hash chain, prev[n] is garbage but
            // its value will never be used.
            m = prev[n];
            prev[n] = m >= WSIZE ? m - WSIZE : NIL;
          }

          more += WSIZE;
        } // At this point, more >= 2


        if (!eofile) {
          n = read_buff(window, strstart + lookahead, more);

          if (n <= 0) {
            eofile = true;
          } else {
            lookahead += n;
          }
        }
      }
      /* ==========================================================================
       * Processes a new input file and return its compressed length. This
       * function does not perform lazy evaluationof matches and inserts
       * new strings in the dictionary only for unmatched strings or for short
       * matches. It is used only for the fast compression options.
       */


      function deflate_fast() {
        while (lookahead !== 0 && qhead === null) {
          var flush; // set if current block must be flushed
          // Insert the string window[strstart .. strstart+2] in the
          // dictionary, and set hash_head to the head of the hash chain:

          INSERT_STRING(); // Find the longest match, discarding those <= prev_length.
          // At this point we have always match_length < MIN_MATCH

          if (hash_head !== NIL && strstart - hash_head <= MAX_DIST) {
            // To simplify the code, we prevent matches with the string
            // of window index 0 (in particular we have to avoid a match
            // of the string with itself at the start of the input file).
            match_length = longest_match(hash_head); // longest_match() sets match_start */

            if (match_length > lookahead) {
              match_length = lookahead;
            }
          }

          if (match_length >= MIN_MATCH) {
            // check_match(strstart, match_start, match_length);
            flush = ct_tally(strstart - match_start, match_length - MIN_MATCH);
            lookahead -= match_length; // Insert new strings in the hash table only if the match length
            // is not too large. This saves time but degrades compression.

            if (match_length <= max_lazy_match) {
              match_length--; // string at strstart already in hash table

              do {
                strstart++;
                INSERT_STRING(); // strstart never exceeds WSIZE-MAX_MATCH, so there are
                // always MIN_MATCH bytes ahead. If lookahead < MIN_MATCH
                // these bytes are garbage, but it does not matter since
                // the next lookahead bytes will be emitted as literals.
              } while (--match_length !== 0);

              strstart++;
            } else {
              strstart += match_length;
              match_length = 0;
              ins_h = window[strstart] & 0xff; // UPDATE_HASH(ins_h, window[strstart + 1]);

              ins_h = (ins_h << H_SHIFT ^ window[strstart + 1] & 0xff) & HASH_MASK; //#if MIN_MATCH !== 3
              //		Call UPDATE_HASH() MIN_MATCH-3 more times
              //#endif
            }
          } else {
            // No match, output a literal byte */
            flush = ct_tally(0, window[strstart] & 0xff);
            lookahead--;
            strstart++;
          }

          if (flush) {
            flush_block(0);
            block_start = strstart;
          } // Make sure that we always have enough lookahead, except
          // at the end of the input file. We need MAX_MATCH bytes
          // for the next match, plus MIN_MATCH bytes to insert the
          // string following the next match.


          while (lookahead < MIN_LOOKAHEAD && !eofile) {
            fill_window();
          }
        }
      }

      function deflate_better() {
        // Process the input block. */
        while (lookahead !== 0 && qhead === null) {
          // Insert the string window[strstart .. strstart+2] in the
          // dictionary, and set hash_head to the head of the hash chain:
          INSERT_STRING(); // Find the longest match, discarding those <= prev_length.

          prev_length = match_length;
          prev_match = match_start;
          match_length = MIN_MATCH - 1;

          if (hash_head !== NIL && prev_length < max_lazy_match && strstart - hash_head <= MAX_DIST) {
            // To simplify the code, we prevent matches with the string
            // of window index 0 (in particular we have to avoid a match
            // of the string with itself at the start of the input file).
            match_length = longest_match(hash_head); // longest_match() sets match_start */

            if (match_length > lookahead) {
              match_length = lookahead;
            } // Ignore a length 3 match if it is too distant: */


            if (match_length === MIN_MATCH && strstart - match_start > TOO_FAR) {
              // If prev_match is also MIN_MATCH, match_start is garbage
              // but we will ignore the current match anyway.
              match_length--;
            }
          } // If there was a match at the previous step and the current
          // match is not better, output the previous match:


          if (prev_length >= MIN_MATCH && match_length <= prev_length) {
            var flush; // set if current block must be flushed
            // check_match(strstart - 1, prev_match, prev_length);

            flush = ct_tally(strstart - 1 - prev_match, prev_length - MIN_MATCH); // Insert in hash table all strings up to the end of the match.
            // strstart-1 and strstart are already inserted.

            lookahead -= prev_length - 1;
            prev_length -= 2;

            do {
              strstart++;
              INSERT_STRING(); // strstart never exceeds WSIZE-MAX_MATCH, so there are
              // always MIN_MATCH bytes ahead. If lookahead < MIN_MATCH
              // these bytes are garbage, but it does not matter since the
              // next lookahead bytes will always be emitted as literals.
            } while (--prev_length !== 0);

            match_available = false;
            match_length = MIN_MATCH - 1;
            strstart++;

            if (flush) {
              flush_block(0);
              block_start = strstart;
            }
          } else if (match_available) {
            // If there was no match at the previous position, output a
            // single literal. If there was a match but the current match
            // is longer, truncate the previous match to a single literal.
            if (ct_tally(0, window[strstart - 1] & 0xff)) {
              flush_block(0);
              block_start = strstart;
            }

            strstart++;
            lookahead--;
          } else {
            // There is no previous match to compare with, wait for
            // the next step to decide.
            match_available = true;
            strstart++;
            lookahead--;
          } // Make sure that we always have enough lookahead, except
          // at the end of the input file. We need MAX_MATCH bytes
          // for the next match, plus MIN_MATCH bytes to insert the
          // string following the next match.


          while (lookahead < MIN_LOOKAHEAD && !eofile) {
            fill_window();
          }
        }
      }

      function init_deflate() {
        if (eofile) {
          return;
        }

        bi_buf = 0;
        bi_valid = 0;
        ct_init();
        lm_init();
        qhead = null;
        outcnt = 0;
        outoff = 0;

        if (compr_level <= 3) {
          prev_length = MIN_MATCH - 1;
          match_length = 0;
        } else {
          match_length = MIN_MATCH - 1;
          match_available = false;
        }

        complete = false;
      }
      /* ==========================================================================
       * Same as above, but achieves better compression. We use a lazy
       * evaluation for matches: a match is finally adopted only if there is
       * no better match at the next window position.
       */


      function deflate_internal(buff, off, buff_size) {
        var n;

        if (!initflag) {
          init_deflate();
          initflag = true;

          if (lookahead === 0) {
            // empty
            complete = true;
            return 0;
          }
        }

        n = qcopy(buff, off, buff_size);

        if (n === buff_size) {
          return buff_size;
        }

        if (complete) {
          return n;
        }

        if (compr_level <= 3) {
          // optimized for speed
          deflate_fast();
        } else {
          deflate_better();
        }

        if (lookahead === 0) {
          if (match_available) {
            ct_tally(0, window[strstart - 1] & 0xff);
          }

          flush_block(1);
          complete = true;
        }

        return n + qcopy(buff, n + off, buff_size - n);
      }

      function qcopy(buff, off, buff_size) {
        var n, i, j;
        n = 0;

        while (qhead !== null && n < buff_size) {
          i = buff_size - n;

          if (i > qhead.len) {
            i = qhead.len;
          } // System.arraycopy(qhead.ptr, qhead.off, buff, off + n, i);


          for (j = 0; j < i; j++) {
            buff[off + n + j] = qhead.ptr[qhead.off + j];
          }

          qhead.off += i;
          qhead.len -= i;
          n += i;

          if (qhead.len === 0) {
            var p;
            p = qhead;
            qhead = qhead.next;
            reuse_queue(p);
          }
        }

        if (n === buff_size) {
          return n;
        }

        if (outoff < outcnt) {
          i = buff_size - n;

          if (i > outcnt - outoff) {
            i = outcnt - outoff;
          } // System.arraycopy(outbuf, outoff, buff, off + n, i);


          for (j = 0; j < i; j++) {
            buff[off + n + j] = outbuf[outoff + j];
          }

          outoff += i;
          n += i;

          if (outcnt === outoff) {
            outcnt = outoff = 0;
          }
        }

        return n;
      }
      /* ==========================================================================
       * Allocate the match buffer, initialize the various tables and save the
       * location of the internal file attribute (ascii/binary) and method
       * (DEFLATE/STORE).
       */


      function ct_init() {
        var n; // iterates over tree elements

        var bits; // bit counter

        var length; // length value

        var code; // code value

        var dist; // distance index

        if (static_dtree[0].dl !== 0) {
          return; // ct_init already called
        }

        l_desc.dyn_tree = dyn_ltree;
        l_desc.static_tree = static_ltree;
        l_desc.extra_bits = extra_lbits;
        l_desc.extra_base = LITERALS + 1;
        l_desc.elems = L_CODES;
        l_desc.max_length = MAX_BITS;
        l_desc.max_code = 0;
        d_desc.dyn_tree = dyn_dtree;
        d_desc.static_tree = static_dtree;
        d_desc.extra_bits = extra_dbits;
        d_desc.extra_base = 0;
        d_desc.elems = D_CODES;
        d_desc.max_length = MAX_BITS;
        d_desc.max_code = 0;
        bl_desc.dyn_tree = bl_tree;
        bl_desc.static_tree = null;
        bl_desc.extra_bits = extra_blbits;
        bl_desc.extra_base = 0;
        bl_desc.elems = BL_CODES;
        bl_desc.max_length = MAX_BL_BITS;
        bl_desc.max_code = 0; // Initialize the mapping length (0..255) -> length code (0..28)

        length = 0;

        for (code = 0; code < LENGTH_CODES - 1; code++) {
          base_length[code] = length;

          for (n = 0; n < 1 << extra_lbits[code]; n++) {
            length_code[length++] = code;
          }
        } // Assert (length === 256, "ct_init: length !== 256");
        // Note that the length 255 (match length 258) can be represented
        // in two different ways: code 284 + 5 bits or code 285, so we
        // overwrite length_code[255] to use the best encoding:


        length_code[length - 1] = code; // Initialize the mapping dist (0..32K) -> dist code (0..29) */

        dist = 0;

        for (code = 0; code < 16; code++) {
          base_dist[code] = dist;

          for (n = 0; n < 1 << extra_dbits[code]; n++) {
            dist_code[dist++] = code;
          }
        } // Assert (dist === 256, "ct_init: dist !== 256");
        // from now on, all distances are divided by 128


        for (dist >>= 7; code < D_CODES; code++) {
          base_dist[code] = dist << 7;

          for (n = 0; n < 1 << extra_dbits[code] - 7; n++) {
            dist_code[256 + dist++] = code;
          }
        } // Assert (dist === 256, "ct_init: 256+dist !== 512");
        // Construct the codes of the static literal tree


        for (bits = 0; bits <= MAX_BITS; bits++) {
          bl_count[bits] = 0;
        }

        n = 0;

        while (n <= 143) {
          static_ltree[n++].dl = 8;
          bl_count[8]++;
        }

        while (n <= 255) {
          static_ltree[n++].dl = 9;
          bl_count[9]++;
        }

        while (n <= 279) {
          static_ltree[n++].dl = 7;
          bl_count[7]++;
        }

        while (n <= 287) {
          static_ltree[n++].dl = 8;
          bl_count[8]++;
        } // Codes 286 and 287 do not exist, but we must include them in the
        // tree construction to get a canonical Huffman tree (longest code
        // all ones)


        gen_codes(static_ltree, L_CODES + 1); // The static distance tree is trivial: */

        for (n = 0; n < D_CODES; n++) {
          static_dtree[n].dl = 5;
          static_dtree[n].fc = bi_reverse(n, 5);
        } // Initialize the first block of the first file:


        init_block();
      }
      /* ==========================================================================
       * Initialize a new block.
       */


      function init_block() {
        var n; // iterates over tree elements
        // Initialize the trees.

        for (n = 0; n < L_CODES; n++) {
          dyn_ltree[n].fc = 0;
        }

        for (n = 0; n < D_CODES; n++) {
          dyn_dtree[n].fc = 0;
        }

        for (n = 0; n < BL_CODES; n++) {
          bl_tree[n].fc = 0;
        }

        dyn_ltree[END_BLOCK].fc = 1;
        opt_len = static_len = 0;
        last_lit = last_dist = last_flags = 0;
        flags = 0;
        flag_bit = 1;
      }
      /* ==========================================================================
       * Restore the heap property by moving down the tree starting at node k,
       * exchanging a node with the smallest of its two sons if necessary, stopping
       * when the heap property is re-established (each father smaller than its
       * two sons).
       *
       * @param tree- tree to restore
       * @param k- node to move down
       */


      function pqdownheap(tree, k) {
        var v = heap[k],
            j = k << 1; // left son of k

        while (j <= heap_len) {
          // Set j to the smallest of the two sons:
          if (j < heap_len && SMALLER(tree, heap[j + 1], heap[j])) {
            j++;
          } // Exit if v is smaller than both sons


          if (SMALLER(tree, v, heap[j])) {
            break;
          } // Exchange v with the smallest son


          heap[k] = heap[j];
          k = j; // And continue down the tree, setting j to the left son of k

          j <<= 1;
        }

        heap[k] = v;
      }
      /* ==========================================================================
       * Compute the optimal bit lengths for a tree and update the total bit length
       * for the current block.
       * IN assertion: the fields freq and dad are set, heap[heap_max] and
       *    above are the tree nodes sorted by increasing frequency.
       * OUT assertions: the field len is set to the optimal bit length, the
       *     array bl_count contains the frequencies for each bit length.
       *     The length opt_len is updated; static_len is also updated if stree is
       *     not null.
       */


      function gen_bitlen(desc) {
        // the tree descriptor
        var tree = desc.dyn_tree;
        var extra = desc.extra_bits;
        var base = desc.extra_base;
        var max_code = desc.max_code;
        var max_length = desc.max_length;
        var stree = desc.static_tree;
        var h; // heap index

        var n, m; // iterate over the tree elements

        var bits; // bit length

        var xbits; // extra bits

        var f; // frequency

        var overflow = 0; // number of elements with bit length too large

        for (bits = 0; bits <= MAX_BITS; bits++) {
          bl_count[bits] = 0;
        } // In a first pass, compute the optimal bit lengths (which may
        // overflow in the case of the bit length tree).


        tree[heap[heap_max]].dl = 0; // root of the heap

        for (h = heap_max + 1; h < HEAP_SIZE; h++) {
          n = heap[h];
          bits = tree[tree[n].dl].dl + 1;

          if (bits > max_length) {
            bits = max_length;
            overflow++;
          }

          tree[n].dl = bits; // We overwrite tree[n].dl which is no longer needed

          if (n > max_code) {
            continue; // not a leaf node
          }

          bl_count[bits]++;
          xbits = 0;

          if (n >= base) {
            xbits = extra[n - base];
          }

          f = tree[n].fc;
          opt_len += f * (bits + xbits);

          if (stree !== null) {
            static_len += f * (stree[n].dl + xbits);
          }
        }

        if (overflow === 0) {
          return;
        } // This happens for example on obj2 and pic of the Calgary corpus
        // Find the first bit length which could increase:


        do {
          bits = max_length - 1;

          while (bl_count[bits] === 0) {
            bits--;
          }

          bl_count[bits]--; // move one leaf down the tree

          bl_count[bits + 1] += 2; // move one overflow item as its brother

          bl_count[max_length]--; // The brother of the overflow item also moves one step up,
          // but this does not affect bl_count[max_length]

          overflow -= 2;
        } while (overflow > 0); // Now recompute all bit lengths, scanning in increasing frequency.
        // h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
        // lengths instead of fixing only the wrong ones. This idea is taken
        // from 'ar' written by Haruhiko Okumura.)


        for (bits = max_length; bits !== 0; bits--) {
          n = bl_count[bits];

          while (n !== 0) {
            m = heap[--h];

            if (m > max_code) {
              continue;
            }

            if (tree[m].dl !== bits) {
              opt_len += (bits - tree[m].dl) * tree[m].fc;
              tree[m].fc = bits;
            }

            n--;
          }
        }
      }
      /* ==========================================================================
       * Generate the codes for a given tree and bit counts (which need not be
       * optimal).
       * IN assertion: the array bl_count contains the bit length statistics for
       * the given tree and the field len is set for all tree elements.
       * OUT assertion: the field code is set for all tree elements of non
       *     zero code length.
       * @param tree- the tree to decorate
       * @param max_code- largest code with non-zero frequency
       */


      function gen_codes(tree, max_code) {
        var next_code = []; // new Array(MAX_BITS + 1); // next code value for each bit length

        var code = 0; // running code value

        var bits; // bit index

        var n; // code index
        // The distribution counts are first used to generate the code values
        // without bit reversal.

        for (bits = 1; bits <= MAX_BITS; bits++) {
          code = code + bl_count[bits - 1] << 1;
          next_code[bits] = code;
        } // Check that the bit counts in bl_count are consistent. The last code
        // must be all ones.
        // Assert (code + encoder->bl_count[MAX_BITS]-1 === (1<<MAX_BITS)-1, "inconsistent bit counts");
        // Tracev((stderr,"\ngen_codes: max_code %d ", max_code));


        for (n = 0; n <= max_code; n++) {
          var len = tree[n].dl;

          if (len === 0) {
            continue;
          } // Now reverse the bits


          tree[n].fc = bi_reverse(next_code[len]++, len); // Tracec(tree !== static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ", n, (isgraph(n) ? n : ' '), len, tree[n].fc, next_code[len]-1));
        }
      }
      /* ==========================================================================
       * Construct one Huffman tree and assigns the code bit strings and lengths.
       * Update the total bit length for the current block.
       * IN assertion: the field freq is set for all tree elements.
       * OUT assertions: the fields len and code are set to the optimal bit length
       *     and corresponding code. The length opt_len is updated; static_len is
       *     also updated if stree is not null. The field max_code is set.
       */


      function build_tree(desc) {
        // the tree descriptor
        var tree = desc.dyn_tree;
        var stree = desc.static_tree;
        var elems = desc.elems;
        var n, m; // iterate over heap elements

        var max_code = -1; // largest code with non zero frequency

        var node = elems; // next internal node of the tree
        // Construct the initial heap, with least frequent element in
        // heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
        // heap[0] is not used.

        heap_len = 0;
        heap_max = HEAP_SIZE;

        for (n = 0; n < elems; n++) {
          if (tree[n].fc !== 0) {
            heap[++heap_len] = max_code = n;
            depth[n] = 0;
          } else {
            tree[n].dl = 0;
          }
        } // The pkzip format requires that at least one distance code exists,
        // and that at least one bit should be sent even if there is only one
        // possible code. So to avoid special checks later on we force at least
        // two codes of non zero frequency.


        while (heap_len < 2) {
          var xnew = heap[++heap_len] = max_code < 2 ? ++max_code : 0;
          tree[xnew].fc = 1;
          depth[xnew] = 0;
          opt_len--;

          if (stree !== null) {
            static_len -= stree[xnew].dl;
          } // new is 0 or 1 so it does not have extra bits

        }

        desc.max_code = max_code; // The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
        // establish sub-heaps of increasing lengths:

        for (n = heap_len >> 1; n >= 1; n--) {
          pqdownheap(tree, n);
        } // Construct the Huffman tree by repeatedly combining the least two
        // frequent nodes.


        do {
          n = heap[SMALLEST];
          heap[SMALLEST] = heap[heap_len--];
          pqdownheap(tree, SMALLEST);
          m = heap[SMALLEST]; // m = node of next least frequency
          // keep the nodes sorted by frequency

          heap[--heap_max] = n;
          heap[--heap_max] = m; // Create a new node father of n and m

          tree[node].fc = tree[n].fc + tree[m].fc; //	depth[node] = (char)(MAX(depth[n], depth[m]) + 1);

          if (depth[n] > depth[m] + 1) {
            depth[node] = depth[n];
          } else {
            depth[node] = depth[m] + 1;
          }

          tree[n].dl = tree[m].dl = node; // and insert the new node in the heap

          heap[SMALLEST] = node++;
          pqdownheap(tree, SMALLEST);
        } while (heap_len >= 2);

        heap[--heap_max] = heap[SMALLEST]; // At this point, the fields freq and dad are set. We can now
        // generate the bit lengths.

        gen_bitlen(desc); // The field len is now set, we can generate the bit codes

        gen_codes(tree, max_code);
      }
      /* ==========================================================================
       * Scan a literal or distance tree to determine the frequencies of the codes
       * in the bit length tree. Updates opt_len to take into account the repeat
       * counts. (The contribution of the bit length codes will be added later
       * during the construction of bl_tree.)
       *
       * @param tree- the tree to be scanned
       * @param max_code- and its largest code of non zero frequency
       */


      function scan_tree(tree, max_code) {
        var n,
            // iterates over all tree elements
        prevlen = -1,
            // last emitted length
        curlen,
            // length of current code
        nextlen = tree[0].dl,
            // length of next code
        count = 0,
            // repeat count of the current code
        max_count = 7,
            // max repeat count
        min_count = 4; // min repeat count

        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
        }

        tree[max_code + 1].dl = 0xffff; // guard

        for (n = 0; n <= max_code; n++) {
          curlen = nextlen;
          nextlen = tree[n + 1].dl;

          if (++count < max_count && curlen === nextlen) {
            continue;
          } else if (count < min_count) {
            bl_tree[curlen].fc += count;
          } else if (curlen !== 0) {
            if (curlen !== prevlen) {
              bl_tree[curlen].fc++;
            }

            bl_tree[REP_3_6].fc++;
          } else if (count <= 10) {
            bl_tree[REPZ_3_10].fc++;
          } else {
            bl_tree[REPZ_11_138].fc++;
          }

          count = 0;
          prevlen = curlen;

          if (nextlen === 0) {
            max_count = 138;
            min_count = 3;
          } else if (curlen === nextlen) {
            max_count = 6;
            min_count = 3;
          } else {
            max_count = 7;
            min_count = 4;
          }
        }
      }
      /* ==========================================================================
       * Send a literal or distance tree in compressed form, using the codes in
       * bl_tree.
       *
       * @param tree- the tree to be scanned
       * @param max_code- and its largest code of non zero frequency
       */


      function send_tree(tree, max_code) {
        var n; // iterates over all tree elements

        var prevlen = -1; // last emitted length

        var curlen; // length of current code

        var nextlen = tree[0].dl; // length of next code

        var count = 0; // repeat count of the current code

        var max_count = 7; // max repeat count

        var min_count = 4; // min repeat count
        // tree[max_code+1].dl = -1; */  /* guard already set */

        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
        }

        for (n = 0; n <= max_code; n++) {
          curlen = nextlen;
          nextlen = tree[n + 1].dl;

          if (++count < max_count && curlen === nextlen) {
            continue;
          } else if (count < min_count) {
            do {
              SEND_CODE(curlen, bl_tree);
            } while (--count !== 0);
          } else if (curlen !== 0) {
            if (curlen !== prevlen) {
              SEND_CODE(curlen, bl_tree);
              count--;
            } // Assert(count >= 3 && count <= 6, " 3_6?");


            SEND_CODE(REP_3_6, bl_tree);
            send_bits(count - 3, 2);
          } else if (count <= 10) {
            SEND_CODE(REPZ_3_10, bl_tree);
            send_bits(count - 3, 3);
          } else {
            SEND_CODE(REPZ_11_138, bl_tree);
            send_bits(count - 11, 7);
          }

          count = 0;
          prevlen = curlen;

          if (nextlen === 0) {
            max_count = 138;
            min_count = 3;
          } else if (curlen === nextlen) {
            max_count = 6;
            min_count = 3;
          } else {
            max_count = 7;
            min_count = 4;
          }
        }
      }
      /* ==========================================================================
       * Construct the Huffman tree for the bit lengths and return the index in
       * bl_order of the last bit length code to send.
       */


      function build_bl_tree() {
        var max_blindex; // index of last bit length code of non zero freq
        // Determine the bit length frequencies for literal and distance trees

        scan_tree(dyn_ltree, l_desc.max_code);
        scan_tree(dyn_dtree, d_desc.max_code); // Build the bit length tree:

        build_tree(bl_desc); // opt_len now includes the length of the tree representations, except
        // the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
        // Determine the number of bit length codes to send. The pkzip format
        // requires that at least 4 bit length codes be sent. (appnote.txt says
        // 3 but the actual value used is 4.)

        for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
          if (bl_tree[bl_order[max_blindex]].dl !== 0) {
            break;
          }
        } // Update opt_len to include the bit length tree and counts */


        opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4; // Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
        // encoder->opt_len, encoder->static_len));

        return max_blindex;
      }
      /* ==========================================================================
       * Send the header for a block using dynamic Huffman trees: the counts, the
       * lengths of the bit length codes, the literal tree and the distance tree.
       * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
       */


      function send_all_trees(lcodes, dcodes, blcodes) {
        // number of codes for each tree
        var rank; // index in bl_order
        // Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
        // Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES, "too many codes");
        // Tracev((stderr, "\nbl counts: "));

        send_bits(lcodes - 257, 5); // not +255 as stated in appnote.txt

        send_bits(dcodes - 1, 5);
        send_bits(blcodes - 4, 4); // not -3 as stated in appnote.txt

        for (rank = 0; rank < blcodes; rank++) {
          // Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
          send_bits(bl_tree[bl_order[rank]].dl, 3);
        } // send the literal tree


        send_tree(dyn_ltree, lcodes - 1); // send the distance tree

        send_tree(dyn_dtree, dcodes - 1);
      }
      /* ==========================================================================
       * Determine the best encoding for the current block: dynamic trees, static
       * trees or store, and output the encoded block to the zip file.
       */


      function flush_block(eof) {
        // true if this is the last block for a file
        var opt_lenb, static_lenb, // opt_len and static_len in bytes
        max_blindex, // index of last bit length code of non zero freq
        stored_len, // length of input block
        i;
        stored_len = strstart - block_start;
        flag_buf[last_flags] = flags; // Save the flags for the last 8 items
        // Construct the literal and distance trees

        build_tree(l_desc); // Tracev((stderr, "\nlit data: dyn %ld, stat %ld",
        // encoder->opt_len, encoder->static_len));

        build_tree(d_desc); // Tracev((stderr, "\ndist data: dyn %ld, stat %ld",
        // encoder->opt_len, encoder->static_len));
        // At this point, opt_len and static_len are the total bit lengths of
        // the compressed block data, excluding the tree representations.
        // Build the bit length tree for the above two trees, and get the index
        // in bl_order of the last bit length code to send.

        max_blindex = build_bl_tree(); // Determine the best encoding. Compute first the block length in bytes

        opt_lenb = opt_len + 3 + 7 >> 3;
        static_lenb = static_len + 3 + 7 >> 3; //  Trace((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u dist %u ", opt_lenb, encoder->opt_len, static_lenb, encoder->static_len, stored_len, encoder->last_lit, encoder->last_dist));

        if (static_lenb <= opt_lenb) {
          opt_lenb = static_lenb;
        }

        if (stored_len + 4 <= opt_lenb && block_start >= 0) {
          // 4: two words for the lengths
          // The test buf !== NULL is only necessary if LIT_BUFSIZE > WSIZE.
          // Otherwise we can't have processed more than WSIZE input bytes since
          // the last block flush, because compression would have been
          // successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
          // transform a block into a stored block.
          send_bits((STORED_BLOCK << 1) + eof, 3);
          /* send block type */

          bi_windup();
          /* align on byte boundary */

          put_short(stored_len);
          put_short(~stored_len); // copy block

          /*
          	p = &window[block_start];
          	for (i = 0; i < stored_len; i++) {
          		put_byte(p[i]);
          	}
          */

          for (i = 0; i < stored_len; i++) {
            put_byte(window[block_start + i]);
          }
        } else if (static_lenb === opt_lenb) {
          send_bits((STATIC_TREES << 1) + eof, 3);
          compress_block(static_ltree, static_dtree);
        } else {
          send_bits((DYN_TREES << 1) + eof, 3);
          send_all_trees(l_desc.max_code + 1, d_desc.max_code + 1, max_blindex + 1);
          compress_block(dyn_ltree, dyn_dtree);
        }

        init_block();

        if (eof !== 0) {
          bi_windup();
        }
      }
      /* ==========================================================================
       * Save the match info and tally the frequency counts. Return true if
       * the current block must be flushed.
       *
       * @param dist- distance of matched string
       * @param lc- (match length - MIN_MATCH) or unmatched char (if dist === 0)
       */


      function ct_tally(dist, lc) {
        l_buf[last_lit++] = lc;

        if (dist === 0) {
          // lc is the unmatched char
          dyn_ltree[lc].fc++;
        } else {
          // Here, lc is the match length - MIN_MATCH
          dist--; // dist = match distance - 1
          // Assert((ush)dist < (ush)MAX_DIST && (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) && (ush)D_CODE(dist) < (ush)D_CODES,  "ct_tally: bad match");

          dyn_ltree[length_code[lc] + LITERALS + 1].fc++;
          dyn_dtree[D_CODE(dist)].fc++;
          d_buf[last_dist++] = dist;
          flags |= flag_bit;
        }

        flag_bit <<= 1; // Output the flags if they fill a byte

        if ((last_lit & 7) === 0) {
          flag_buf[last_flags++] = flags;
          flags = 0;
          flag_bit = 1;
        } // Try to guess if it is profitable to stop the current block here


        if (compr_level > 2 && (last_lit & 0xfff) === 0) {
          // Compute an upper bound for the compressed length
          var out_length = last_lit * 8;
          var in_length = strstart - block_start;
          var dcode;

          for (dcode = 0; dcode < D_CODES; dcode++) {
            out_length += dyn_dtree[dcode].fc * (5 + extra_dbits[dcode]);
          }

          out_length >>= 3; // Trace((stderr,"\nlast_lit %u, last_dist %u, in %ld, out ~%ld(%ld%%) ", encoder->last_lit, encoder->last_dist, in_length, out_length, 100L - out_length*100L/in_length));

          if (last_dist < parseInt(last_lit / 2, 10) && out_length < parseInt(in_length / 2, 10)) {
            return true;
          }
        }

        return last_lit === LIT_BUFSIZE - 1 || last_dist === DIST_BUFSIZE; // We avoid equality with LIT_BUFSIZE because of wraparound at 64K
        // on 16 bit machines and because stored blocks are restricted to
        // 64K-1 bytes.
      }
      /* ==========================================================================
       * Send the block data compressed using the given Huffman trees
       *
       * @param ltree- literal tree
       * @param dtree- distance tree
       */


      function compress_block(ltree, dtree) {
        var dist; // distance of matched string

        var lc; // match length or unmatched char (if dist === 0)

        var lx = 0; // running index in l_buf

        var dx = 0; // running index in d_buf

        var fx = 0; // running index in flag_buf

        var flag = 0; // current flags

        var code; // the code to send

        var extra; // number of extra bits to send

        if (last_lit !== 0) {
          do {
            if ((lx & 7) === 0) {
              flag = flag_buf[fx++];
            }

            lc = l_buf[lx++] & 0xff;

            if ((flag & 1) === 0) {
              SEND_CODE(lc, ltree);
              /* send a literal byte */
              //	Tracecv(isgraph(lc), (stderr," '%c' ", lc));
            } else {
              // Here, lc is the match length - MIN_MATCH
              code = length_code[lc];
              SEND_CODE(code + LITERALS + 1, ltree); // send the length code

              extra = extra_lbits[code];

              if (extra !== 0) {
                lc -= base_length[code];
                send_bits(lc, extra); // send the extra length bits
              }

              dist = d_buf[dx++]; // Here, dist is the match distance - 1

              code = D_CODE(dist); //	Assert (code < D_CODES, "bad d_code");

              SEND_CODE(code, dtree); // send the distance code

              extra = extra_dbits[code];

              if (extra !== 0) {
                dist -= base_dist[code];
                send_bits(dist, extra); // send the extra distance bits
              }
            } // literal or match pair ?


            flag >>= 1;
          } while (lx < last_lit);
        }

        SEND_CODE(END_BLOCK, ltree);
      }
      /* ==========================================================================
       * Send a value on a given number of bits.
       * IN assertion: length <= 16 and value fits in length bits.
       *
       * @param value- value to send
       * @param length- number of bits
       */


      var Buf_size = 16; // bit size of bi_buf

      function send_bits(value, length) {
        // If not enough room in bi_buf, use (valid) bits from bi_buf and
        // (16 - bi_valid) bits from value, leaving (width - (16-bi_valid))
        // unused bits in value.
        if (bi_valid > Buf_size - length) {
          bi_buf |= value << bi_valid;
          put_short(bi_buf);
          bi_buf = value >> Buf_size - bi_valid;
          bi_valid += length - Buf_size;
        } else {
          bi_buf |= value << bi_valid;
          bi_valid += length;
        }
      }
      /* ==========================================================================
       * Reverse the first len bits of a code, using straightforward code (a faster
       * method would use a table)
       * IN assertion: 1 <= len <= 15
       *
       * @param code- the value to invert
       * @param len- its bit length
       */


      function bi_reverse(code, len) {
        var res = 0;

        do {
          res |= code & 1;
          code >>= 1;
          res <<= 1;
        } while (--len > 0);

        return res >> 1;
      }
      /* ==========================================================================
       * Write out any remaining bits in an incomplete byte.
       */


      function bi_windup() {
        if (bi_valid > 8) {
          put_short(bi_buf);
        } else if (bi_valid > 0) {
          put_byte(bi_buf);
        }

        bi_buf = 0;
        bi_valid = 0;
      }

      function qoutbuf() {
        var q, i;

        if (outcnt !== 0) {
          q = new_queue();

          if (qhead === null) {
            qhead = qtail = q;
          } else {
            qtail = qtail.next = q;
          }

          q.len = outcnt - outoff; // System.arraycopy(outbuf, outoff, q.ptr, 0, q.len);

          for (i = 0; i < q.len; i++) {
            q.ptr[i] = outbuf[outoff + i];
          }

          outcnt = outoff = 0;
        }
      }

      function deflate(arr, level) {
        var i, buff;
        deflate_data = arr;
        deflate_pos = 0;

        if (typeof level === "undefined") {
          level = DEFAULT_LEVEL;
        }

        deflate_start(level);
        buff = [];

        do {
          i = deflate_internal(buff, buff.length, 1024);
        } while (i > 0);

        deflate_data = null; // G.C.

        return buff;
      }

      module.exports = deflate;
      module.exports.DEFAULT_LEVEL = DEFAULT_LEVEL;
    })();
  });
  var rawdeflate_1 = rawdeflate.DEFAULT_LEVEL;

  var deflateJs = createCommonjsModule(function (module) {
    (function () {

      module.exports = {
        'inflate': rawinflate,
        'deflate': rawdeflate
      };
    })();
  });

  var gzip = createCommonjsModule(function (module) {
    (function () {

      var crc32$1 = crc32,
          deflate = deflateJs,
          // magic numbers marking this file as GZIP
      ID1 = 0x1F,
          ID2 = 0x8B,
          compressionMethods = {
        'deflate': 8
      },
          possibleFlags = {
        'FTEXT': 0x01,
        'FHCRC': 0x02,
        'FEXTRA': 0x04,
        'FNAME': 0x08,
        'FCOMMENT': 0x10
      },
          osMap = {
        'fat': 0,
        // FAT file system (DOS, OS/2, NT) + PKZIPW 2.50 VFAT, NTFS
        'amiga': 1,
        // Amiga
        'vmz': 2,
        // VMS (VAX or Alpha AXP)
        'unix': 3,
        // Unix
        'vm/cms': 4,
        // VM/CMS
        'atari': 5,
        // Atari
        'hpfs': 6,
        // HPFS file system (OS/2, NT 3.x)
        'macintosh': 7,
        // Macintosh
        'z-system': 8,
        // Z-System
        'cplm': 9,
        // CP/M
        'tops-20': 10,
        // TOPS-20
        'ntfs': 11,
        // NTFS file system (NT)
        'qdos': 12,
        // SMS/QDOS
        'acorn': 13,
        // Acorn RISC OS
        'vfat': 14,
        // VFAT file system (Win95, NT)
        'vms': 15,
        // MVS (code also taken for PRIMOS)
        'beos': 16,
        // BeOS (BeBox or PowerMac)
        'tandem': 17,
        // Tandem/NSK
        'theos': 18 // THEOS

      },
          os = 'unix',
          DEFAULT_LEVEL = 6;

      function putByte(n, arr) {
        arr.push(n & 0xFF);
      } // LSB first


      function putShort(n, arr) {
        arr.push(n & 0xFF);
        arr.push(n >>> 8);
      } // LSB first


      function putLong(n, arr) {
        putShort(n & 0xffff, arr);
        putShort(n >>> 16, arr);
      }

      function putString(s, arr) {
        var i,
            len = s.length;

        for (i = 0; i < len; i += 1) {
          putByte(s.charCodeAt(i), arr);
        }
      }

      function readByte(arr) {
        return arr.shift();
      }

      function readShort(arr) {
        return arr.shift() | arr.shift() << 8;
      }

      function readLong(arr) {
        var n1 = readShort(arr),
            n2 = readShort(arr); // JavaScript can't handle bits in the position 32
        // we'll emulate this by removing the left-most bit (if it exists)
        // and add it back in via multiplication, which does work

        if (n2 > 32768) {
          n2 -= 32768;
          return (n2 << 16 | n1) + 32768 * Math.pow(2, 16);
        }

        return n2 << 16 | n1;
      }

      function readString(arr) {
        var charArr = []; // turn all bytes into chars until the terminating null

        while (arr[0] !== 0) {
          charArr.push(String.fromCharCode(arr.shift()));
        } // throw away terminating null


        arr.shift(); // join all characters into a cohesive string

        return charArr.join('');
      }
      /*
       * Reads n number of bytes and return as an array.
       *
       * @param arr- Array of bytes to read from
       * @param n- Number of bytes to read
       */


      function readBytes(arr, n) {
        var i,
            ret = [];

        for (i = 0; i < n; i += 1) {
          ret.push(arr.shift());
        }

        return ret;
      }
      /*
       * ZIPs a file in GZIP format. The format is as given by the spec, found at:
       * http://www.gzip.org/zlib/rfc-gzip.html
       *
       * Omitted parts in this implementation:
       */


      function zip(data, options) {
        var flags = 0,
            level,
            out = [];

        if (!options) {
          options = {};
        }

        level = options.level || DEFAULT_LEVEL;

        if (typeof data === 'string') {
          data = Array.prototype.map.call(data, function (char) {
            return char.charCodeAt(0);
          });
        } // magic number marking this file as GZIP


        putByte(ID1, out);
        putByte(ID2, out);
        putByte(compressionMethods['deflate'], out);

        if (options.name) {
          flags |= possibleFlags['FNAME'];
        }

        putByte(flags, out);
        putLong(options.timestamp || parseInt(Date.now() / 1000, 10), out); // put deflate args (extra flags)

        if (level === 1) {
          // fastest algorithm
          putByte(4, out);
        } else if (level === 9) {
          // maximum compression (fastest algorithm)
          putByte(2, out);
        } else {
          putByte(0, out);
        } // OS identifier


        putByte(osMap[os], out);

        if (options.name) {
          // ignore the directory part
          putString(options.name.substring(options.name.lastIndexOf('/') + 1), out); // terminating null

          putByte(0, out);
        }

        deflate.deflate(data, level).forEach(function (byte) {
          putByte(byte, out);
        });
        putLong(parseInt(crc32$1(data), 16), out);
        putLong(data.length, out);
        return out;
      }

      function unzip(data, options) {
        // start with a copy of the array
        var arr = Array.prototype.slice.call(data, 0),
            t,
            compressionMethod,
            flags,
            mtime,
            xFlags,
            crc,
            size,
            res; // check the first two bytes for the magic numbers

        if (readByte(arr) !== ID1 || readByte(arr) !== ID2) {
          throw 'Not a GZIP file';
        }

        t = readByte(arr);
        t = Object.keys(compressionMethods).some(function (key) {
          compressionMethod = key;
          return compressionMethods[key] === t;
        });

        if (!t) {
          throw 'Unsupported compression method';
        }

        flags = readByte(arr);
        mtime = readLong(arr);
        xFlags = readByte(arr);
        t = readByte(arr);
        Object.keys(osMap).some(function (key) {
          if (osMap[key] === t) {
            return true;
          }
        }); // just throw away the bytes for now

        if (flags & possibleFlags['FEXTRA']) {
          t = readShort(arr);
          readBytes(arr, t);
        } // just throw away for now


        if (flags & possibleFlags['FNAME']) {
          readString(arr);
        } // just throw away for now


        if (flags & possibleFlags['FCOMMENT']) {
          readString(arr);
        } // just throw away for now


        if (flags & possibleFlags['FHCRC']) {
          readShort(arr);
        }

        if (compressionMethod === 'deflate') {
          // give deflate everything but the last 8 bytes
          // the last 8 bytes are for the CRC32 checksum and filesize
          res = deflate.inflate(arr.splice(0, arr.length - 8));
        }

        if (flags & possibleFlags['FTEXT']) {
          res = Array.prototype.map.call(res, function (byte) {
            return String.fromCharCode(byte);
          }).join('');
        }

        crc = readLong(arr);

        if (crc !== parseInt(crc32$1(res), 16)) {
          throw 'Checksum does not match';
        }

        size = readLong(arr);

        if (size !== res.length) {
          throw 'Size of decompressed file not correct';
        }

        return res;
      }

      module.exports = {
        zip: zip,
        unzip: unzip,

        get DEFAULT_LEVEL() {
          return DEFAULT_LEVEL;
        }

      };
    })();
  });
  var gzip_1 = gzip.zip;
  var gzip_2 = gzip.unzip;
  var gzip_3 = gzip.DEFAULT_LEVEL;

  var md5 = createCommonjsModule(function (module) {

    (function ($) {
      /*
      * Add integers, wrapping at 2^32. This uses 16-bit operations internally
      * to work around bugs in some JS interpreters.
      */

      function safeAdd(x, y) {
        var lsw = (x & 0xffff) + (y & 0xffff);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return msw << 16 | lsw & 0xffff;
      }
      /*
      * Bitwise rotate a 32-bit number to the left.
      */


      function bitRotateLeft(num, cnt) {
        return num << cnt | num >>> 32 - cnt;
      }
      /*
      * These functions implement the four basic operations the algorithm uses.
      */


      function md5cmn(q, a, b, x, s, t) {
        return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
      }

      function md5ff(a, b, c, d, x, s, t) {
        return md5cmn(b & c | ~b & d, a, b, x, s, t);
      }

      function md5gg(a, b, c, d, x, s, t) {
        return md5cmn(b & d | c & ~d, a, b, x, s, t);
      }

      function md5hh(a, b, c, d, x, s, t) {
        return md5cmn(b ^ c ^ d, a, b, x, s, t);
      }

      function md5ii(a, b, c, d, x, s, t) {
        return md5cmn(c ^ (b | ~d), a, b, x, s, t);
      }
      /*
      * Calculate the MD5 of an array of little-endian words, and a bit length.
      */


      function binlMD5(x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << len % 32;
        x[(len + 64 >>> 9 << 4) + 14] = len;
        var i;
        var olda;
        var oldb;
        var oldc;
        var oldd;
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;

        for (i = 0; i < x.length; i += 16) {
          olda = a;
          oldb = b;
          oldc = c;
          oldd = d;
          a = md5ff(a, b, c, d, x[i], 7, -680876936);
          d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
          c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
          b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
          a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
          d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
          c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
          b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
          a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
          d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
          c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
          b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
          a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
          d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
          c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
          b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
          a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
          d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
          c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
          b = md5gg(b, c, d, a, x[i], 20, -373897302);
          a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
          d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
          c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
          b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
          a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
          d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
          c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
          b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
          a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
          d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
          c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
          b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
          a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
          d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
          c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
          b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
          a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
          d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
          c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
          b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
          a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
          d = md5hh(d, a, b, c, x[i], 11, -358537222);
          c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
          b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
          a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
          d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
          c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
          b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
          a = md5ii(a, b, c, d, x[i], 6, -198630844);
          d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
          c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
          b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
          a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
          d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
          c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
          b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
          a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
          d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
          c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
          b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
          a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
          d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
          c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
          b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
          a = safeAdd(a, olda);
          b = safeAdd(b, oldb);
          c = safeAdd(c, oldc);
          d = safeAdd(d, oldd);
        }

        return [a, b, c, d];
      }
      /*
      * Convert an array of little-endian words to a string
      */


      function binl2rstr(input) {
        var i;
        var output = '';
        var length32 = input.length * 32;

        for (i = 0; i < length32; i += 8) {
          output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xff);
        }

        return output;
      }
      /*
      * Convert a raw string to an array of little-endian words
      * Characters >255 have their high-byte silently ignored.
      */


      function rstr2binl(input) {
        var i;
        var output = [];
        output[(input.length >> 2) - 1] = undefined;

        for (i = 0; i < output.length; i += 1) {
          output[i] = 0;
        }

        var length8 = input.length * 8;

        for (i = 0; i < length8; i += 8) {
          output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;
        }

        return output;
      }
      /*
      * Calculate the MD5 of a raw string
      */


      function rstrMD5(s) {
        return binl2rstr(binlMD5(rstr2binl(s), s.length * 8));
      }
      /*
      * Calculate the HMAC-MD5, of a key and some data (raw strings)
      */


      function rstrHMACMD5(key, data) {
        var i;
        var bkey = rstr2binl(key);
        var ipad = [];
        var opad = [];
        var hash;
        ipad[15] = opad[15] = undefined;

        if (bkey.length > 16) {
          bkey = binlMD5(bkey, key.length * 8);
        }

        for (i = 0; i < 16; i += 1) {
          ipad[i] = bkey[i] ^ 0x36363636;
          opad[i] = bkey[i] ^ 0x5c5c5c5c;
        }

        hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
        return binl2rstr(binlMD5(opad.concat(hash), 512 + 128));
      }
      /*
      * Convert a raw string to a hex string
      */


      function rstr2hex(input) {
        var hexTab = '0123456789abcdef';
        var output = '';
        var x;
        var i;

        for (i = 0; i < input.length; i += 1) {
          x = input.charCodeAt(i);
          output += hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f);
        }

        return output;
      }
      /*
      * Encode a string as utf-8
      */


      function str2rstrUTF8(input) {
        return unescape(encodeURIComponent(input));
      }
      /*
      * Take string arguments and return either raw or hex encoded strings
      */


      function rawMD5(s) {
        return rstrMD5(str2rstrUTF8(s));
      }

      function hexMD5(s) {
        return rstr2hex(rawMD5(s));
      }

      function rawHMACMD5(k, d) {
        return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d));
      }

      function hexHMACMD5(k, d) {
        return rstr2hex(rawHMACMD5(k, d));
      }

      function md5(string, key, raw) {
        if (!key) {
          if (!raw) {
            return hexMD5(string);
          }

          return rawMD5(string);
        }

        if (!raw) {
          return hexHMACMD5(key, string);
        }

        return rawHMACMD5(key, string);
      }

      if (module.exports) {
        module.exports = md5;
      } else {
        $.md5 = md5;
      }
    })(commonjsGlobal);
  });

  var lodash_groupby = createCommonjsModule(function (module, exports) {
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
     * A specialized version of `baseAggregator` for arrays.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} setter The function to set `accumulator` values.
     * @param {Function} iteratee The iteratee to transform keys.
     * @param {Object} accumulator The initial aggregated object.
     * @returns {Function} Returns `accumulator`.
     */

    function arrayAggregator(array, setter, iteratee, accumulator) {
      var index = -1,
          length = array ? array.length : 0;

      while (++index < length) {
        var value = array[index];
        setter(accumulator, value, iteratee(value), array);
      }

      return accumulator;
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
     * Aggregates elements of `collection` on `accumulator` with keys transformed
     * by `iteratee` and values set by `setter`.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} setter The function to set `accumulator` values.
     * @param {Function} iteratee The iteratee to transform keys.
     * @param {Object} accumulator The initial aggregated object.
     * @returns {Function} Returns `accumulator`.
     */


    function baseAggregator(collection, setter, iteratee, accumulator) {
      baseEach(collection, function (value, key, collection) {
        setter(accumulator, value, iteratee(value), collection);
      });
      return accumulator;
    }
    /**
     * The base implementation of `_.forEach` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     */


    var baseEach = createBaseEach(baseForOwn);
    /**
     * The base implementation of `baseForOwn` which iterates over `object`
     * properties returned by `keysFunc` and invokes `iteratee` for each property.
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */

    var baseFor = createBaseFor();
    /**
     * The base implementation of `_.forOwn` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */

    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys);
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
     * Creates a function like `_.groupBy`.
     *
     * @private
     * @param {Function} setter The function to set accumulator values.
     * @param {Function} [initializer] The accumulator object initializer.
     * @returns {Function} Returns the new aggregator function.
     */


    function createAggregator(setter, initializer) {
      return function (collection, iteratee) {
        var func = isArray(collection) ? arrayAggregator : baseAggregator,
            accumulator = initializer ? initializer() : {};
        return func(collection, setter, baseIteratee(iteratee, 2), accumulator);
      };
    }
    /**
     * Creates a `baseEach` or `baseEachRight` function.
     *
     * @private
     * @param {Function} eachFunc The function to iterate over a collection.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */


    function createBaseEach(eachFunc, fromRight) {
      return function (collection, iteratee) {
        if (collection == null) {
          return collection;
        }

        if (!isArrayLike(collection)) {
          return eachFunc(collection, iteratee);
        }

        var length = collection.length,
            index = fromRight ? length : -1,
            iterable = Object(collection);

        while (fromRight ? index-- : ++index < length) {
          if (iteratee(iterable[index], index, iterable) === false) {
            break;
          }
        }

        return collection;
      };
    }
    /**
     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */


    function createBaseFor(fromRight) {
      return function (object, iteratee, keysFunc) {
        var index = -1,
            iterable = Object(object),
            props = keysFunc(object),
            length = props.length;

        while (length--) {
          var key = props[fromRight ? length : ++index];

          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }

        return object;
      };
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
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The order of grouped values
     * is determined by the order they occur in `collection`. The corresponding
     * value of each key is an array of elements responsible for generating the
     * key. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity]
     *  The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.groupBy([6.1, 4.2, 6.3], Math.floor);
     * // => { '4': [4.2], '6': [6.1, 6.3] }
     *
     * // The `_.property` iteratee shorthand.
     * _.groupBy(['one', 'two', 'three'], 'length');
     * // => { '3': ['one', 'two'], '5': ['three'] }
     */


    var groupBy = createAggregator(function (result, value, key) {
      if (hasOwnProperty.call(result, key)) {
        result[key].push(value);
      } else {
        result[key] = [value];
      }
    });
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

    module.exports = groupBy;
  });

  /**
   * SDK版本号
   */
  const version = "2.3.0"; // @internal

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
      const pretitle = `${getLogTimeString()} %cLOG-QNRTC`;
      const style = "color: #66ccff; font-weight: bold;";
      console.info(pretitle, style, ...args);
    }

    debug(...args) {
      if (this.level !== "log" && this.level !== "debug") {
        return;
      }

      const pretitle = `${getLogTimeString()} %cDEBUG-QNRTC`;
      const style = "color: #A28148; font-weight: bold;";
      console.info(pretitle, style, ...args);
    }

    warning(...args) {
      if (this.level === "disable") {
        return;
      }

      const pretitle = `${getLogTimeString()} %cWARNING-QNRTC`;
      const style = "color: #E44F44; font-weight: bold;";
      console.warn(pretitle, style, ...args);
    }

  }

  function getLogTimeString() {
    const date = new Date();

    function padingStart(num) {
      const str = num.toString();

      if (str.length < 2) {
        return "0" + str;
      }

      return str;
    }

    const hours = padingStart(date.getHours());
    const mins = padingStart(date.getMinutes());
    const secs = padingStart(date.getSeconds());
    const msecs = date.getMilliseconds();
    return `[${hours}:${mins}:${secs}.${msecs}]`;
  }

  const log = new LogModel("log");

  const defaultTrackStatsReport = () => ({
    packetLossRate: 0,
    bitrate: 0,
    bytes: 0,
    packets: 0,
    packetLoss: 0,
    timestamp: Date.now()
  });
  async function getStats(pc, track, pctype) {
    const statsReport = defaultTrackStatsReport();
    let report;

    try {
      report = await pc.getStats(track);
    } catch (e) {
      log.debug("get stats error, fallback to default", e);
      return defaultTrackStatsReport();
    }

    if (!report) {
      log.debug("get null stats, fallback to default");
      return defaultTrackStatsReport();
    }

    for (const item of report.values()) {
      if (pctype === "send" && item.type === "outbound-rtp" && !item.isRemote || pctype === "recv" && item.type === "inbound-rtp" && !item.isRemote) {
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
  const defaultAudioExtraStats = {
    track_audio_volume: 0,
    jitter_buffer_delay: 0,
    bytes_sent: 0,
    bytes_received: 0
  };
  const defaultVideoExtraStats = {
    nack_count: 0,
    fir_count: 0,
    pli_count: 0,
    width: 0,
    height: 0,
    jitter_buffer_delay: 0,
    bytes_sent: 0,
    frame_encoded: 0,
    bytes_received: 0,
    frame_decoded: 0
  };
  const defaultCalculationStats = {
    frames_received: 0,
    frames_sent: 0,
    packets_lost: 0,
    packets_received: 0,
    packets_sent: 0,
    timestamp: 0,
    bytes_sent: 0,
    bytes_received: 0
  };
  var MediaType;

  (function (MediaType) {
    MediaType["Video"] = "video";
    MediaType["Audio"] = "audio";
  })(MediaType || (MediaType = {}));

  var StatsReportType;

  (function (StatsReportType) {
    StatsReportType["MediaSource"] = "media-source";
    StatsReportType["Track"] = "track";
    StatsReportType["OutBoundRtp"] = "outbound-rtp";
    StatsReportType["InBoundRtp"] = "inbound-rtp";
  })(StatsReportType || (StatsReportType = {}));

  var BoundType;

  (function (BoundType) {
    BoundType["In"] = "in";
    BoundType["Out"] = "out";
  })(BoundType || (BoundType = {}));

  function getDefaultMediaStatisticWithCalculationReport(trackId, mediaType) {
    const report = {
      track_id: trackId,
      kind: "",
      kbps: 0,
      framerate: 0,
      packet_lost_rate: 0,
      rtt: 0,
      extra_stats: null,
      calculation_stats: objectSpread({}, defaultCalculationStats)
    };

    if (mediaType === MediaType.Audio) {
      report.extra_stats = objectSpread({}, defaultAudioExtraStats);
    } else {
      report.extra_stats = objectSpread({}, defaultVideoExtraStats);
    }

    return report;
  }
  async function getMediaStatisticStats(pc) {
    let report;

    try {
      report = await pc.getStats();
    } catch (e) {
      log.debug("get media statistic stats error, fallback to default", e);
      return [];
    }

    if (!report) {
      log.debug("get null media statistic stats, fallback to default");
      return [];
    }

    const reportList = [...report.values()];
    const statisticReports = reportList.filter(reportItem => reportItem.type === StatsReportType.InBoundRtp || reportItem.type === StatsReportType.OutBoundRtp).map(item => {
      return createStatisticReport(item, reportList);
    });
    return statisticReports;
  }

  function parseVideoInOutBound(item, report) {
    report.kind = item.kind;
    report.extra_stats.nack_count = item.nackCount;
    report.extra_stats.fir_count = item.firCount;
    report.extra_stats.pli_count = item.pliCount;
    report.extra_stats.bytes_sent = item.bytesSent || 0;
    report.extra_stats.frame_encoded = item.framesEncoded || 0;
    report.extra_stats.bytes_received = item.bytesReceived || 0;
    report.extra_stats.frame_decoded = item.framesDecoded || 0;

    if (item.roundTripTime) {
      report.rtt = item.roundTripTime * 1000;
    } else if (item.googRtt) {
      report.rtt = item.googRtt;
    } else {
      report.rtt = 0;
    }

    report.calculation_stats.bytes_received = item.bytesReceived || 0;
    report.calculation_stats.bytes_sent = item.bytesSent || 0;
    report.calculation_stats.packets_lost = item.packetsLoss || 0;
    report.calculation_stats.packets_received = item.packetsReceived || 0;
    report.calculation_stats.packets_sent = item.packetsSent || 0;
    report.calculation_stats.timestamp = item.timestamp || 0;
    return report;
  }

  function parseVideoMediaSource(item, report) {
    report.framerate = item.framesPerSecond;
    return report;
  }

  function parseVideoTrack(item, report) {
    report.track_id = item.trackIdentifier;
    report.extra_stats.width = item.frameWidth;
    report.extra_stats.height = item.frameHeight;
    report.extra_stats.jitter_buffer_delay = item.jitterBufferDelay || 0;
    report.calculation_stats.frames_sent = item.framesSent || 0;
    report.calculation_stats.frames_received = item.framesReceived || 0;
    return report;
  }

  function parseAudioInOutBound(item, report) {
    report.kind = item.kind;

    if (item.roundTripTime) {
      report.rtt = item.roundTripTime * 1000;
    } else if (item.googRtt) {
      report.rtt = item.googRtt;
    } else {
      report.rtt = 0;
    }

    report.extra_stats.bytes_sent = item.bytesSent || 0;
    report.extra_stats.bytes_received = item.bytesReceived || 0;
    report.calculation_stats.bytes_received = item.bytesReceived || 0;
    report.calculation_stats.bytes_sent = item.bytesSent || 0;
    report.calculation_stats.packets_lost = item.packetsLoss || 0;
    report.calculation_stats.packets_received = item.packetsReceived || 0;
    report.calculation_stats.packets_sent = item.packetsSent || 0;
    report.calculation_stats.timestamp = item.timestamp || 0;
    return report;
  }

  function parseAudioMediaSource(item, report) {
    report.extra_stats.track_audio_volume = item.audioLevel;
    return report;
  }

  function parseAudioTrack(item, report) {
    report.track_id = item.trackIdentifier;
    report.extra_stats.jitter_buffer_delay = item.jitterBufferDelay || 0;
    report.calculation_stats.frames_sent = item.framesSent || 0;
    report.calculation_stats.frames_received = item.framesReceived || 0;
    return report;
  }

  function createStatisticReport(item, reports) {
    const reportMap = {
      [StatsReportType.MediaSource]: reports.filter(reportItem => reportItem.type === StatsReportType.MediaSource).find(reportItem => reportItem.id === item.mediaSourceId),
      [StatsReportType.Track]: reports.filter(reportItem => reportItem.type === StatsReportType.Track).find(reportItem => reportItem.id === item.trackId)
    };
    let report = getDefaultMediaStatisticWithCalculationReport(item.trackId, item.mediaType);

    if (item.mediaType === MediaType.Video) {
      report = parseVideoInOutBound(item, report);

      if (reportMap[StatsReportType.MediaSource]) {
        report = parseVideoMediaSource(reportMap[StatsReportType.MediaSource], report);
      }

      if (reportMap[StatsReportType.Track]) {
        report = parseVideoTrack(reportMap[StatsReportType.Track], report);
      }
    } else {
      report = parseAudioInOutBound(item, report);

      if (reportMap[StatsReportType.MediaSource]) {
        report = parseAudioMediaSource(reportMap[StatsReportType.MediaSource], report);
      }

      if (reportMap[StatsReportType.Track]) {
        report = parseAudioTrack(reportMap[StatsReportType.Track], report);
      }
    }

    return report;
  }

  function calculationMediaStatisticReport(calculation, lastCalculation) {
    if (!calculation || !lastCalculation) {
      return {
        framerate: 0,
        kbps: 0,
        packet_lost_rate: 0
      };
    }

    const gapTime = (calculation.timestamp - lastCalculation.timestamp) / 1000;
    const framerate = gapTime === 0 ? 0 : (calculation.frames_sent - lastCalculation.frames_sent + (calculation.frames_received - lastCalculation.frames_received)) / gapTime;
    const kbps = gapTime === 0 ? 0 : (calculation.bytes_sent - lastCalculation.bytes_sent + (calculation.bytes_received - lastCalculation.bytes_received)) / (gapTime * 1024 / 8);
    const diffPackageLost = calculation.packets_lost - lastCalculation.packets_lost;
    const totalGapFrames = calculation.packets_received + calculation.packets_sent - (lastCalculation.packets_received + lastCalculation.packets_sent) + diffPackageLost;
    const packetLostRate = totalGapFrames === 0 ? 0 : diffPackageLost / totalGapFrames;
    const packet_lost_rate = Math.ceil(packetLostRate * 100);
    return {
      framerate: Math.ceil(framerate),
      kbps: Math.ceil(kbps),
      packet_lost_rate
    };
  }

  class TaskQueue extends EventEmitter {
    constructor(name, debug = true) {
      super(); // Closed flag.

      this._closed = false; // Busy running a command.

      this._busy = false; // Queue for pending commands. Each command is an Object with method,
      // resolve, reject, and other members (depending the case).

      this._queue = [];
      this.name = name || "TaskQueue";
      this.isDebug = debug;
    }

    close() {
      this._closed = true;
    }

    push(method, data) {
      if (this.isDebug) {
        log.debug(`${this.name} push()`, method, data);
      }

      return new Promise((resolve, reject) => {
        const queue = this._queue; // Append command to the queue.

        queue.push({
          method,
          data,
          resolve,
          reject
        });

        this._handlePendingCommands();
      });
    }

    _handlePendingCommands() {
      if (this._busy) {
        return;
      }

      const queue = this._queue; // Take the first command.

      const command = queue[0];

      if (!command) {
        return;
      }

      this._busy = true; // Execute it.

      this._handleCommand(command).then(() => {
        this._busy = false; // Remove the first command (the completed one) from the queue.

        queue.shift(); // And continue.

        this._handlePendingCommands();
      });
    }

    _handleCommand(command) {
      if (this.isDebug) {
        log.debug(`${this.name} _handleCommand() `, command.method, command.data);
      }

      if (this._closed) {
        command.reject(new InvalidStateError("closed"));
        return Promise.resolve();
      }

      const promiseHolder = {
        promise: null
      };
      this.emit("exec", command, promiseHolder);
      return Promise.resolve().then(() => {
        return promiseHolder.promise;
      }).then(result => {
        if (this.isDebug) {
          log.debug(`${this.name} _handleCommand() | command succeeded`, command.method);
        }

        if (this._closed) {
          command.reject(new InvalidStateError("closed"));
          return;
        } // Resolve the command with the given result (if any).


        command.resolve(result);
      }).catch(error => {
        if (this.isDebug) {
          log.warning(`${this.name} _handleCommand() | command failed [method:%s]: %o`, command.method, error);
        } // Reject the command with the error.


        command.reject(error);
      });
    }

  }

  const QNRTC_EVENTS_STORATE_KEY = "qnrtcqosevents";

  class QosModel {
    constructor() {
      this.events = [];
      this.lastSubmitTime = Date.now();
      this.submitQueue = new TaskQueue("qossubmit", false);
      getDeviceId().then(deviceId => {
        this.deviceId = deviceId;
        this.base.device_id = this.deviceId;
      });
      this.base = {
        qos_version: "2.0",
        device_id: "",
        bundle_id: window.location.href,
        app_version: "",
        sdk_version: version,
        device_model: `${browser.name}${browser.version}`,
        os_platform: browser.os,
        os_version: ""
      };
      this.initSubmitQueue();
      this.submitQueue.push("resume").catch(noop);
    }

    setSessionId(sessionId) {
      for (let i = this.events.length - 1; i >= 0; i -= 1) {
        const event = this.events[i];
        if (event.session_id) break;
        event.session_id = sessionId;
      }

      this.sessionId = sessionId;
    }

    setUserBase(userName, roomName, appId) {
      this.userBase = {
        user_id: userName,
        room_name: roomName,
        app_id: appId
      };

      for (let i = this.events.length - 1; i >= 0; i -= 1) {
        const event = this.events[i];
        if (event.user_base) break;
        event.user_base = this.userBase;
      }
    }

    addEvent(eventType, data, isForce) {
      const event = objectSpread({
        timestamp: Date.now(),
        event_id: QosEventType[eventType],
        event_name: eventType
      }, data);

      this.submitQueue.push("add", event).catch(noop);
      this.submit(isForce);
    }

    addMediaStatistics(reports, lastCalculationStatsList) {
      const statistics = reports.map((report, idx) => {
        const lastCalculationStats = lastCalculationStatsList && lastCalculationStatsList[idx];

        const {
          calculation_stats
        } = report,
              otherStats = objectWithoutProperties(report, ["calculation_stats"]);

        return objectSpread({}, otherStats, calculationMediaStatisticReport(calculation_stats, lastCalculationStats));
      });
      log.log("media statistics", statistics);
      this.addEvent("MediaStatistics", {
        cpu_loading: 0,
        track_stats: statistics
      });
    }

    submit(isForce = false) {
      this.submitQueue.push("submit", isForce).catch(noop);
    }

    initSubmitQueue() {
      this.submitQueue.on("exec", (command, ph) => {
        switch (command.method) {
          case "submit":
            {
              ph.promise = this._submit(command.data);
              return;
            }

          case "add":
            {
              ph.promise = this._addEvent(command.data);
              return;
            }

          case "resume":
            {
              ph.promise = this._recoverStoredEvents();
              return;
            }
        }
      });
    }

    async _recoverStoredEvents() {
      const res = await localforage.getItem(QNRTC_EVENTS_STORATE_KEY);
      log.log("get item", res);
      await localforage.removeItem(QNRTC_EVENTS_STORATE_KEY);
      if (!res) return;
      this.events = JSON.parse(window.atob(decodeURIComponent(res))); // 没有 sessionid 或者 user_base 的数据将被丢弃

      this.events = this.events.filter(e => !!e.session_id && !!e.user_base).sort((a, b) => {
        return a.event.timestamp - b.event.timestamp;
      });
    }

    _addEvent(event) {
      this.events.push({
        user_base: this.userBase,
        event,
        session_id: this.sessionId
      });
      this.submit();
      return Promise.resolve();
    }

    saveEvents() {
      const events = encodeURIComponent(window.btoa(JSON.stringify(this.events)));
      localforage.setItem(QNRTC_EVENTS_STORATE_KEY, events).catch(noop);
    }

    submitCheck() {
      if (!this.sessionId || !this.deviceId || !this.userBase) return false;
      if (Date.now() - this.lastSubmitTime > 60000 * 5) return true;
      if (this.events.length >= 30) return true;
      return false;
    }

    async _submit(isForce = false) {
      const result = isForce ? true : this.submitCheck();

      if (!result) {
        this.saveEvents();
        return;
      }

      try {
        const submitData = this.encodeQosSubmitData();

        for (const data of submitData) {
          const res = await fetch("https://pili-rtc-qos.qiniuapi.com/v1/rtcevent", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-gzip"
            },
            body: data.buffer
          });

          if (!res.ok) {
            throw UNEXPECTED_ERROR("rtcevent error");
          }
        }

        this.lastSubmitTime = Date.now();
        this.events = [];
        await localforage.removeItem(QNRTC_EVENTS_STORATE_KEY);
      } catch (e) {
        log.log(e);
      }
    }

    encodeQosSubmitData() {
      const submitDataGroup = lodash_groupby(this.events, e => {
        return e.session_id || "" + JSON.stringify(e.user_base);
      });
      const data = [];

      for (const key in submitDataGroup) {
        const events = submitDataGroup[key];
        if (events.length === 0) continue;
        const submitData = {
          session_id: events[0].session_id,
          user_base: events[0].user_base,
          base: this.base,
          items: events.map(e => e.event)
        };
        log.log("encode", submitData);
        const byteArray = new Uint8Array(gzip.zip(toUTF8Array(JSON.stringify(submitData))));
        data.push(byteArray);
      }

      return data;
    }

  }

  function getDeviceId() {
    return new Promise((resolve, reject) => {
      if (window.requestIdleCallback) {
        window.requestIdleCallback(() => {
          fingerprint2.get(components => {
            const deviceId = md5(JSON.stringify(components));
            resolve(deviceId);
          });
        });
      } else {
        setTimeout(() => {
          fingerprint2.get(components => {
            const deviceId = md5(JSON.stringify(components));
            resolve(deviceId);
          });
        }, 500);
      }
    });
  }

  function toUTF8Array(str) {
    const utf8 = [];

    for (let i = 0; i < str.length; i++) {
      let charcode = str.charCodeAt(i);
      if (charcode < 0x80) utf8.push(charcode);else if (charcode < 0x800) {
        utf8.push(0xc0 | charcode >> 6, 0x80 | charcode & 0x3f);
      } else if (charcode < 0xd800 || charcode >= 0xe000) {
        utf8.push(0xe0 | charcode >> 12, 0x80 | charcode >> 6 & 0x3f, 0x80 | charcode & 0x3f);
      } // surrogate pair
      else {
          i++; // UTF-16 encodes 0x10000-0x10FFFF by
          // subtracting 0x10000 and splitting the
          // 20 bits of 0x0-0xFFFFF into two halves

          charcode = 0x10000 + ((charcode & 0x3ff) << 10 | str.charCodeAt(i) & 0x3ff);
          utf8.push(0xf0 | charcode >> 18, 0x80 | charcode >> 12 & 0x3f, 0x80 | charcode >> 6 & 0x3f, 0x80 | charcode & 0x3f);
        }
    }

    return new Uint8Array(utf8);
  }

  const qos = new QosModel();

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
      qos.addEvent("SDKError", {
        error_code: code,
        error_msg: message
      });
    }

  }
  const UNEXPECTED_ERROR = msg => new QNRTCError(11000, `piliRTC: unexpected error ${msg}`);
  const AUTH_ENTER_ROOM_ERROR = msg => new QNRTCError(11001, `enterRoom error, can not get accessToken. Error: ${msg}\n please check enterRoom arguments`);
  const PUBLISH_ERROR = (code, msg) => new QNRTCError(code, `publish error, signaling code: ${code}, msg: ${msg}`);
  const CREATE_MERGE_JOB_ERROR = (code, msg) => new QNRTCError(code, `create merge job error, signaling code: ${code}, msg: ${msg}`);
  const PUBLISH_ICE_ERROR = () => new QNRTCError(11002, `publish faild, ice not ready`);
  const SUB_ICE_ERROR = () => new QNRTCError(11003, `subscribe faild, ice not ready`);
  const SUB_ERROR_NO_STREAM = userId => new QNRTCError(11004, `subscribe faild, can not find this player in streams, userId: ${userId}`);
  const SUB_P2P_ERROR = msg => new QNRTCError(11005, `subscribe faild, can not create p2p connection, ${msg}`);
  const PUB_P2P_ERROR = msg => new QNRTCError(11006, `publish faild, can not create p2p connection, ${msg}`);
  const UNSUPPORT_FMT = msg => new QNRTCError(11007, `media format not support, ${msg}`);
  const JOIN_ROOM_ERROR = (code, msg) => new QNRTCError(code, `joinRoom error, code: ${code}, ${msg}`);
  const SUB_ERROR = (code, msg) => new QNRTCError(code, `subscribe error, signaling code: ${code}, msg: ${msg}`);
  const UNPUBLISH_ERROR = (code, msg) => new QNRTCError(code, "unpublish error, code: ${code}, msg: ${msg}");
  const UNSUB_ERROR = (code, msg) => new QNRTCError(code, "unsubscribe error, code: ${code}, msg: ${msg}");
  const CONTROL_ERROR = (code, msg) => new QNRTCError(code, `send control error, code: ${code}, msg: ${msg}`);
  const NOT_SUPPORT_ERROR = msg => new QNRTCError(11008, `not support! ${msg}`);
  const SERVER_UNAVAILABLE = () => new QNRTCError(10052, "server unavailable");
  const PLUGIN_NOT_AVALIABLE = msg => new QNRTCError(11009, `plugin not avaliable! ${msg}`);
  const DEVICE_NOT_ALLOWED = msg => new QNRTCError(11010, `NotAllowedError: no permission to access media device. ${msg}`);
  const SUB_ERROR_NO_USER = userId => new QNRTCError(11011, `subscribe faild, can not find this user in room, userId: ${userId}`);
  const NO_MERGE_JOB = id => new QNRTCError(11012, `can not set merge layout stream, no merge job id ${id}`);
  const SCREEN_PERMISSION_DENIED = () => new QNRTCError(11013, `can not sharing screen/window on chrome`);
  const SUB_PUB_ABORT = () => new QNRTCError(11014, `subscribe/publish operation is aborted`);
  const AUDIO_DECODE_ERROR = e => new QNRTCError(11015, `can not decode audio data, ${e.toString()}`);
  const AUTO_SWITCH_ERROR = msg => new QNRTCError(20001, `deviceManager auto switch error. ${msg}`);
  const WS_ABORT = () => new QNRTCError(30001, `websocket abort`);
  /**
   * Error produced when calling a method in an invalid state.
   */

  class InvalidStateError extends Error {
    constructor(message) {
      super(message);
      this.name = "InvalidStateError";

      if (Error.hasOwnProperty("captureStackTrace")) {
        // Just in V8.
        Error.captureStackTrace(this, InvalidStateError);
      } else {
        this.stack = new Error(message).stack;
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
    } catch (e) {
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

    return {
      removeElement,
      newArray
    };
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
  function noop() {}
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
      mute: []
    };
    const lastTracksIds = lastTracksInfo.map(info => info.trackid);
    const currentTracksIds = currentTracksInfo.map(info => info.trackid);
    lastTracksIds.forEach((trackId, i) => {
      if (lastTracksInfo[i].playerid === currentUserId) {
        return;
      }

      if (currentTracksIds.indexOf(trackId) === -1) {
        missingEvent.remove.push(lastTracksInfo[i]);
      } else {
        const currentTracksInfoItem = currentTracksInfo.find(t => t.trackid === trackId);
        const lastTrackInfoItem = lastTracksInfo[i]; // 如果重连后 trackid 相同但是 versionid 不同，抛出 track-remove 和 track-add

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
          muted: currentTracksInfo[i].muted
        });
      } else {
        if (currentTracksInfo[i].muted !== lastTracksInfo[index].muted) {
          missingEvent.mute.push({
            trackid: trackId,
            muted: currentTracksInfo[i].muted
          });
        }
      }
    });
    lastUsers.forEach(userId => {
      if (userId === currentUserId) {
        return;
      }

      if (currentUsers.indexOf(userId) === -1) {
        missingEvent.leave.push({
          playerid: userId
        });
      }
    });
    currentUsers.forEach(userId => {
      if (userId === currentUserId) {
        return;
      }

      if (lastUsers.indexOf(userId) === -1) {
        missingEvent.join.push({
          playerid: userId
        });
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
  function showPlayWarn(e) {
    log.warning("play failed!", e);
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
      throw {
        retry: false,
        message: res.status.toString()
      };
    }

    if (res.status !== 200) {
      throw {
        retry: true,
        message: res.status.toString()
      };
    }

    const data = await res.json();
    return data;
  }
  async function resolveIceHost(host) {
    const ipv6Match = host.match(/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/);
    const ipv4Match = host.match(/^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/);
    if (!!ipv4Match || !!ipv6Match) return host;

    try {
      const res = await fetch(`https://${host}/ip`);
      const data = await res.json();
      return data.ip;
    } catch (e) {
      log.warning("resolve ice failed, retry", e);
      await timeout(1000);
      return await resolveIceHost(host);
    }
  }

  function createPC() {
    const rtcOptions = {
      bundlePolicy: "max-bundle",
      rtcpMuxPolicy: "require",
      iceServers: []
    };

    if (browserReport.unifiedPlan) {
      rtcOptions.sdpSemantics = "unified-plan";
    } else {
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
    } else {
      return await pc.addTransceiver(track, {
        direction: "sendonly"
      });
    }
  }
  async function getPCStats(pc, track, pctype, lastReport) {
    if (browserReport.stats) {
      const stats = await getStats(pc, track, pctype);
      return getRateStats(stats, lastReport);
    } else {
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

    const newReport = objectSpread({}, report);

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
  }); // and the function that handles received messages

  function onMessageCallback(data) {
    // "cancel" button is clicked
    if (data === "PermissionDeniedError") {
      chromeMediaSource = "PermissionDeniedError";

      if (screenCallback) {
        return screenCallback("PermissionDeniedError");
      } else {
        throw SCREEN_PERMISSION_DENIED();
      }
    } // extension notified his presence


    if (data === "qnrtc:rtcmulticonnection-extension-loaded") {
      chromeMediaSource = "desktop";
    } // old plugin version


    if (data === "rtcmulticonnection-extension-loaded") {
      log.warning("your chrome screen sharing plugin is not the latest version, or you have other screen sharing plugins.");
    } // extension shared temp sourceId


    if (data.sourceId && screenCallback) {
      screenCallback(sourceId = data.sourceId, data.canRequestAudioTrack === true);
    }
  } // global variables


  let chromeMediaSource = "screen";
  let sourceId;
  let screenCallback;
  async function isChromeExtensionAvailable() {
    const promise = () => new Promise((resolve, reject) => {
      if (chromeMediaSource === "desktop") {
        resolve(true);
        return;
      } // ask extension if it is available


      window.postMessage("qnrtc:are-you-there", "*");
      setTimeout(() => {
        if (chromeMediaSource === "screen") {
          resolve(false);
        } else {
          resolve(true);
        }
      }, 2000);
    });

    return await promise();
  } // this function can be used to get "source-id" from the extension

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
  } // this function can be used to get "source-id" from the extension


  function getSourceIdWithAudio(callback) {
    if (sourceId) {
      return callback(sourceId);
    }

    screenCallback = callback;
    window.postMessage("qnrtc:audio-plus-tab", "*");
  }

  async function getScreenConstraints(captureSourceIdWithAudio, screen) {
    const source = screen.source;

    const contraintPromise = () => new Promise((resolve, reject) => {
      const firefoxScreenConstraints = {
        mozMediaSource: source || "window",
        mediaSource: source || "window",
        height: screen.height,
        width: screen.width
      };

      if (isFirefox) {
        resolve(firefoxScreenConstraints);
        return;
      } // this statement defines getUserMedia constraints
      // that will be used to capture content of screen


      const screen_constraints = {
        mandatory: {
          chromeMediaSource: chromeMediaSource,
          maxWidth: getNumberRangeMax(screen.width),
          maxHeight: getNumberRangeMax(screen.height)
        },
        optional: []
      }; // this statement verifies chrome extension availability
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
        } else {
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
        if (!track.info.trackId) return false;
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
    audio.autoplay = true;
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
      } else {
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
      } catch (error) {
        log.warning("safeEmit() | event listener threw an error [event:%s]:%o", event, error);
      }
    }

    safeEmitAsPromise(event, ...args) {
      return new Promise((resolve, reject) => {
        const callback = resolve;

        const errback = error => {
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
      this.sourceType = exports.TrackSourceType.NORMAL;
      /* @internal */

      this.onended = event => {
        log.warning("track ended", this.mediaTrack, this.info.trackId); // 如果是订阅下来的流触发 ended，只触发内部事件

        if (this.direction === "local") {
          this.emit("ended", event);
        } else {
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
        versionid: 0
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
      this.mediaElement.play().catch(showPlayWarn);
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
      this.info = objectSpread({}, this.info, info);
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
      } // unified-plan 下订阅的 Track 会被复用，不能释放


      if (this.direction === "local" || !browserReport.unifiedPlan) {
        this.mediaTrack.stop();
      }

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
        if (!handlers || handlers.length === 0) return defaultTrackStatsReport();
        this.stats = await this.safeEmitAsPromise("@get-stats", this.lastStats);
        this.lastStats = objectSpread({}, this.stats);
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

  const AudioContext = window.AudioContext || window.webkitAudioContext || window.Object;
  const audioContext = browserReport.audioContextOptions ? new AudioContext({
    // 控制音频延迟，默认为 interactive，在 Chrome 下为 0.01s
    latencyHint: "interactive"
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
    } else {
      unlockWebAudio();
    }
  }

  const FFT_SIZE = 2048;
  const BUFFER_SIZE = 4096;
  const MediaElementEventList = ["play", "playing", "pause", "ended", "waiting", "seeking"];
  class AudioManager extends EnhancedEventEmitter {
    constructor() {
      super(); // 麦克风音频源 或者 PCM音频源

      this.audioSource = null;
      this._audioSourceState = exports.AudioSourceState.IDLE;
      this.bufferSourceDuration = {
        startTime: 0,
        pauseTime: 0,
        lastPauseTime: 0,
        offsetTime: 0,
        stopTime: 0
      };

      this.handleMediaElementEvents = e => {
        switch (e.type) {
          case "playing":
          case "play":
            {
              this.audioSourceState = exports.AudioSourceState.PLAY;
              break;
            }

          case "pause":
            {
              if (this.audioSourceState === exports.AudioSourceState.END) break;
              this.audioSourceState = exports.AudioSourceState.PAUSE;
              break;
            }

          case "waiting":
          case "seeking":
            {
              this.audioSourceState = exports.AudioSourceState.LOADING;
              break;
            }

          case "ended":
            {
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
      if (newState === this._audioSourceState) return;
      this.emit("@audio-source-state-change", newState, this._audioSourceState);
      this._audioSourceState = newState;
    }

    onAudioBuffer(audioBufferCallback, bufferSize = BUFFER_SIZE) {
      this.audioBufferCallback = audioBufferCallback;
      this.audioBufferSize = bufferSize;
    }

    initAudioContext() {
      log.log("init audio context", audioContext.state); // in chrome, audioContext maybe in suspended state after initialization

      if (audioContext.state === "suspended") {
        log.log("audio context suspended");
        audioContext.resume().catch(e => {
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
      this.audioSource = audioContext.createBufferSource(); // 播放结束后清空节点

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
      } else if (this.audioSourceElement) {
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
        } catch (e) {
          // 说明已经 start
          this.stopAudioSource();
          this.playAudioSource(offset);
        }
      } else if (this.audioSourceElement) {
        this.audioSourceElement.currentTime = 0;
        this.audioSourceElement.play().catch(showPlayWarn);
      } else if (this.audioSource === null && this.audioSourceBuffer) {
        this.resetBufferSourceDuration(); // 说明原来的 AudioBufferSourceNode 被删掉了，重新创建

        this.setAudioBufferSource();
        this.setAudioBuffer(this.audioSourceBuffer);
        this.setAudioSourceLoop(!!this.audioSourceLoop); // fix ts error

        this.audioSource.start(0, offset);
        this.bufferSourceDuration.startTime = audioContext.currentTime;
        this.bufferSourceDuration.offsetTime = offset;
        this.audioSourceState = exports.AudioSourceState.PLAY;
      }
    }

    resumeAudioSource() {
      if (this.audioSource instanceof AudioBufferSourceNode) {
        if (this.audioSourceState !== exports.AudioSourceState.PAUSE) return;
        this.audioSource.playbackRate.value = 1;
        this.bufferSourceDuration.pauseTime += audioContext.currentTime - this.bufferSourceDuration.lastPauseTime;
        this.bufferSourceDuration.lastPauseTime = 0;
        this.audioSourceState = exports.AudioSourceState.PLAY;
      } else if (this.audioSourceElement) {
        this.audioSourceElement.play().catch(showPlayWarn);
      }
    }

    pauseAudioSource() {
      if (this.audioSource instanceof AudioBufferSourceNode) {
        // hack to pause, but firefox does not support MIN_VALUE
        if (isFirefox) {
          this.audioSource.playbackRate.value = 10e-8;
        } else {
          this.audioSource.playbackRate.value = Number.MIN_VALUE;
        }

        if (!this.bufferSourceDuration.lastPauseTime) {
          this.bufferSourceDuration.lastPauseTime = audioContext.currentTime;
        }

        this.audioSourceState = exports.AudioSourceState.PAUSE;
      } else if (this.audioSourceElement) {
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
      } else if (this.audioSourceElement) {
        this.audioSourceState = exports.AudioSourceState.END;
        this.audioSourceElement.pause();
        this.audioSourceElement.currentTime = 0;
      }
    }

    getAudioSourceCurrentTime() {
      if (this.audioSourceElement) {
        return this.audioSourceElement.currentTime;
      } else if (this.audioSource instanceof AudioBufferSourceNode) {
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
      } else if (this.audioSource instanceof AudioBufferSourceNode) {
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
      if (this.audioSourceElement) return this.audioSourceElement.duration;
      if (this.audioSourceBuffer) return this.audioSourceBuffer.duration;
      return 0;
    }

    release() {
      if (this.audioSource instanceof MediaStreamAudioSourceNode) {
        if (this.audioSource.mediaStream) this.audioSource.mediaStream.getTracks().map(t => t.stop());
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
      this.bufferSourceDuration = {
        offsetTime: 0,
        startTime: 0,
        lastPauseTime: 0,
        pauseTime: 0,
        stopTime: 0
      };
    }

  }
  /**
   * Safari 的 AudioNode.disconnect 不支持 disconnect 指定节点，只能操作全部节点
   * 这里的 polyfill 是通过 _inputNodes 保存全部已经 connect 的节点
   * 然后在 disconnect 后，将那些预期不应该被 disconnect 的节点重新 connect
   */

  function polyfillAudioNode(node) {
    if (browserReport.disconnectAudioNode) return;
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
      } else {
        nativeConnect.call(node, destination, outputIndex);
      }

      return node;
    };

    node.disconnect = (destination, output, input) => {
      nativeDisconnect.call(node, destination, output, input);

      if (!destination) {
        node._inputNodes = [];
      }

      lodash_remove(node._inputNodes, node => {
        return node === destination;
      });

      for (const n of node._inputNodes) {
        node.connect(n);
      }
    };
  }

  function aWeight(f) {
    const f2 = f * f;
    return 1.2588966 * 148840000 * f2 * f2 / ((f2 + 424.36) * Math.sqrt((f2 + 11599.29) * (f2 + 544496.41)) * (f2 + 148840000));
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
      } else if (source instanceof HTMLAudioElement) {
        audioManager.setMediaElementSource(source);
      }

      const mediaStream = audioManager.audioStream.stream;
      const audioMediaTrack = mediaStream.getTracks()[0];
      super(audioMediaTrack, userId, "local");
      this.sourceType = exports.TrackSourceType.EXTERNAL;
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

      this.onAudioEnded = event => {
        this.emit("audio-ended", event);
      };

      this.onVideoEnded = event => {
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
        }); // 监听 track 的 release 事件，更新自己的状态

        track.on("release", () => {
          lodash_remove(this.trackList, t => t === track);
          this.updateTrackState(); // 如果自己所有的 track 都 release 了，自己也 release

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
        pctype: this.direction
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
        } else {
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
      } else {
        this.enableAudio = false;
      }

      if (this.videoTrack) {
        this.enableVideo = true;
        this.muteVideo = !this.videoTrack.enabled;
      } else {
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
      const {
        removeElement,
        newArray
      } = removeElementFromArray(this.trackList, "mediaTrack", track.mediaTrack);

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
      type: msg.type
    };
  }
  function transferSignalingTrackToTrackBaseInfo(track) {
    return {
      trackId: track.trackid,
      tag: track.tag,
      mid: track.mid || undefined,
      kind: track.kind,
      userId: track.playerid,
      muted: track.muted,
      versionid: track.versionid
    };
  }
  function transferTrackBaseInfoToSignalingTrack(track, isMaster) {
    return {
      trackid: track.trackId,
      mid: track.mid || undefined,
      kind: track.kind,
      master: isMaster,
      muted: !!track.muted,
      playerid: track.userId,
      tag: track.tag || "",
      versionid: track.versionid
    };
  }
  function transferTrackToPublishTrack(track) {
    if (!track.info.mid && browserReport.unifiedPlan) {
      throw UNEXPECTED_ERROR("can not find track mid!");
    }

    return {
      localid: track.mediaTrack.id,
      localmid: track.info.mid || undefined,
      master: track.master,
      kind: track.info.kind,
      kbps: track.info.kbps,
      tag: track.info.tag
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
    } else {
      track = new Track(mediaTrack);
    }

    if (kbps) {
      track.setKbps(kbps);
    }

    track.setInfo({
      tag
    });
    return track;
  }
  async function transferRecordOptionToMediaConstraints(options) {
    if (!options) {
      return {
        audio: true,
        video: true
      };
    }

    if (REC_SCREEN_ENABLE(options)) {
      if (REC_VIDEO_ENABLE(options)) {
        throw UNEXPECTED_ERROR("can not get mediaStream with video and screen are all enabled");
      }

      if (!browserReport.screenSharing) {
        throw NOT_SUPPORT_ERROR("your browser can not share screen");
      }

      const screenOptions = options.screen; // 只有在 chrome 下，用户强制指定用插件或者用户不支持 plugin free 采集才会检查插件

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
      noiseSuppression: options.audio.noiseSuppression
    };
    const video = !options.video || !options.video.enabled ? false : {
      frameRate: options.video.frameRate,
      height: options.video.height,
      width: options.video.width,
      deviceId: options.video.deviceId
    };

    if (REC_SCREEN_ENABLE(options) && options.screen) {
      if (browserReport.getDisplayMedia && !options.screen.forceChromePlugin) {
        return createConstraints({
          audio,
          video: {
            displaySurface: getDisplaySurfaceFromSourceOption(options.screen.source),
            width: options.screen.width,
            height: options.screen.height,
            frameRate: options.screen.frameRate
          }
        });
      }

      const constraints = await getScreenConstraints(false, options.screen);
      return createConstraints({
        audio,
        video: constraints
      });
    }

    return createConstraints({
      audio,
      video
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

  const createConstraints = constraints => deleteConstraintsEmptyObject(processConstraints(removeUndefinedKey(constraints)));

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
  } // fix old chrome


  function deleteConstraintsEmptyObject(constraints) {
    if (Object.keys(constraints.audio).length === 0 && typeof constraints.audio !== "boolean") {
      constraints.audio = true;
    }

    if (Object.keys(constraints.video).length === 0 && typeof constraints.video !== "boolean") {
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
      if (!this.transportRemoteParameters) throw UNEXPECTED_ERROR("no transportRemoteParameters!");

      if (browserReport.unifiedPlan) {
        return createUnifiedPlanAnswerSdp(this.extendedRtpCapabilities, this.transportRemoteParameters, offer);
      } else {
        return createPlanBAnswerSdp(this.extendedRtpCapabilities, this.transportRemoteParameters, offer);
      }
    }

    createRemoteOffer(consumerInfos) {
      if (!this.transportRemoteParameters) throw UNEXPECTED_ERROR("no transportRemoteParameters!");

      if (browserReport.unifiedPlan) {
        const sortedConsumerInfos = sortConsumerInfos(consumerInfos, this.lastSubMids);
        this.lastSubMids = sortedConsumerInfos.map(c => c.mid);
        this.sessionVersion += 1;
        return createUnifiedPlanOfferSdp(sortedConsumerInfos, this.extendedRtpCapabilities, this.transportRemoteParameters, this.sessionVersion);
      } else {
        const kind = new Set();
        consumerInfos.forEach(c => kind.add(c.kind)); //  如果没有传入 consumerInfos 代表是创建 sub pc

        if (consumerInfos.length === 0) {
          kind.add("audio");
          kind.add("video");
        }

        return createPlanBOfferSdp(Array.from(kind), consumerInfos, this.extendedRtpCapabilities, this.transportRemoteParameters);
      }
    }

    async updateICEData(iceParameters, iceCandidates) {
      if (!this.transportRemoteParameters) return;

      for (const candidate of iceCandidates) {
        candidate.ip = await resolveIceHost(candidate.ip);
      }

      this.transportRemoteParameters.iceCandidates = iceCandidates;
      this.transportRemoteParameters.iceParameters = iceParameters;
    }

  }
  async function getClientCapabilitiesSdp() {
    const pc = createPC();
    const offerOptions = {
      offerToReceiveAudio: true,
      offerToReceiveVideo: true
    };
    const offer = await pc.createOffer(offerOptions);

    if (browserReport.needH264FmtpLine) {
      offer.sdp += `a=fmtp:107 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f${NEW_LINE}`;
    }

    const capsdp = {
      capsdp: offer.sdp,
      agent: navigator.userAgent
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
      username: REMOTE_SERVER_NAME
    };
    sdpObj.name = "-";
    sdpObj.timing = {
      start: 0,
      stop: 0
    };
    sdpObj.icelite = data.iceParameters.iceLite ? "ice-lite" : undefined;
    sdpObj.msidSemantic = {
      semantic: "WMS",
      token: "*"
    };
    sdpObj.fingerprint = {
      type: data.dtlsParameters.fingerprints[0].algorithm,
      hash: data.dtlsParameters.fingerprints[0].value
    };
    const newMedia = [];

    for (const _mSection of sdpObj.media) {
      const kind = _mSection.type;
      const codec = rtpcaps.codecs.find(c => c.kind === kind);
      const headerExtensions = (rtpcaps.headerExtensions || []).filter(h => h.kind === kind);
      if (!codec) throw UNEXPECTED_ERROR("can not find codec" + kind);
      const mSection = {
        type: kind,
        mid: kind,
        port: 7,
        protocol: "RTP/SAVPF",
        connection: {
          ip: "127.0.0.1",
          version: 4
        },
        iceUfrag: data.iceParameters.usernameFragment,
        icePwd: data.iceParameters.password,
        candidates: data.iceCandidates.map(iceCandidate => ({
          component: 1,
          foundation: iceCandidate.foundation,
          ip: iceCandidate.ip,
          port: iceCandidate.port,
          priority: iceCandidate.priority,
          transport: iceCandidate.protocol,
          type: iceCandidate.type
        })),
        endOfCandidates: "end-of-candidates",
        iceOptions: "renomination",
        setup: data.dtlsParameters.role === "server" ? "actpass" : "active",
        direction: "recvonly",
        rtp: [{
          payload: codec.sendPayloadType,
          codec: codec.name,
          rate: codec.clockRate,
          encoding: codec.channels > 1 ? codec.channels : undefined
        }],
        rtcpFb: [],
        fmtp: [{
          payload: codec.sendPayloadType,
          config: Object.keys(codec.parameters).map(k => `${k}=${codec.parameters[k]};`).join("")
        }],
        payloads: codec.sendPayloadType,
        rtcpMux: "rtcp-mux",
        rtcpRsize: "rtcp-rsize",
        ext: headerExtensions.map(ext => ({
          uri: ext.uri,
          value: ext.sendId
        }))
      };

      if (codec.rtcpFeedback && codec.rtcpFeedback.length > 0) {
        codec.rtcpFeedback.forEach(rf => {
          mSection.rtcpFb.push({
            payload: codec.sendPayloadType,
            type: rf.type,
            subtype: rf.parameter
          });
        });
      }

      if (codec.sendRtxPayloadType) {
        mSection.rtp.push({
          payload: codec.sendRtxPayloadType,
          codec: "rtx",
          rate: codec.clockRate,
          encoding: codec.channels > 1 ? codec.channels : undefined
        });
        mSection.fmtp.push({
          payload: codec.sendRtxPayloadType,
          config: `apt=${codec.sendPayloadType};`
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
      if (!info) continue;
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
      username: REMOTE_SERVER_NAME
    };
    sdpObj.name = "-";
    sdpObj.timing = {
      start: 0,
      stop: 0
    };
    sdpObj.icelite = data.iceParameters.iceLite ? "ice-lite" : undefined;
    sdpObj.msidSemantic = {
      semantic: "WMS",
      token: "*"
    };

    if (mids.length > 0) {
      sdpObj.groups = [{
        type: "BUNDLE",
        mids: mids.join(" ")
      }];
    }

    sdpObj.media = [];
    sdpObj.fingerprint = {
      type: data.dtlsParameters.fingerprints[0].algorithm,
      hash: data.dtlsParameters.fingerprints[0].value
    };

    for (const info of consumerInfos) {
      const codecs = info.kind === "audio" ? rtpcaps.codecs[0] : rtpcaps.codecs[1];
      const headerExtensions = rtpcaps.headerExtensions.filter(h => h.kind === info.kind);
      const mediaObj = {
        type: info.kind,
        port: 7,
        protocol: "RTP/SAVPF",
        connection: {
          ip: "127.0.0.1",
          version: 4
        },
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
          type: iceCandidate.type
        })),
        endOfCandidates: "end-of-candidates",
        iceOptions: "renomination",
        setup: data.dtlsParameters.role === "server" ? "actpass" : "active",
        direction: info.closed ? "inactive" : "sendonly",
        rtp: [{
          payload: codecs.recvPayloadType,
          codec: codecs.name,
          rate: codecs.clockRate,
          encoding: codecs.channels > 1 ? codecs.channels : undefined
        }],
        rtcpFb: [],
        fmtp: [{
          payload: codecs.recvPayloadType,
          config: Object.keys(codecs.parameters).map(k => `${k}=${codecs.parameters[k]};`).join("")
        }],
        payloads: codecs.recvPayloadType,
        rtcpMux: "rtcp-mux",
        rtcpRsize: "rtcp-rsize",
        ext: !info.closed ? headerExtensions.map(ext => ({
          uri: ext.uri,
          value: ext.recvId
        })) : [],
        ssrcs: !info.closed && info.ssrc ? [{
          id: info.ssrc,
          attribute: "cname",
          value: info.cname
        }] : [],
        ssrcGroups: []
      };

      if (codecs.rtcpFeedback && codecs.rtcpFeedback.length > 0) {
        codecs.rtcpFeedback.forEach(rf => {
          mediaObj.rtcpFb.push({
            payload: codecs.recvPayloadType,
            type: rf.type,
            subtype: rf.parameter
          });
        });
      }

      if (codecs.recvRtxPayloadType) {
        mediaObj.rtp.push({
          payload: codecs.recvRtxPayloadType,
          codec: "rtx",
          rate: codecs.clockRate,
          encoding: codecs.channels > 1 ? codecs.channels : undefined
        });
        mediaObj.fmtp.push({
          payload: codecs.recvRtxPayloadType,
          config: `apt=${codecs.recvPayloadType};`
        });
        mediaObj.payloads = `${codecs.recvPayloadType} ${codecs.recvRtxPayloadType}`;
      }

      if (info.rtxSsrc && !info.closed) {
        mediaObj.ssrcs = mediaObj.ssrcs.concat([{
          id: info.rtxSsrc,
          attribute: "cname",
          value: info.cname
        }]);
        mediaObj.ssrcGroups.push({
          semantics: "FID",
          ssrcs: `${info.ssrc} ${info.rtxSsrc}`
        });
      }

      sdpObj.media.push(mediaObj);
    }

    return lib.write(sdpObj);
  }

  function createUnifiedPlanAnswerSdp(rtpcaps, data, offer) {
    const localSdpObj = lib.parse(offer);
    const bundleMids = (localSdpObj.media || []).filter(m => m.hasOwnProperty("mid")).map(m => String(m.mid));
    const sdpObj = {};
    sdpObj.version = 0;
    sdpObj.origin = {
      address: "0.0.0.0",
      ipVer: 4,
      netType: "IN",
      sessionId: "5975129998295344376",
      sessionVersion: 2,
      username: REMOTE_SERVER_NAME
    };
    sdpObj.name = "-";
    sdpObj.timing = {
      start: 0,
      stop: 0
    };
    sdpObj.icelite = data.iceParameters.iceLite ? "ice-lite" : undefined;
    sdpObj.msidSemantic = {
      semantic: "WMS",
      token: "*"
    };

    if (bundleMids.length > 0) {
      sdpObj.groups = [{
        type: "BUNDLE",
        mids: bundleMids.join(" ")
      }];
    }

    sdpObj.media = [];
    sdpObj.fingerprint = {
      type: data.dtlsParameters.fingerprints[0].algorithm,
      hash: data.dtlsParameters.fingerprints[0].value
    };

    for (const localMediaObj of localSdpObj.media) {
      const closed = localMediaObj.direction === "inactive";
      const kind = localMediaObj.type;
      const codecs = kind === "audio" ? rtpcaps.codecs[0] : rtpcaps.codecs[1];
      const headerExtensions = rtpcaps.headerExtensions.filter(h => h.kind === kind);
      const remoteMediaObj = {
        type: localMediaObj.type,
        port: 7,
        protocol: "RTP/SAVPF",
        connection: {
          ip: "127.0.0.1",
          version: 4
        },
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
          type: iceCandidate.type
        })),
        endOfCandidates: "end-of-candidates",
        iceOptions: "renomination",
        setup: data.dtlsParameters.role === "server" ? "actpass" : "active",
        direction: localMediaObj.direction === "sendonly" || localMediaObj.direction === "sendrecv" ? "recvonly" : "inactive",
        rtp: [{
          payload: codecs.sendPayloadType,
          codec: codecs.name,
          rate: codecs.clockRate,
          encoding: codecs.channels > 1 ? codecs.channels : undefined
        }],
        rtcpFb: [],
        fmtp: [{
          payload: codecs.sendPayloadType,
          config: Object.keys(codecs.parameters).map(k => `${k}=${codecs.parameters[k]};`).join("")
        }],
        payloads: codecs.sendPayloadType,
        rtcpMux: "rtcp-mux",
        rtcpRsize: "rtcp-rsize",
        ext: headerExtensions.map(ext => ({
          uri: ext.uri,
          value: ext.sendId
        }))
      };

      if (codecs.rtcpFeedback && codecs.rtcpFeedback.length > 0) {
        codecs.rtcpFeedback.forEach(rf => {
          remoteMediaObj.rtcpFb.push({
            payload: codecs.sendPayloadType,
            type: rf.type,
            subtype: rf.parameter
          });
        });
      }

      if (codecs.sendRtxPayloadType) {
        remoteMediaObj.rtp.push({
          payload: codecs.sendRtxPayloadType,
          codec: "rtx",
          rate: codecs.clockRate,
          encoding: codecs.channels > 1 ? codecs.channels : undefined
        });
        remoteMediaObj.fmtp.push({
          payload: codecs.sendRtxPayloadType,
          config: `apt=${codecs.sendPayloadType};`
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
      username: REMOTE_SERVER_NAME
    };
    sdpObj.name = "-";
    sdpObj.timing = {
      start: 0,
      stop: 0
    };
    sdpObj.icelite = data.iceParameters.iceLite ? "ice-lite" : undefined;
    sdpObj.msidSemantic = {
      semantic: "WMS",
      token: "*"
    };
    sdpObj.groups = [{
      type: "BUNDLE",
      mids: kinds.join(" ")
    }];
    sdpObj.media = [];
    sdpObj.fingerprint = {
      type: data.dtlsParameters.fingerprints[0].algorithm,
      hash: data.dtlsParameters.fingerprints[0].value
    };

    for (const kind of kinds) {
      const kindConsumerInfos = consumerInfos.filter(i => i.kind === kind);
      const codecs = rtpcaps.codecs.find(c => c.kind === kind);
      const headerExtensions = (rtpcaps.headerExtensions || []).filter(e => e.kind === kind);
      if (!codecs) throw UNEXPECTED_ERROR("no codec" + kind);
      const mediaObj = {
        type: kind,
        port: 7,
        protocol: "RTP/SAVPF",
        connection: {
          ip: "127.0.0.1",
          version: 4
        },
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
          type: iceCandidate.type
        })),
        endOfCandidates: "end-of-candidates",
        iceOptions: "renomination",
        setup: data.dtlsParameters.role === "server" ? "actpass" : "active",
        direction: "sendonly",
        rtp: [{
          payload: codecs.recvPayloadType,
          codec: codecs.name,
          rate: codecs.clockRate,
          encoding: codecs.channels > 1 ? codecs.channels : undefined
        }],
        rtcpFb: [],
        fmtp: [{
          payload: codecs.recvPayloadType,
          config: Object.keys(codecs.parameters).map(k => `${k}=${codecs.parameters[k]};`).join("")
        }],
        payloads: codecs.recvPayloadType,
        rtcpMux: "rtcp-mux",
        rtcpRsize: "rtcp-rsize",
        ssrcs: [],
        ssrcGroups: [],
        ext: headerExtensions.map(ext => ({
          uri: ext.uri,
          value: ext.recvId
        }))
      };

      if (codecs.rtcpFeedback && codecs.rtcpFeedback.length > 0) {
        codecs.rtcpFeedback.forEach(rf => {
          mediaObj.rtcpFb.push({
            payload: codecs.recvPayloadType,
            type: rf.type,
            subtype: rf.parameter
          });
        });
      }

      if (codecs.recvRtxPayloadType) {
        mediaObj.rtp.push({
          payload: codecs.recvRtxPayloadType,
          codec: "rtx",
          rate: codecs.clockRate,
          encoding: codecs.channels > 1 ? codecs.channels : undefined
        });
        mediaObj.fmtp.push({
          payload: codecs.recvRtxPayloadType,
          config: `apt=${codecs.recvPayloadType};`
        });
        mediaObj.payloads = `${codecs.recvPayloadType} ${codecs.recvRtxPayloadType}`;
      }

      for (const info of kindConsumerInfos) {
        mediaObj.ssrcs.push({
          id: info.ssrc,
          attribute: "msid",
          value: `${info.streamId} ${info.trackId}`
        });
        mediaObj.ssrcs.push({
          id: info.ssrc,
          attribute: "mslabel",
          value: `${info.streamId}`
        });
        mediaObj.ssrcs.push({
          id: info.ssrc,
          attribute: "label",
          value: `${info.trackId}`
        });
        mediaObj.ssrcs.push({
          id: info.ssrc,
          attribute: "cname",
          value: `${info.cname}`
        });

        if (info.rtxSsrc) {
          mediaObj.ssrcGroups.push({
            semantics: "FID",
            ssrcs: `${info.ssrc} ${info.rtxSsrc}`
          });
          mediaObj.ssrcs.push({
            id: info.rtxSsrc,
            attribute: "msid",
            value: `${info.streamId} ${info.trackId}`
          });
          mediaObj.ssrcs.push({
            id: info.rtxSsrc,
            attribute: "mslabel",
            value: `${info.streamId}`
          });
          mediaObj.ssrcs.push({
            id: info.rtxSsrc,
            attribute: "label",
            value: `${info.trackId}`
          });
          mediaObj.ssrcs.push({
            id: info.rtxSsrc,
            attribute: "cname",
            value: `${info.cname}`
          });
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

  const RTC_HOST = "https://rtc.qiniuapi.com";
  async function getAccessToken(roomAccess, roomToken) {
    const {
      appId,
      roomName,
      userId
    } = roomAccess;
    const url = `${RTC_HOST}/v3/apps/${appId}/rooms/${roomName}/auth?user=${userId}&token=${roomToken}`;

    while (true) {
      const qosItem = {
        auth_start_time: Date.now(),
        auth_dns_time: 0,
        auth_server_ip: "",
        room_token: roomToken
      };

      try {
        const res = await request(url);
        qos.addEvent("MCSAuth", objectSpread({}, qosItem, {
          auth_take_time: Date.now() - qosItem.auth_start_time,
          auth_error_code: 0,
          auth_error_message: "",
          access_token: res.accessToken
        }));
        return res;
      } catch (e) {
        qos.addEvent("MCSAuth", objectSpread({}, qosItem, {
          auth_take_time: Date.now() - qosItem.auth_start_time,
          auth_error_code: e.retry === undefined ? -1 : Number(e.message),
          auth_error_message: e.retry === undefined ? e.toString() : e.message,
          access_token: ""
        }));

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
  const {
    JOIN_ROOM_ERROR: JOIN_ROOM_ERROR$1
  } = error;
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
      /**
       * 如果为 0 说明鉴权完成，或者还没有开始鉴权
       */

      this.startAuthTime = 0;

      this.initWs = (isUserAction = false) => new Promise((resolve, reject) => {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
          this.ws.close();
          this.ws.onclose = null;
        }

        this.startAuthTime = Date.now();

        try {
          this.ws = new WebSocket(this.url);
          this._state = SignalingState.CONNECTING;
        } catch (e) {
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
            supportdomain: true
          };

          if (this.playerdata) {
            authData.playerdata = this.playerdata;
          }

          this.request("auth", authData).then(msgData => {
            if (msgData.code !== 0) {
              qos.addEvent("SignalAuth", {
                auth_start_time: this.startAuthTime,
                auth_dns_time: 0,
                auth_server_ip: "",
                auth_error_code: msgData.code,
                auth_error_message: msgData.error,
                auth_take_time: Date.now() - this.startAuthTime,
                access_token: this.accessToken
              });
              this.startAuthTime = 0;
            }

            switch (msgData.code) {
              case 0:
                {
                  this.ws.onclose = this.onWsClose.bind(this, null, null);
                  this.reconnectToken = msgData.reconntoken;
                  log.log("signaling: websocket authed");
                  this.emit("@signalingauth", msgData);
                  this._state = SignalingState.OPEN;
                  qos.addEvent("SignalAuth", {
                    auth_start_time: this.startAuthTime,
                    auth_dns_time: 0,
                    auth_server_ip: "",
                    auth_error_code: 0,
                    auth_error_message: "",
                    auth_take_time: Date.now() - this.startAuthTime,
                    access_token: this.accessToken
                  });
                  this.startAuthTime = 0;
                  resolve(msgData);
                  break;
                }

              case 10001: // 用户 token 错误

              case 10002: // 用户 token 过期

              case 10011: // 房间人数已满

              case 10022: // 已经在其他设备登陆

              case 10004:
                {
                  // reconnect token error (重连超时)
                  this.emit("@error", msgData);
                  reject(JOIN_ROOM_ERROR$1(msgData.code, msgData.error));
                  break;
                }

              case 10012:
                {
                  // room not exist, 需要重新签 accessToken
                  this.safeEmitAsPromise("@needupdateaccesstoken").then(() => {
                    this.reconnect().then(resolve).catch(reject);
                  }).catch(e => {
                    // 如果获取 accesstoken 出错，因为有重试逻辑，只可能是 roomtoken 本身过期了
                    this.emit("@error", {
                      code: 10002
                    });
                    reject(e);
                  });
                  return;
                }

              case 10052:
                {
                  log.debug("10052 auth, retry", isUserAction); // 媒体服务器宕机或者重启

                  this.reconnectToken = undefined;

                  if (isUserAction) {
                    reject(JOIN_ROOM_ERROR$1(msgData.code, msgData.error));
                    break;
                  } else {
                    this.emit("@error", msgData);
                    return;
                  }
                }

              case 10054:
                {
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

      this.onWsMsg = e => {
        // data 格式为 'xxx={ "a": 1, "b": 2 }'
        const data = e.data;
        this.emit("ws:onmessage", data);
        const index = data.indexOf("=");

        if (index > 0) {
          const msgType = data.substring(0, index);
          const payload = JSON.parse(data.substring(index + 1));
          this.receiveWsMsg(msgType, payload);
        } else {
          throw UNEXPECTED_ERROR(`signaling model can not parse message: ${data}`);
        }
      };

      this.onWsError = e => {
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
        } catch (e) {
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
            this.emit("on-pubpc-state", {
              pcid: msgData.pcid,
              connected: msgType === "on-pubpc-connected"
            });
            this.emit(`${msgType}-${msgData.pcid}`, msgData);
            break;

          case "on-subpc-disconnected":
          case "on-subpc-connected":
            this.emit("on-subpc-state", {
              pcid: msgData.pcid,
              connected: msgType === "on-subpc-connected"
            });
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
          case "create-merge-job-res":
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

      if (this.startAuthTime) {
        qos.addEvent("SignalAuth", {
          auth_start_time: this.startAuthTime,
          auth_dns_time: 0,
          auth_server_ip: "",
          auth_error_code: e.code,
          auth_error_message: e.toString(),
          auth_take_time: Date.now() - this.startAuthTime,
          access_token: this.accessToken
        });
      }

      let reconnectPromise = this.reconnectPromise; // See http://tools.ietf.org/html/rfc6455#section-7.4.1

      switch (e.code) {
        case 1000:
          {
            // Normal closure, meaning that the purpose for which the connection was established has been fulfilled.
            this.emit("@closed");
            break;
          }

        case 1001:
          {
            // An endpoint is "going away", such as a server going down or a browser having navigated away from a page.
            reconnectPromise = this.reconnect();
            break;
          }

        case 1005:
          {
            // No status code was actually present.
            reconnectPromise = this.reconnect();
            break;
          }

        case 1006:
          {
            // The connection was closed abnormally, e.g., without sending or receiving a Close control frame
            reconnectPromise = this.reconnect();
            break;
          }

        case 1007:
          {
            // An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [http://tools.ietf.org/html/rfc3629] data within a text message).
            break;
          }

        case 1008:
          {
            // An endpoint is terminating the connection because it has received a message that "violates its policy". This reason is given either if there is no other sutible reason, or if there is a need to hide specific details about the policy.
            break;
          }

        case 1009:
          {
            // An endpoint is terminating the connection because it has received a message that is too big for it to process.
            break;
          }

        case 1010:
          {
            // Note that this status code is not used by the server, because it can fail the WebSocket handshake instead.
            // An endpoint (client) is terminating the connection because it has expected the server to negotiate one or more extension, but the server didn't return them in the response message of the WebSocket handshake.
            // Specifically, the extensions that are needed are: " + e.reason
            break;
          }

        case 1011:
          {
            // A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.
            reconnectPromise = this.reconnect();
            break;
          }
        // https://www.ietf.org/mail-archive/web/hybi/current/msg09670.html

        case 1012:
          {
            // the service is restarted. a client may reconnect,
            // and if it choses to do, should reconnect using a randomized delay of 5 - 30s.
            reconnectPromise = this.reconnect(5000);
            break;
          }

        case 1013:
          {
            // The server is terminating the connection due to a temporary condition,
            // e.g. it is overloaded and is casting off some of its clients.
            reconnectPromise = this.reconnect();
            break;
          }

        case 1014:
          {
            // The server was acting as a gateway or proxy and received an invalid response from the upstream server.
            // This is similar to 502 HTTP Status Code.
            reconnectPromise = this.reconnect(5000);
            break;
          }

        case 1015:
          {
            // The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified).
            break;
          }

        default:
          {
            // Others
            break;
          }
      }

      if (resolve && reject) {
        if (reconnectPromise) {
          resolve(reconnectPromise);
        } else {
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
      } catch (error) {// abort error
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
      this.reconnectPromise = timeout(time).then(() => {
        return this.initWs();
      }).then(res => {
        this.reconnectPromise = undefined;
        return res;
      }).catch(e => {
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
        const onres = data => {
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
  class MergerSessionController {}
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
        } else {
          this.videoTrackInfo.push(track);
        }
      });
      this.controller.addMergeTrack(this.audioTrackInfo.map(t => ({
        trackId: t.trackId
      })), this.jobId);
      this.initLayout();

      this.controller.onAddTracks = tracks => {
        const audioTracks = tracks.filter(t => t.kind === "audio");
        const videoTracks = tracks.filter(t => t.kind === "video");
        this.controller.addMergeTrack(audioTracks.map(t => ({
          trackId: t.trackId
        })), this.jobId);
        videoTracks.forEach(this.handleAddVideoTrack.bind(this));
      };

      this.controller.onRemoveTracks = tracks => {
        const videoTracks = tracks.filter(t => t.kind === "video");
        videoTracks.forEach(this.handleRemoveVideoTrack.bind(this));
      };

      log.log("init default merger, init layout: ", this.layout);
    }

    initLayout() {
      const streamCount = this.videoTrackInfo.length;
      this.layoutLevel = 0;
      this.layout = {
        "level-0": {
          items: {
            "item-0": {
              x: 0,
              y: 0,
              isExpand: false,
              isExpanded: false,
              index: 0
            }
          },
          itemWidth: this.width,
          itemHeight: this.height,
          maxItems: 1,
          currentItems: 0,
          splitWidthFlag: this.width < this.height
        }
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
            "item-0": {
              x: 0,
              y: 0,
              isExpand: false,
              isExpanded: false,
              index: 0
            },
            "item-1": {
              x: this.width >= this.height ? itemWidth : 0,
              y: this.width < this.height ? itemHeight : 0,
              isExpand: false,
              isExpanded: false,
              index: 1
            }
          },
          maxItems,
          currentItems: 0,
          itemWidth,
          itemHeight,
          splitWidthFlag
        };
      } else {
        this.layout[`level-${this.layoutLevel}`] = {
          items: {},
          maxItems,
          currentItems: 0,
          itemWidth,
          itemHeight,
          splitWidthFlag
        };
        const levelItems = this.layout[`level-${this.layoutLevel}`].items;
        Object.keys(this.layout[`level-${this.layoutLevel - 1}`].items).forEach(itemIndex => {
          const item = this.layout[`level-${this.layoutLevel - 1}`].items[itemIndex];
          const newIndex = 2 * item.index;
          levelItems[`item-${newIndex}`] = {
            x: item.x,
            y: item.y,
            isExpand: false,
            isExpanded: false,
            index: newIndex
          };

          if (splitWidthFlag) {
            levelItems[`item-${newIndex + 1}`] = {
              x: item.x + itemWidth,
              y: item.y,
              isExpand: false,
              isExpanded: false,
              index: newIndex + 1
            };
          } else {
            levelItems[`item-${newIndex + 1}`] = {
              x: item.x,
              y: item.y + itemHeight,
              isExpand: false,
              isExpanded: false,
              index: newIndex + 1
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
          } else {
            currentLevelLayout.items[`item-${i}`].isExpanded = true;
            expandCount -= 1;
          }
        } else {
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
        } else {
          height = height * 2;
        }
      }

      const option = {
        x: item.x,
        y: item.y,
        w: width,
        h: height,
        z: 0,
        trackId: item.trackId
      };
      this.controller.addMergeTrack([option], this.jobId);
    }

    handleRemoveVideoTrack(track) {
      lodash_remove(this.videoTrackInfo, t => t.trackId === track.trackId);
      const levelLayout = this.layout[`level-${this.layoutLevel}`];

      if (this.layoutLevel > 0 && this.videoTrackInfo.length <= this.layout[`level-${this.layoutLevel - 1}`].maxItems) {
        this.layoutLevel -= 1;
        log.log(`merger: reduce layout level, current level: ${this.layoutLevel}`, this.layout);
        this.setLevelLayoutStream();
      } else {
        for (const itemKey in levelLayout.items) {
          const item = levelLayout.items[itemKey];

          if (item.trackId === track.trackId) {
            if (item.index % 2 === 0) {
              if (levelLayout.items[`item-${item.index + 1}`]) {
                item.isExpand = true;
                item.trackId = levelLayout.items[`item-${item.index + 1}`].trackId;
                levelLayout.items[`item-${item.index + 1}`].isExpanded = true;
                levelLayout.items[`item-${item.index + 1}`].trackId = undefined;
              } else {
                item.trackId = undefined;
              }

              this.sendMergeOpt(this.layoutLevel, item.index);
            } else {
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
      this.videoTrackInfo = lodash_uniqby(this.videoTrackInfo, "trackId"); // 如果重复添加了 trackId 就忽略

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
      } else {
        // 需要提升 level
        this.updateLayoutLevel(!levelLayout.splitWidthFlag);
        this.setLevelLayoutStream();
      }
    }

    release() {
      this.controller.release();
    }

  }

  class Consumer {
    constructor(id, mid, kind, rtpParameters) {
      this.id = id;
      this.mid = mid; // this._closed = false;

      this.kind = kind;
      this.rtpParameters = rtpParameters; // this._peer = peer;
      // this._supported = false;

      this.track = null;
    }

  }

  class PCTrack {
    constructor(transport, direction, track, trackId, mid) {
      this._connectStatus = exports.TrackConnectStatus.Idle;
      this.track = track;
      this.trackId = trackId;
      this.mid = mid;
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
      this.consumer = new Consumer(this.trackId, this.mid, kind, rtpparms);
      this.transport.appendConsumer(this.consumer);
    }

    setMute(muted) {
      if (!this.track) return;
      this.track.setMute(muted);
    }

    addTrackId(trackid) {
      if (!this.track) return;
      this.trackId = trackid;
      this.track.setInfo({
        trackId: trackid
      });
    }

    release() {
      if (this.consumer && this.transport) {
        // 如果释放这个 Track 时发现 pc 已经断开，就跳过
        if (this.transport.recvHandler.isPcReady) {
          this.transport.removeConsumers([this.consumer]);
        } // 只有订阅的 Track 才会自动释放


        if (this.track) {
          this.track.release();
        }
      } else {
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
      this.isPcReady = false; // last qos media statistic list

      this.lastCalculationStatsList = []; // qos media statistic report interval

      this.intervalId = -1;
      this._direction = direction; // RTCPeerConnection instance.

      this._pc = createPC(); // Generic sending RTP parameters for audio and video.

      this._extendedRtpCapabilities = extendedRtpCapabilities;
      this._remoteSdp = new RemoteSdp(direction, extendedRtpCapabilities); // Handle RTCPeerConnection connection status.

      this._pc.addEventListener("iceconnectionstatechange", () => {
        switch (this._pc.iceConnectionState) {
          case "checking":
            this.emit("@connectionstatechange", "connecting");
            break;

          case "connected":
          case "completed":
            this.emit("@connectionstatechange", "connected");
            this.registerMediaStatisticStatsReport();
            break;

          case "failed":
            this.emit("@connectionstatechange", "failed");
            this.unregisterMediaStatisticStatsReport();
            break;

          case "disconnected":
            this.emit("@connectionstatechange", "disconnected");
            this.unregisterMediaStatisticStatsReport();
            break;

          case "closed":
            this.emit("@connectionstatechange", "closed");
            this.unregisterMediaStatisticStatsReport();
            break;
        }
      });
    }

    async getStats(track, lastReport) {
      return await getPCStats(this._pc, track, this._direction, lastReport);
    }

    registerMediaStatisticStatsReport() {
      this.unregisterMediaStatisticStatsReport();
      this.intervalId = window.setInterval(async () => {
        const mediaStatistics = await getMediaStatisticStats(this._pc);

        if (mediaStatistics && mediaStatistics.length > 0) {
          qos.addMediaStatistics(mediaStatistics, this.lastCalculationStatsList);
          this.lastCalculationStatsList = (mediaStatistics || []).map(statistic => objectSpread({}, statistic.calculation_stats));
        }
      }, 1000);
    }

    unregisterMediaStatisticStatsReport() {
      if (this.intervalId !== -1) {
        window.clearInterval(this.intervalId);
        this.lastCalculationStatsList = [];
        this.intervalId = -1;
      }
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
      log.log("init send handler"); // Got transport local and remote parameters.

      this._transportReady = false; // Local stream.

      this._stream = new MediaStream();
      this._signaling = signaling;
      signaling.on("on-pubpc-state", res => {
        if (this._remoteSdp.transportRemoteParameters && res.pcid === this._remoteSdp.transportRemoteParameters.pcid) {
          if (!res.connected) {
            this.emit("@connectionstatechange", "remote-disconnected");
          }
        }
      });
    }

    getReady(transportRemoteParameters) {
      return new Promise((resolve, reject) => {
        const callback = res => {
          if (res.pcid === transportRemoteParameters.pcid) {
            this._signaling.off("on-pubpc-state", callback);

            if (res.connected) {
              this.isPcReady = true;
              resolve();
            } else {
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
      const tracks = producerTracks.map(v => v.mediaTrack).filter(track => !this._stream.getTrackById(track.id));

      if (tracks.length === 0) {
        return Promise.reject(new Error("track already added"));
      }

      let rtpSenders;
      const transceivers = [];
      let localSdp;
      let shouldSendPubTracks = true;
      return Promise.resolve().then(async () => {
        tracks.forEach(this._stream.addTrack, this._stream);

        if (browserReport.unifiedPlan && browserReport.supportTransceivers) {
          for (const track of tracks) {
            const transceiver = await addTransceiver(track, this._pc);
            log.debug("add transceiver", transceiver, transceiver.mid);
            transceivers.push(transceiver);
          }
        } else {
          log.debug("add tracks", tracks);
          rtpSenders = tracks.map(track => this._pc.addTrack(track, this._stream));
        }

        return this._pc.createOffer();
      }).then(offer => {
        let _offer;

        if (browserReport.unifiedPlan) {
          _offer = {
            type: "offer",
            sdp: offer.sdp
          };
        } else {
          if (browserReport.needH264FmtpLine) {
            offer.sdp += `a=fmtp:107 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f${NEW_LINE}`;
          }

          _offer = offer;
        }

        localSdp = _offer.sdp;
        log.log("publish: set local offer", _offer);
        return this._pc.setLocalDescription(_offer);
      }).then(() => {
        for (const transceiver of transceivers) {
          if (!transceiver.sender.track) continue;
          const targetProducerTrack = producerTracks.find(t => t.mediaTrack === transceiver.sender.track);

          if (!targetProducerTrack || !transceiver.mid) {
            throw UNEXPECTED_ERROR("can not get transceiver mid!");
          }

          targetProducerTrack.setInfo({
            mid: transceiver.mid
          });
        }

        if (!this._transportReady) {
          shouldSendPubTracks = false;
          return this._setupTransport(producerTracks);
        }
      }).then(() => {
        // localSdpObj = sdpTransform.parse((this._pc.localDescription as RTCSessionDescription).sdp);
        // genPubAnswer
        return this._remoteSdp.createRemoteAnswer(localSdp);
      }).then(remoteSdp => {
        const answer = {
          type: "answer",
          sdp: remoteSdp
        };
        log.debug("addProducer answer", answer); // logger.debug(
        //   'addProducer() | calling pc.setRemoteDescription() [answer:%o]',
        //   answer);

        return this._pc.setRemoteDescription(answer);
      }).then(() => this._pcReady).then(() => {
        if (shouldSendPubTracks) {
          return this.safeEmitAsPromise("@needpubtracks", producerTracks, localSdp);
        } else {
          return Promise.resolve(this._remoteSdp.transportRemoteParameters);
        }
      }).catch(error => {
        // Panic here. Try to undo things.
        log.log("add producer error", error);

        try {
          for (const rtpSender of rtpSenders) {
            this._pc.removeTrack(rtpSender);
          }

          for (const transceiver of transceivers) {
            transceiver.direction = "inactive";
          }
        } catch (error2) {}

        for (const track of tracks) {
          this._stream.removeTrack(track);
        }

        if (error instanceof QNRTCError) {
          throw error;
        } else {
          throw UNEXPECTED_ERROR(error);
        }
      });
    }

    removeProducerTracks(producerTracks) {
      log.debug("removeProducerTracks", producerTracks);
      const tracks = producerTracks.filter(v => !!v.track).map(v => v.track.mediaTrack).filter(track => this._stream.getTrackById(track.id));
      let localSdp;
      return Promise.resolve().then(() => {
        // Get the associated RTCRtpSender.
        const rtpSenders = this._pc.getSenders().filter(s => s.track && tracks.includes(s.track));

        if (rtpSenders.length === 0) {
          log.warning("removeProducerTracks [nothing to remove]");
          return Promise.reject("removeProducerTracks: nothing to remote");
        } // Remove the associated RtpSender.


        for (const rtpSender of rtpSenders) {
          this._pc.removeTrack(rtpSender);
        } // Remove the track from the local stream.


        for (const track of tracks) {
          this._stream.removeTrack(track);
        }

        return this._pc.createOffer();
      }).then(offer => {
        const description = new RTCSessionDescription(offer);
        localSdp = description.sdp;
        log.log("unpublish: set local offer", description);
        return this._pc.setLocalDescription(description);
      }).then(() => {
        const remoteSdp = this._remoteSdp.createRemoteAnswer(localSdp);

        const answer = {
          type: "answer",
          sdp: remoteSdp
        };
        log.log("unpublish: set remote answer", answer);
        return this._pc.setRemoteDescription(answer);
      }).catch(error => {
        // NOTE: If there are no sending tracks, setLocalDescription() will fail with
        // "Failed to create channels". If so, ignore it.
        if (this._stream.getTracks().length === 0) {
          log.debug("removeProducer() | ignoring expected error due no sending tracks: %s", error.toString());
          return;
        }

        if (error instanceof QNRTCError) {
          throw error;
        } else {
          throw UNEXPECTED_ERROR(error);
        }
      }).then(() => {
        // no need to wait response
        this.safeEmitAsPromise("@needunpubtracks", producerTracks);
      });
    }

    restartICE(iceParameters, iceCandidates) {
      log.log("restart send ice");
      this._isRestartingICE = true;
      return Promise.resolve().then(() => {
        return this._remoteSdp.updateICEData(iceParameters, iceCandidates);
      }).then(() => {
        return this._pc.createOffer({
          iceRestart: true
        });
      }).then(offer => {
        return this._pc.setLocalDescription(offer);
      }).then(() => {
        const remoteSdp = this._remoteSdp.createRemoteAnswer(this._pc.localDescription.sdp);

        const answer = {
          type: "answer",
          sdp: remoteSdp
        };
        return this._pc.setRemoteDescription(answer);
      });
    } // needpubpc


    _setupTransport(tracks) {
      const startTime = Date.now();
      return Promise.resolve().then(() => {
        if (!this._pc.localDescription) {
          return this._pc.createOffer();
        }

        return this._pc.localDescription;
      }).then(localDescription => {
        // We need transport remote parameters.
        return this.safeEmitAsPromise("@needpubpc", localDescription.sdp, tracks);
      }).then(transportRemoteParameters => {
        qos.addEvent("PublisherPC", {
          signal_take_time: Date.now() - startTime,
          result_code: transportRemoteParameters.code,
          up_stream_ip: (transportRemoteParameters.iceCandidates || []).map(({
            ip
          }) => ip).join(","),
          tracks: transportRemoteParameters.tracks.map(t => {
            const targetTrack = tracks.find(track => track.mediaTrack.id === t.localid);
            if (!targetTrack) return undefined;
            return {
              local_id: t.localid,
              track_id: t.trackid,
              source_type: targetTrack.sourceType,
              kind: targetTrack.info.kind,
              tag: targetTrack.info.tag || "",
              muted: !!targetTrack.info.muted,
              master: !!targetTrack.master,
              kbps: targetTrack.info.kbps || -1,
              encode_video_width: 0,
              encode_video_height: 0
            };
          }).filter(t => t !== undefined)
        });
        this.pcid = transportRemoteParameters.pcid;
        this._transportReady = true;
        this._pcReady = this.getReady(transportRemoteParameters); // Provide the remote SDP handler with transport remote parameters.

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
      signaling.on("on-subpc-state", res => {
        if (this._remoteSdp.transportRemoteParameters && res.pcid === this._remoteSdp.transportRemoteParameters.pcid) {
          if (!res.connected) {
            this.emit("@connectionstatechange", "remote-disconnected");
          }
        }
      });
      log.log("init recvhandler", this);
    }

    getReady(transportRemoteParameters) {
      return new Promise((resolve, reject) => {
        const callback = res => {
          if (res.pcid === transportRemoteParameters.pcid) {
            this._signaling.off("on-subpc-state", callback);

            if (res.connected) {
              this.isPcReady = true;
              resolve();
            } else {
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
      if (browserReport.unifiedPlan && isFirefox) {
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
        } else {
          const newInfo = this.genNewConsumerInfo(consumer);

          if (browserReport.unifiedPlan) {
            // 递增 mid, plan-b 模式下不会使用到这个参数
            const mid = consumer.mid;
            newInfo.mid = mid;

            this._consumerInfos.set(mid, newInfo);
          } else {
            this._consumerInfos.set(consumer.id, newInfo);
          }

          consumerInfoList.push(newInfo);
        }
      }

      return Promise.resolve().then(() => {
        // createremoteSdp
        const remoteSdp = this._remoteSdp.createRemoteOffer(Array.from(this._consumerInfos.values()));

        const offer = {
          type: "offer",
          sdp: remoteSdp
        };
        log.debug("subscribe: set remote offer", offer);
        return this._pc.setRemoteDescription(offer);
      }).then(() => {
        if (browserReport.unifiedPlan) {
          return this._pc.createAnswer();
        }

        return this._pc.createAnswer();
      }).then(answer => {
        log.debug("subscribe, set local answer", answer);
        return this._pc.setLocalDescription(answer);
      }) // .then(() => {
      //   if (!this._transportUpdated) { return this._updateTransport(); }
      // })
      .then(() => this._pcReady).then(() => {
        for (let i = 0; i < consumerInfoList.length; i += 1) {
          const consumerInfo = consumerInfoList[i];
          const consumer = consumers[i];
          if (consumer.track) continue;

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
          } else {
            // chrome 55 以下不支持 getReceivers，使用 getRemoteStreams
            if (browserReport.getReceivers) {
              const receiver = this._pc.getReceivers().find(rtpReceiver => {
                const {
                  track
                } = rtpReceiver;

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
            } else {
              const stream = this._pc.getRemoteStreams().find(s => s.id === consumerInfo.streamId);

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
      const encoding = consumer.rtpParameters.encodings[0];
      const cname = consumer.rtpParameters.rtcp.cname;
      const mid = consumer.mid;
      const newInfo = {
        kind: consumer.kind,
        streamId: browserReport.unifiedPlan ? `recv-stream-${mid}` : `recv-stream-${encoding.ssrc}`,
        trackId: browserReport.unifiedPlan ? `consumer-${consumer.kind}-${mid}` : `consumer-${consumer.kind}-${encoding.ssrc}`,
        ssrc: encoding.ssrc,
        rtxSsrc: encoding.rtx ? encoding.rtx.ssrc : undefined,
        cname: cname,
        consumerId: consumer.id,
        closed: false
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
      } else {
        const newInfo = this.genNewConsumerInfo(consumer);

        if (browserReport.unifiedPlan) {
          // plan-b 模式下不会使用到这个参数
          const mid = consumer.mid;
          newInfo.mid = mid;

          this._consumerInfos.set(mid, newInfo);
        } else {
          this._consumerInfos.set(consumer.id, newInfo);
        }

        consumerInfo = newInfo;
      }

      return Promise.resolve().then(() => {
        // createremoteSdp
        const remoteSdp = this._remoteSdp.createRemoteOffer(Array.from(this._consumerInfos.values()));

        const offer = {
          type: "offer",
          sdp: remoteSdp
        };
        log.log("set ontrack");

        this._pc.ontrack = e => {
          log.log("ontrack", e.receiver.track);
        };

        log.debug("subscribe: set remote offer", offer);
        return this._pc.setRemoteDescription(offer);
      }).then(() => {
        return this._pc.createAnswer();
      }).then(answer => {
        log.debug("subscribe, set local answer", answer);
        return this._pc.setLocalDescription(answer);
      }) // .then(() => {
      //   if (!this._transportUpdated) { return this._updateTransport(); }
      // })
      .then(() => this._pcReady).then(() => {
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
        } else if (!!consumer && !!consumerInfo) {
          const receiver = this._pc.getReceivers().find(rtpReceiver => {
            const {
              track
            } = rtpReceiver;

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

        log.log("subscribe: get new track", newTrack, newTrack.readyState);
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
        } else {
          this._consumerInfos.delete(consumer.id);
        }
      }

      if (!needToUpdateOffer) return Promise.resolve();
      return Promise.resolve().then(() => {
        const remoteSdp = this._remoteSdp.createRemoteOffer(Array.from(this._consumerInfos.values()));

        const offer = {
          type: "offer",
          sdp: remoteSdp
        };
        log.log("unsubscribe set remote offer", offer);
        return this._pc.setRemoteDescription(offer);
      }).then(() => {
        return this._pc.createAnswer();
      }).then(answer => {
        log.log("unsubscribe set local answer", answer);
        return this._pc.setLocalDescription(answer);
      });
    }

    restartICE(iceParameters, iceCandidates) {
      log.log("recv restart ice");
      this._isRestartingICE = true;
      return Promise.resolve().then(() => {
        return this._remoteSdp.updateICEData(iceParameters, iceCandidates);
      }).then(() => {
        const remoteSdp = this._remoteSdp.createRemoteOffer(Array.from(this._consumerInfos.values()));

        const offer = {
          type: "offer",
          sdp: remoteSdp
        };
        return this._pc.setRemoteDescription(offer);
      }).then(() => {
        return this._pc.createAnswer();
      }).then(answer => {
        this._pc.setLocalDescription(answer);
      });
    }

    async setupTransport(trackIds) {
      if (this._transportCreated) return await this._pcReady;
      const startTime = Date.now();
      const transportRemoteParameters = await this.safeEmitAsPromise("@needsubpc", trackIds);
      qos.addEvent("SubscriberPC", {
        signal_take_time: Date.now() - startTime,
        result_code: transportRemoteParameters.code,
        down_stream_ip: (transportRemoteParameters.iceCandidates || []).map(({
          ip
        }) => ip).join(","),
        tracks: transportRemoteParameters.tracks.map(t => ({
          track_id: t.trackid,
          status: t.status
        }))
      });
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

      case "recv":
        {
          return new RecvHandler(extendedRtpCapabilities, signaling, settings);
        }
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
      if (!this.initSubPcPromiseResolve) return;
      this.initSubPcPromiseResolve();
      this.initSubPcPromiseResolve = undefined;
    }

    handleSendHandler() {
      this.sendHandler.on("@needpubpc", (sdp, tracks, cb, errcb) => {
        this.safeEmitAsPromise("@needpubpc", sdp, tracks).then(cb).catch(errcb);
      }).on("@connectionstatechange", state => {
        log.log("pubpc connectionstatechange", state);
        qos.addEvent("ICEConnectionState", {
          pc_type: 0,
          state: state,
          id: this.sendHandler.pcid
        });

        switch (state) {
          case "remote-disconnected":
          case "closed":
          case "failed":
            {
              if (this.signaling.state === SignalingState.OPEN) {
                this.reconnectProducer();
              } else {
                this.sendHandler.close();
              }

              break;
            }

          case "disconnected":
            {
              if (this.sendHandler._isRestartingICE || !this.sendHandler.pcid) return;

              if (this.signaling.state === SignalingState.OPEN) {
                this.restartSendICE(this.sendHandler.pcid);
              } else {
                this.signaling.once("@signalingauth", data => {
                  if (this.sendHandler.getCurrentIceConnectionState() !== "disconnected") return;
                  this.extendedRtpCapabilities = data.rtpcaps;
                  this.restartSendICE(this.sendHandler.pcid);
                });
              }

              break;
            }

          default:
            break;
        }
      }).on("@needpubtracks", (targetTracks, sdp, cb, errcb) => {
        const publishTrackData = targetTracks.map(transferTrackToPublishTrack);
        const startTime = Date.now();
        this.signaling.request("pub-tracks", {
          tracks: publishTrackData,
          sdp
        }).then(data => {
          qos.addEvent("PublishTracks", {
            signal_take_time: Date.now() - startTime,
            result_code: data.code,
            tracks: data.tracks.map(t => {
              const targetTrack = targetTracks.find(track => track.mediaTrack.id === t.localid);
              if (!targetTrack) return undefined;
              return {
                local_id: t.localid,
                track_id: t.trackid,
                source_type: targetTrack.sourceType,
                kind: targetTrack.info.kind,
                tag: targetTrack.info.tag || "",
                muted: !!targetTrack.info.muted,
                master: !!targetTrack.master,
                kbps: targetTrack.info.kbps || -1,
                encode_video_width: 0,
                encode_video_height: 0
              };
            }).filter(t => t !== undefined)
          });

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
      }).on("@needunpubtracks", (targetPCTracks, cb, errcb) => {
        qos.addEvent("UnPublishTracks", {
          tracks: targetPCTracks.map(p => ({
            track_id: p.trackId
          }))
        });
        this.signaling.request("unpub-tracks", {
          tracks: targetPCTracks.map(t => ({
            trackid: t.trackId
          }))
        }).then(data => {
          cb(data);
        });
      });
    }

    async sendTracks(tracks) {
      if (tracks.length === 0) return Promise.resolve();
      return this.sendCommandQueue.push(TaskCommandEnum.SEND_TRACKS, tracks);
    }

    removeTracks(tracks) {
      if (tracks.length === 0) return Promise.resolve();
      return this.sendCommandQueue.push(TaskCommandEnum.REMOVE_TRACKS, tracks);
    }

    async restartSendICE(pcid) {
      if (!browserReport.supportRestartICE) return Promise.resolve(this.reconnectProducer());
      return this.sendCommandQueue.push(TaskCommandEnum.RESTART_SEND_ICE, pcid);
    }

    handleSendCommandTask(command, ph) {
      switch (command.method) {
        case TaskCommandEnum.SEND_TRACKS:
          {
            ph.promise = this._execAddProducerTracks(command.data);
            return;
          }

        case TaskCommandEnum.REMOVE_TRACKS:
          {
            ph.promise = this._execRemoveTracks(command.data);
            return;
          }

        case TaskCommandEnum.RESTART_SEND_ICE:
          {
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
          pcTrack.track.setInfo({
            versionid: trackData.versionid
          });
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
      const res = await this.signaling.request("pubpc-restart", {
        pcid
      });

      if (res.code !== 0) {
        this.sendHandler._isRestartingICE = false;
        log.debug("restart ice faild", res.code, res.error);
        this.reconnectProducer();
        return;
      }

      try {
        await this.sendHandler.restartICE(res.iceParameters, res.iceCandidates);
        this.sendHandler._isRestartingICE = false;
      } catch (e) {
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
      }).on("@connectionstatechange", state => {
        log.log("sub pc connection state change", state);
        qos.addEvent("ICEConnectionState", {
          pc_type: 1,
          state: state,
          id: this.recvHandler.pcid
        });

        switch (state) {
          case "remote-disconnected":
          case "closed":
          case "failed":
            {
              if (this.signaling.state === SignalingState.OPEN) {
                this.resetRecvHandler();
              } else {
                // 置为 close，等待信令重连完成后统一重新创建
                this.recvHandler.close();
              }

              break;
            }

          case "disconnected":
            {
              if (this.recvHandler._isRestartingICE || !this.recvHandler.pcid) return;

              if (this.signaling.state === SignalingState.OPEN) {
                this.restartRecvICE(this.recvHandler.pcid);
              } else {
                this.signaling.once("@signalingauth", data => {
                  if (this.recvHandler.getCurrentIceConnectionState() !== "disconnected") return;
                  this.extendedRtpCapabilities = data.rtpcaps;
                  this.restartRecvICE(this.recvHandler.pcid);
                });
              }

              break;
            }

          default:
            {
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
      if (!browserReport.supportRestartICE) return this.resetRecvHandler();
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
      const res = await this.signaling.request("subpc-restart", {
        pcid
      });

      if (res.code !== 0) {
        this.recvHandler._isRestartingICE = false;
        log.debug("restart ice faild", res.code, res.error);
        this.resetRecvHandler();
        return;
      }

      try {
        await this.recvHandler.restartICE(res.iceParameters, res.iceCandidates);
        this.recvHandler._isRestartingICE = false;
      } catch (e) {
        this.recvHandler._isRestartingICE = false;
        log.debug("restart ice faild", res.code, res.error);
        this.resetRecvHandler();
      }
    }

    handleRecvCommandTask(command, ph) {
      switch (command.method) {
        case TaskCommandEnum.ADD_CONUMERS:
          {
            ph.promise = this._addConsumers(command.data);
            return;
          }

        case TaskCommandEnum.REMOVE_CONSUMERS:
          {
            ph.promise = this._removeConsumers(command.data);
            return;
          }

        case TaskCommandEnum.RESTART_RECV_ICE:
          {
            ph.promise = this._execRestartRecvICE(command.data);
            return;
          }
      }
    }

    handleRecvInitCommandTask(command, ph) {
      switch (command.method) {
        case TaskCommandEnum.INIT_RECV:
          {
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
      this.resetRecvCommandQueue(); // 重置 RecvHandler 时外层 track 需要做一些操作

      this.emit("@needresetrecv");
      this.recvHandler.close();
      this.recvHandler = getHandler("recv", this.extendedRtpCapabilities, this.signaling, {});
      this.initSubPcPromise = new Promise(resolve => {
        this.initSubPcPromiseResolve = resolve;
      });
      this.handleRecvHandler(); // 重连Consumer需要对比服务端的变化，抛出事件

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
    transportPolicy: "forceUdp"
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

      this.subscribeTracks = []; // userid -> User

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
        } else {
          const currentLocalIds = transport.publishTracks.map(t => t.track.mediaTrack.id);
          const targetTracks = tracks.filter(t => currentLocalIds.indexOf(t.mediaTrack.id) === -1); // 这里表示传入的 track 包含已经发布过的 track，直接抛出错误，简化逻辑

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
            tracks: pcTracks.map(track => ({
              trackid: track.trackId,
              muted: !!track.track.info.muted
            }))
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
              versionid: t.track.info.versionid
            })));
          }

          tracks.forEach(t => {
            t.on("@get-stats", (lastReport, cb, errorcb) => {
              if (!this.connectionTransport) return cb(defaultTrackStatsReport());
              this.connectionTransport.sendHandler.getStats(t.mediaTrack, lastReport).then(cb, errorcb);
            });
          });
          this.getAllMerger().forEach(m => m.controller.onAddTracks(tracks.map(t => t.info)));
        } catch (e) {
          if (e instanceof QNRTCError) {
            switch (e.code) {
              case 10061:
              case 30001:
                {
                  return;
                }

              case 10052:
                {
                  log.warning(e, "republish");
                  setTimeout(() => this._publish(tracks, true), 1000);
                  return;
                }

              default:
                {
                  transport.removeTrackFromPublishTracks(tracks);
                  reject(e);
                }
            }
          } else {
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
        } else {
          const currentTrackIds = this.subscribeTracks.map(t => t.trackId);
          const targetTrackInfo = availableTrackInfo.filter(t => !currentTrackIds.includes(t.trackid));
          pcTracks = targetTrackInfo.map(t => new PCTrack(transport, "recv", undefined, t.trackid, t.mid));
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
            const startTime = Date.now();
            data = await signaling.request("sub-tracks", {
              tracks: pcTracks.map(track => ({
                trackid: track.trackId
              }))
            });
            qos.addEvent("SubscribeTracks", {
              result_code: data.code,
              signal_take_time: Date.now() - startTime,
              tracks: data.tracks.map(t => ({
                track_id: t.trackid,
                status: t.status
              }))
            });
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

          const successTracks = data.tracks.filter(t => !!t.status);
          const faildTrackIds = data.tracks.filter(t => !t.status).map(t => t.trackid); // 在严格模式下，直接抛出错误，取消之后的订阅流程

          if (successTracks.length < data.tracks.length && strictMode) {
            throw SUB_ERROR(10041, `can not find target track id: ${faildTrackIds.join(" ")}`);
          }

          if (successTracks && !strictMode) {
            log.debug(`can not find target track id: ${faildTrackIds.join("")}, continue`);
            const removedPcTracks = lodash_remove(pcTracks, t => faildTrackIds.indexOf(t.trackId) !== -1);
            lodash_remove(this.subscribeTracks, t => faildTrackIds.indexOf(t.trackId) !== -1);
            removedPcTracks.map(t => t.release());
          }

          data.tracks = successTracks; // 先检查后设置

          for (const track of data.tracks || []) {
            const pcTrack = pcTracks.find(t => t.trackId === track.trackid);
            const info = availableTrackInfo.find(t => t.trackid === track.trackid);
            if (!pcTrack || !info) continue;
            const rtpparams = track.rtpparams;
            pcTrack.appendConsumner(rtpparams, info.kind);
          }

          await transport.addConsumers();
          transport.resolveInitSubPcPromise();

          for (const pcTrack of pcTracks) {
            const {
              consumer
            } = pcTrack;
            if (!consumer || !consumer.track) continue;
            const t = consumer.track;
            let track = pcTrack.track;
            const info = availableTrackInfo.find(t => t.trackid === consumer.id);
            if (!info) continue;

            if (!track) {
              if (t.kind === "audio") {
                track = new AudioTrack(t, info.playerid, "remote");
                track.initAudioManager();
              } else {
                track = new Track(t, info.playerid, "remote");
              }
            } else {
              track.resume(t);
            }

            track.setInfo({
              trackId: info.trackid,
              userId: info.playerid,
              tag: info.tag,
              kind: info.kind,
              muted: info.muted,
              versionid: info.versionid
            });
            track.setMaster(info.master);
            track.removeAllListeners("@get-stats");
            track.removeAllListeners("@ended");
            track.on("@get-stats", (lastReport, cb, errcb) => {
              if (!this.connectionTransport) return cb(defaultTrackStatsReport());
              this.connectionTransport.recvHandler.getStats(track.mediaTrack, lastReport).then(cb, errcb);
            }); // 如果远端 track ended，重新订阅

            track.once("@ended", async () => {
              if (!track || !track.info.trackId) return;
              log.warning("remote track ended, try to resubscribe");

              try {
                await this._unsubscribe([track.info.trackId], true);
              } catch (e) {}

              await this._subscribe([track.info.trackId], true);
            });
            pcTrack.track = track;
            const user = this.users.find(u => u.userId === info.playerid);

            if (user) {
              user.addTracks([track]);
            }
          }

          pcTracks.forEach(t => t.connectStatus = exports.TrackConnectStatus.Connect); // sub 数据中，缺少 muted 属性，此时手动通过 trackid 使用 this._trackInfo 赋值，
          // 防止在 handleMute 中将 muted 属性设置为了 undefined

          let tracks = data.tracks.map(subTrack => {
            if (subTrack.muted === undefined) {
              for (let i = 0; i < this._trackInfo.length; i++) {
                if (subTrack.trackid === this._trackInfo[i].trackid) {
                  subTrack.muted = this._trackInfo[i].muted;
                }
              }
            }

            return subTrack;
          });
          this.handleMute({
            tracks: tracks
          });
        } catch (e) {
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
              case 30001:
                {
                  return;
                }

              case 10052:
                {
                  log.warning(e, "resubscribe");
                  setTimeout(() => this._subscribe(trackIds, true), 1000);
                  return;
                }

              default:
                {
                  lodash_remove(this.subscribeTracks, t => trackIds.indexOf(t.trackId) !== -1);
                  reject(e);
                }
            }
          } else {
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
        qos.addEvent("RoomStateChanged", {
          room_state: state
        });
      }
    }

    async joinRoomWithToken(roomToken, userData) {
      if (this.roomState !== exports.RoomState.Reconnecting) {
        if (this.roomState !== exports.RoomState.Idle) {
          throw UNEXPECTED_ERROR("roomState is not idle! Do not repeat join room, please run leaveRoom first");
        }

        this.roomState = exports.RoomState.Connecting;
      }

      qos.addEvent("JoinRoom", {
        room_token: roomToken,
        user_data: userData
      });

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
          const authRes = await getAccessToken(roomAccess, roomToken);
          this.accessToken = authRes.accessToken;
          qos.setSessionId(authRes.sessionId);
          qos.setUserBase(this.userId, this.roomName, this.appId);
        } catch (e) {
          throw e;
        }

        return await this.joinRoomWithAccess(this.accessToken);
      } catch (e) {
        this.roomState = exports.RoomState.Idle;
        throw e;
      }
    }

    async joinRoomWithAccess(accessToken) {
      const accessPayload = getPayloadFromJwt(accessToken);
      const {
        capsdp
      } = await getClientCapabilitiesSdp();

      if (this._roomState === exports.RoomState.Idle) {
        throw UNEXPECTED_ERROR("roomState is idle, maybe because you left the room.");
      }

      const signaling = new SignalingWS(accessPayload.signalingurl2, accessToken, capsdp, this.userData);
      signaling.on("@error", this.handleDisconnect.bind(this)).on("@ws-state-change", (prev, curr) => {
        switch (curr) {
          case SignalingState.CONNECTING:
            if (this.roomState === exports.RoomState.Connected) {
              this.roomState = exports.RoomState.Reconnecting;
            } else if (this.roomState !== exports.RoomState.Reconnecting) {
              this.roomState = exports.RoomState.Connecting;
            }

            break;

          default:
            break;
        }
      }).on("@needupdateaccesstoken", (cb, errcb) => {
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
      .on("on-player-in", this.handlePlayerIn.bind(this)).on("on-player-out", this.handlePlayerOut.bind(this)).on("on-add-tracks", d => {
        this.filterSignalTracks(d);
        this.handleAddTracks(d);
      }).on("on-remove-tracks", d => {
        this.filterSignalTracks(d);
        this.handleRemoveTracks(d);
      }).on("mute-tracks", d => {
        this.filterSignalTracks(d);
        this.handleMute(d);
      }).on("on-messages", this.handleCustomMessages.bind(this)).on("on-pubpc-restart-notify", d => {
        const transport = this.connectionTransport;
        qos.addEvent("AbnormalDisconnect", {
          event_reason: "on-pubpc-restart-notify",
          event_description: d.error
        });
        if (!transport || !browserReport.supportRestartICE) return;
        transport.restartSendICE(d.pcid).catch(log.debug);
      }).on("on-subpc-restart-notify", d => {
        const transport = this.connectionTransport;
        qos.addEvent("AbnormalDisconnect", {
          event_reason: "on-subpc-restart-notify",
          event_description: d.error
        });
        if (!transport || !browserReport.supportRestartICE) return;
        transport.restartRecvICE(d.pcid).catch(log.debug);
      }).on("disconnect", this.handleDisconnect.bind(this));
      log.log("init signaling websocket");
      this.signaling = signaling;

      try {
        const authResData = await signaling.initWs(true);
        signaling.on("@signalingauth", this.handleAuth.bind(this));
        await this.handleAuth(authResData);
      } catch (e) {
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

      if (trackIds.length === 0) return;
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

      const mergeJob = objectSpread({}, defaultMergeJob, option, {
        id
      });

      log.debug("send create merge job", mergeJob, id);
      const startTime = Date.now();
      const data = await this.signaling.request("create-merge-job", mergeJob);
      qos.addEvent("CreateMergeJob", {
        signal_take_time: Date.now() - startTime,
        id: id,
        result_code: data.code
      });

      if (data.code !== 0) {
        throw CREATE_MERGE_JOB_ERROR(data.code, data.error);
      }

      if (this.mergeJobTracks[id]) {
        log.warning("merge job id already exist", id);
      } else {
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
      } else {
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

      qos.addEvent("StopMerge", {
        id: jobId || ""
      });
      this.signaling.sendWsMsg("stop-merge", {
        id: jobId
      });

      if (jobId) {
        delete this.mergeJobTracks[jobId];

        if (this.mergeJobMerger[jobId]) {
          this.mergeJobMerger[jobId].release();
          delete this.mergeJobMerger[jobId];
        }
      } else {
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
        trackid: opt.trackId,
        x: opt.x,
        y: opt.y,
        w: opt.w,
        h: opt.h,
        z: opt.z
      }));
      const config = {
        id: jobId,
        add: addTraget
      };
      log.debug("addMergeTracks", config);

      if (jobId) {
        this.mergeJobTracks[jobId] = this.mergeJobTracks[jobId].concat(mergeOpts.map(t => t.trackId));
        this.mergeJobTracks[jobId] = lodash_uniqby(this.mergeJobTracks[jobId], s => s);
      } else {
        this.defaultMergeJobTracks = this.defaultMergeJobTracks.concat(mergeOpts.map(t => t.trackId));
        this.defaultMergeJobTracks = lodash_uniqby(this.defaultMergeJobTracks, s => s);
      }

      qos.addEvent("UpdateMergeTracks", {
        id: jobId || "",
        add: addTraget.map(t => ({
          track_id: t.trackid,
          x: t.x || 0,
          y: t.y || 0,
          w: t.w || 0,
          h: t.h || 0,
          z: t.z || 0
        }))
      });
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
        remove: trackIds.map(t => ({
          trackid: t
        }))
      };
      log.debug("removeMergeTracks", config);

      if (jobId) {
        lodash_remove(this.mergeJobTracks[jobId], t => trackIds.indexOf(t) !== -1);
      } else {
        lodash_remove(this.defaultMergeJobTracks, t => trackIds.indexOf(t) !== -1);
      }

      qos.addEvent("UpdateMergeTracks", {
        id: jobId || "",
        remove: config.remove.map(t => ({
          track_id: t.trackid
        }))
      });
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

      qos.addEvent("UnSubscribeTracks", {
        tracks: trackIds.map(t => ({
          track_id: t
        }))
      });
      this.signaling.request("unsub-tracks", {
        tracks: targetTracks.map(t => ({
          trackid: t.trackId
        }))
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
      qos.addEvent("MuteTracks", {
        tracks: targetTracks.map(t => ({
          track_id: t.trackId,
          muted: t.track.info.muted,
          kind: t.track.info.kind
        }))
      });
      this.signaling.sendWsMsg("mute-tracks", {
        tracks: tracks.map(t => ({
          trackid: t.trackId,
          muted: t.muted
        }))
      });
    }

    async kickoutUser(userId) {
      log.log("kickoutUser", userId);
      await this.control("kickplayer", userId);
    }
    /**
     * 向房间中指定目标发送自定义消息
     * @param message string 自定义消息内容
     * @param userIds Array<string> 目标用户名列表，如果为空，则在全房间广播
     * @param messageId string 消息ID
     */


    sendCustomMessage(message, userIds, messageId) {
      if (this.roomState !== exports.RoomState.Connected) {
        throw UNEXPECTED_ERROR("room state is not connected, can not send message");
      }

      const msgid = messageId || randomStringGen(8);
      const target = !userIds || userIds.length === 0 ? undefined : userIds;
      this.signaling.sendWsMsg("send-message", {
        msgid: msgid,
        target: target,
        type: "normal",
        text: message
      });
      log.debug("send custom message", message, target, msgid);
    }
    /**
     * leaveRoom 将不会本地的发布流，如果想清除本地的发布流
     * 或者手动调用 Track 对象的 release 方法
     */


    leaveRoom() {
      if (this.roomState === exports.RoomState.Idle) {
        log.log("can not leave room, please join room first");
        return;
      }

      log.log("leave room");
      qos.addEvent("LeaveRoom", {
        leave_reason_code: 0
      });

      if (this.signaling) {
        this.signaling.sendDisconnect();
      }

      this.releaseRoom();
    }

    _releasePublishTracks() {}

    async control(command, userId) {
      if (this.roomState !== exports.RoomState.Connected) {
        throw UNEXPECTED_ERROR("can not connected to the room, please run joinRoom first");
      }

      const startTime = Date.now();
      const data = await this.signaling.request("control", {
        command,
        playerid: userId
      });

      if (command === "kickplayer") {
        qos.addEvent("KickoutUser", {
          signal_take_time: Date.now() - startTime,
          user_id: userId,
          result_code: data.code
        });
      }

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

    handleAddTracks({
      tracks
    }) {
      log.log("receive track-add", tracks, objectSpread({}, this._trackInfo));
      const publishedUsers = new Set();

      for (const track of tracks) {
        const user = getElementFromArray(this.users, "userId", track.playerid);
        if (!user) continue; // 如果在收到这个 master track 之前已经有了 master track
        // 就翻译为 unpublish 后再 publish

        if (user.published && !publishedUsers.has(user.userId) && this.sessionMode === "stream") {
          const publishedTracks = user.publishedTrackInfo.map(t => transferTrackBaseInfoToSignalingTrack(t, true));
          this.handleRemoveTracks({
            tracks: publishedTracks
          });
          publishedTracks.push(track);
          this.handleAddTracks({
            tracks: publishedTracks
          });
        } else {
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

    handleRemoveTracks({
      tracks
    }) {
      log.log("receive track-remove", tracks, objectSpread({}, this._trackInfo));
      const targetTracks = lodash_remove(this._trackInfo, t => tracks.map(t => t.trackid).includes(t.trackid));
      const unpublishedUsers = new Set();

      for (const track of targetTracks) {
        const user = this._users.get(track.playerid);

        if (!user) continue;
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
          const user = this._users.get(userId); // 如果收到 master track remove 后还留有 master track
          // 翻译为先取消发布再重新发布


          if (user.published) {
            const publishedTracks = user.publishedTrackInfo.map(t => transferTrackBaseInfoToSignalingTrack(t, true));
            this.handleRemoveTracks({
              tracks: publishedTracks
            });
            this.handleAddTracks({
              tracks: publishedTracks
            });
          } else {
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

    handleMute({
      tracks
    }) {
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
          muteAudio: false,
          muteVideo: false
        };

        if (trackInfo.kind === "audio") {
          data.muteAudio = muted;
          data.muteVideo = anotherTrackInfo ? anotherTrackInfo.muted : false;
        } else {
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
        log.log("mute-tracks", tracks.map(t => ({
          trackId: t.trackid,
          muted: t.muted
        })));
        this.emit("mute-tracks", tracks.map(t => ({
          trackId: t.trackid,
          muted: t.muted
        })));
      });
    }
    /** @internal */


    handleCustomMessages({
      messages
    }) {
      log.debug("messages-received", messages.map(transferSignalingCustomMessageToCustomMessage));
      this.emit("messages-received", messages.map(transferSignalingCustomMessageToCustomMessage));
    }

    handleDisconnect(data) {
      log.log("handle disconnect", data); // 0, 10005, 10006 是正常的断开 code

      if ([0, 10005, 10006].indexOf(data.code) === -1) {
        qos.addEvent("AbnormalDisconnect", {
          event_reason: "websocket_error",
          event_description: data.error
        });
      }

      qos.addEvent("LeaveRoom", {
        leave_reason_code: data.code
      });

      if (data.code === 10052 && this.roomToken) {
        this.roomState = exports.RoomState.Reconnecting;
        setTimeout(() => this.signaling.initWs(), 1000);
        return;
      }

      this.releaseRoom();

      switch (data.code) {
        case 10006:
          {
            this.emit("disconnect", {
              code: data.code,
              data: {
                userId: data.kickedid
              }
            });
            break;
          }

        default:
          {
            this.emit("disconnect", {
              code: data.code
            });
            break;
          }
      }
    }
    /** 更新 AccessToken  */


    async updateAccessToken() {
      const roomAccess = getRoomAccessFromToken(this.roomToken);
      const authRes = await getAccessToken(roomAccess, this.roomToken);
      qos.setSessionId(authRes.sessionId);
      this.accessToken = authRes.accessToken;

      if (this.signaling) {
        this.signaling.accessToken = this.accessToken;
      } else {
        // 此时 signaling 被释放，已经离开了房间
        throw UNEXPECTED_ERROR("room state is idle");
      }
    }

    async handleAuth(authData) {
      this.filterSignalTracks(authData); // auth 鉴权失败，一般是 token 过期，或者长时间断线导致房间被关闭，
      // 直接重新走加入房间的流程

      log.debug("handleAuth", authData);

      if (authData.error) {
        await this.joinRoomWithToken(this.roomToken, this.userData);
        return;
      }

      authData.tracks = authData.tracks || []; // 只保留除自己以外的 trackInfo，防止补事件出错

      authData.tracks = authData.tracks.filter(t => t.playerid !== this.userId);
      authData.players = authData.players || [];
      const isGetMissingEvent = this.roomState === exports.RoomState.Reconnecting;
      let missingEvents = {
        join: [],
        leave: [],
        add: [],
        remove: [],
        mute: []
      };
      const lastUsers = Array.from(this._users.keys());
      const currentUsers = authData.players.map(player => player.playerid);
      missingEvents = getMissingUserEvent(this.userId, this._trackInfo, authData.tracks, lastUsers, currentUsers); // connected 的唯一标准是收到 error 为 0 的 auth-res

      this.roomState = exports.RoomState.Connected; // 仅在第一次处理的时候设置用户和 TrackInfo, 其余通过补事件来更新

      if (!isGetMissingEvent) {
        this._trackInfo = authData.tracks;

        this._users.clear();

        for (const player of authData.players || []) {
          const user = transferSignalingUserToUser(player);

          const userTracks = this._trackInfo.filter(trackInfo => trackInfo.playerid === user.userId);

          user.addPublishedTrackInfo(userTracks.map(transferSignalingTrackToTrackBaseInfo));

          this._users.set(user.userId, user);
        }
      } else {
        log.debug("get missing events", missingEvents);

        if (missingEvents.remove.length > 0) {
          this.handleRemoveTracks({
            tracks: missingEvents.remove
          });
        }

        if (missingEvents.leave.length > 0) {
          missingEvents.leave.forEach(this.handlePlayerOut.bind(this));
        }

        if (missingEvents.join.length > 0) {
          missingEvents.join.forEach(this.handlePlayerIn.bind(this));
        }

        if (missingEvents.add.length > 0) {
          this.handleAddTracks({
            tracks: missingEvents.add
          });
        }

        if (missingEvents.mute.length > 0) {
          this.handleMute({
            tracks: missingEvents.mute
          });
        }
      }

      if (!this.connectionTransport) {
        this.connectionTransport = this.createConnectionTransport(authData.rtpcaps);
      } else {
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
          sdp,
          tracks: tracks.map(transferTrackToPublishTrack),
          policy: this.config.transportPolicy
        }).then(d => {
          switch (d.code) {
            case 0:
              {
                cb(d);
                return;
              }

            case 10052:
              {
                throw SERVER_UNAVAILABLE();
              }

            default:
              {
                throw PUB_P2P_ERROR(d.error);
              }
          }
        }).catch(errcb);
      });
      transport.on("@needsubpc", (trackIds, cb, errcb) => {
        signaling.request("subpc", {
          tracks: trackIds.map(t => ({
            trackid: t
          })),
          policy: this.config.transportPolicy
        }).then(d => {
          switch (d.code) {
            case 0:
              {
                cb(d);
                return;
              }

            case 10052:
              {
                throw SERVER_UNAVAILABLE();
              }

            default:
              {
                throw SUB_P2P_ERROR(d.error);
              }
          }
        }).catch(errcb);
      }).on("@needresub", () => {
        const allTrackIds = this.subscribeTracks.map(t => t.trackId);
        this.subscribeTracks.forEach(t => t.connectStatus = exports.TrackConnectStatus.Connecting);

        this._subscribe(allTrackIds, true);
      }).on("@needrepub", tracks => {
        this._publish(tracks.map(t => t.track), true);
      }).on("@needresetrecv", () => {
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

      const handleTrackAdd = tracks => {
        controller.onAddTracks(tracks);
      };

      const handleTrackRemove = tracks => {
        controller.onRemoveTracks(tracks);
      };

      this.on("track-add", handleTrackAdd);
      this.on("track-remove", handleTrackRemove);

      controller.getCurrentTracks = () => {
        if (!this.connectionTransport) return [];

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
    } // 退出房间后清空房间状态


    releaseRoom() {
      this.releaseSession();

      if (this.signaling) {
        this.signaling.release();
        this.signaling = undefined;
      }

      qos.addEvent("UnInit", {
        id: `${this.sessionMode}_${Date.now()}`
      }, true);

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
      qos.addEvent("Init", {
        id: `${this.sessionMode}_${Date.now()}`
      });
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
      if (!this.connectionTransport) return;
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
      } else {
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

      const mergeOptions = opt; // 兼容旧版写法

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
        } else if (info.kind === "audio") {
          addTarget.push({
            trackId: info.trackId
          });
        }

        if (info.kind === "video" && hidden) {
          removeTarget.push(info.trackId);
        } else if (info.kind === "video") {
          addTarget.push(objectSpread({}, mergeOptions, {
            trackId: info.trackId
          }));
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
        tracks.push({
          trackId: this.stream._audioTrack.info.trackId,
          muted: muteaudio
        });
      }

      if (this.stream._videoTrack && this.stream._videoTrack.info.muted !== mutevideo) {
        tracks.push({
          trackId: this.stream._videoTrack.info.trackId,
          muted: mutevideo
        });
      }

      this._muteTracks(tracks);
    }
    /**
     * 只关注 master 流
     */


    filterSignalTracks(d) {
      if (!d.tracks) return;
      d.tracks = d.tracks.filter(t => {
        if (t.master !== undefined && t.master !== null) return t.master;

        const track = this._trackInfo.find(info => info.trackid === t.trackid);

        if (!track) return false;
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
      if (!this.connectionTransport) return [];
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
      qos.addEvent("Init", {
        id: `${this.sessionMode}_${Date.now()}`
      });
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

    filterSignalTracks() {}

    releaseSession() {}

  }

  class AudioMixingTrack extends AudioTrack {
    constructor(userId) {
      const destination = audioContext.createMediaStreamDestination();
      const audioTrack = destination.stream.getAudioTracks()[0];
      super(audioTrack, userId, "local");
      this.sourceType = exports.TrackSourceType.MIXING;
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
        track
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
      } else {
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
        volume: 1
      };
      /** @internal */

      this.playback = true;
      this.output = output;
      this.playbackEngine = playbackEngine;
    }
    /** @internal */


    get audioNode() {
      if (!this.musicTrack) return null;
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
      if (!this.musicTrack.audioManager.audioSource) throw UNEXPECTED_ERROR("can not find audio source");

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
      if (!this.musicTrack.audioManager.audioSource) throw UNEXPECTED_ERROR("can not find audio source");
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
      } else {
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
      if (this.musicManager.playback === state) return;
      this.musicManager.playback = state;
      if (!this.musicManager.audioNode) return;

      if (state) {
        this.playbackEngine.addAudioNode(this.musicManager.audioNode);
      } else {
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
      if (this.sourcePlayebackState === state) return;
      this.sourcePlayebackState = state;
      if (!this.source.audioManager.audioSource) return;

      if (state) {
        this.playbackEngine.addAudioNode(this.source.audioManager.gainNode);
      } else {
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
      if (this.effectManager.playback === state) return;
      this.effectManager.playback = state;
      this.effectManager.effectSourceMap.forEach((v, k) => {
        if (!v.audioManager.audioSource) return;

        if (state) {
          this.playbackEngine.addAudioNode(v.audioManager.gainNode);
        } else {
          this.playbackEngine.removeAudioNode(v.audioManager.gainNode);
        }
      });
    }

    setBitrate(kbps) {
      this.outputTrack.setInfo({
        kbps
      });
    }

    setTag(tag) {
      this.outputTrack.setInfo({
        tag
      });
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

      track.setInfo({
        tag
      });
      return track;
    }

    AudioUtils.createAudioTrackFromURL = createAudioTrackFromURL;

    function createAudioTrackFromFile(file, tag, bitrate) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = e => {
          const data = e.target.result;
          decodeAudioData(data).then(buffer => {
            const track = new AudioSourceTrack(buffer);

            if (bitrate) {
              track.setKbps(bitrate);
            }

            track.setInfo({
              tag
            });
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

      track.setInfo({
        tag
      });
      return track;
    }

    AudioUtils.createAudioTrackFromBuffer = createAudioTrackFromBuffer;

    async function createAudioTrackFromSource(source, tag, bitrate) {
      if (source instanceof File) {
        return await createAudioTrackFromFile(source, tag, bitrate);
      } else if (source instanceof AudioBuffer) {
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
        audioContext.decodeAudioData(data, buffer => {
          resolve(buffer);
        }, e => {
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

  const DEFAULT_RECORD_CONFIG = {
    audio: {
      enabled: true
    },
    video: {
      enabled: true,
      bitrate: 600
    }
  };
  class DeviceManager extends EventEmitter {
    constructor() {
      super(); // 记录每个 device 存在的 tick 数量

      this.deviceMap = {};

      if (!browserReport.support) {
        return;
      }

      this.updateDeivceInfo(); // safari 11 不支持 ondevicechange，使用 setInterval

      if (!browserReport.ondevicechange) {
        window.setInterval(this.updateDeivceInfo.bind(this), 1000);
      }

      if (browserReport.ondevicechange) {
        navigator.mediaDevices.ondevicechange = this.updateDeivceInfo.bind(this);
      }
    }

    async getLocalTracks(config = DEFAULT_RECORD_CONFIG) {
      log.debug("get local tracks", config);
      /**
       * 如果同时开启了摄像头和屏幕采集，分 2 次采集完成
       */

      if (REC_SCREEN_ENABLE(config) && REC_VIDEO_ENABLE(config)) {
        const subConfig = {
          screen: config.screen
        };
        const subConfig2 = {
          video: config.video,
          audio: config.audio
        };
        const values = await Promise.all([this.getLocalTracks(subConfig), this.getLocalTracks(subConfig2)]);
        return values[0].concat(values[1]);
      }

      const constraints = await transferRecordOptionToMediaConstraints(config);

      if (constraints.video && typeof constraints.video === "object" && constraints.video.deviceId) {
        qos.addEvent("DeviceChanged", {
          type: 0,
          desc: constraints.video.deviceId
        });
      }

      if (constraints.audio && typeof constraints.audio === "object" && constraints.audio.deviceId) {
        qos.addEvent("DeviceChanged", {
          type: 1,
          desc: constraints.audio.deviceId
        });
      }

      let mediaStream;

      try {
        mediaStream = await this.getUserMedia(config, constraints, true);
      } catch (e) {
        if (e.name === "NotAllowedError") {
          throw DEVICE_NOT_ALLOWED("");
        } else {
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
        } else {
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
        mediaStream = await this.getDisplayMedia(constraints, config);
      } else {
        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        const videoConstraint = constraints.video;

        if (videoConstraint && typeof videoConstraint !== "boolean") {
          const videoWidth = videoConstraint.width;
          const videoHeight = videoConstraint.height;

          if (typeof videoWidth === "number" && typeof videoHeight === "number") {
            const tracks = mediaStream.getVideoTracks();
            const firstTrack = tracks && tracks[0];
            const {
              height = videoHeight,
              width = videoWidth
            } = firstTrack.getSettings();

            if (width && height) {
              const diffProduct = (videoHeight - height) * (videoWidth - width);

              if (diffProduct * diffProduct > 10) {
                const ratio = videoHeight / videoWidth;

                if (height / width < ratio) {
                  videoConstraint.height = height;
                  videoConstraint.width = height / ratio;
                } else {
                  videoConstraint.width = width;
                  videoConstraint.height = width * ratio;
                }

                log.debug("justified constraint constraintHeight, contraintWidth, constraintRatio, screenHeight, screenWidth:", videoHeight, videoWidth, ratio, height, width, videoConstraint);
                return this.getUserMedia(config, objectSpread({}, constraints, {
                  video: videoConstraint
                }));
              }
            }
          }
        }
      }

      return mediaStream;
    }
    /**
     * getDisplayMedia 不支持同时录制屏幕和麦克风
     * 在这种情况下分 2 次请求 stream 之后合并
     */


    async getDisplayMedia(constraints, config) {
      let audioStream;

      if (constraints.audio) {
        audioStream = await navigator.mediaDevices.getUserMedia({
          audio: constraints.audio
        });
      }

      let screenStream;
      const displayConstraints = config.screen && config.screen.audio && !constraints.audio ? {
        video: constraints.video,
        audio: config.screen.audio
      } : {
        video: constraints.video
      };

      if (browserReport.getDisplayMedia && config.screen && !config.screen.forceChromePlugin) {
        screenStream = await navigator.mediaDevices.getDisplayMedia(displayConstraints);
      } else {
        screenStream = await navigator.mediaDevices.getUserMedia(displayConstraints);
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
          const device = this.deviceMap[deviceId].device;
          qos.addEvent(device.kind === "audioinput" || device.kind === "audiooutput" ? "AudioDeviceInOut" : "VideoDeviceInOut", {
            device_type: device.kind === "audiooutput" ? 1 : 0,
            device_state: 0,
            device_label: device.label,
            device_id: device.deviceId,
            device_info: device.label
          });
          delete this.deviceMap[deviceId];
          updateFlag = true;
        } else {
          this.deviceMap[deviceId].tick += 1;
        }
      });
      currentDeviceIds.forEach((deviceId, index) => {
        // device 插入
        if (lastDeviceIds.indexOf(deviceId) === -1 && deviceId !== "@default") {
          this.deviceMap[deviceId] = {
            device: this.deviceInfo[index],
            tick: 0
          };
          const device = this.deviceMap[deviceId].device;
          this.emit("device-add", device);
          qos.addEvent(device.kind === "audioinput" || device.kind === "audiooutput" ? "AudioDeviceInOut" : "VideoDeviceInOut", {
            device_type: device.kind === "audiooutput" ? 1 : 0,
            device_state: 1,
            device_label: device.label,
            device_id: device.deviceId
          });
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
  exports.QosEventType = QosEventType;
  exports.DeviceManager = DeviceManager;
  exports.deviceManager = deviceManager;
  exports.AudioSourceTrack = AudioSourceTrack;
  exports.TrackMixingManager = TrackMixingManager;
  exports.StreamMixingManager = StreamMixingManager;
  exports.AudioEffectManager = AudioEffectManager;
  exports.AudioMusicManager = AudioMusicManager;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=pili-rtc-web-2.3.0.umd.js.map
