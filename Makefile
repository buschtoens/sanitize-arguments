MOCHA_OPTS=
REPORTER = dot

check: test

test:
	@NODE_ENV=test ./node_modules/.bin \
			--reporter $(REPORTER) \
			$(MOCHA_OPTS)

.PHONY: test