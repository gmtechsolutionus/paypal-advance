from __future__ import annotations

import json
from pathlib import Path
from typing import Dict, Tuple

PACKAGE_JSON = Path("package.json")

# Mapping of deprecated npm packages to the versions we want to force with npm overrides.
DEPRECATED_DEP_OVERRIDES: Dict[str, str] = {
    "inflight": "npm:@npmcli/inflight@^2.0.2",
    "rimraf": "^5.0.5",
    "glob": "^10.4.5",
}

# Dev dependency versions that are safe on Vercel and drop the deprecated @humanwhocodes packages
DEV_DEP_UPDATES: Dict[str, str] = {
    "eslint": "^9.5.0",
    "@eslint/js": "^9.5.0",
}

# Packages we want to actively remove from direct dependency lists if they happen to exist.
DEPRECATED_DIRECT_DEPENDENCIES = {
    "@humanwhocodes/object-schema",
    "@humanwhocodes/config-array",
}


def ensure_package_json_exists() -> None:
    if not PACKAGE_JSON.exists():
        raise SystemExit(
            "package.json not found. Create one before running this fixer."
        )


def load_package_json() -> Dict[str, object]:
    with PACKAGE_JSON.open() as fp:
        return json.load(fp)


def ensure_section(data: Dict[str, object], section: str) -> Dict[str, str]:
    section_value = data.get(section)
    if not isinstance(section_value, dict):
        section_value = {}
        data[section] = section_value
    return section_value  # type: ignore[return-value]


def apply_dev_dependency_updates(data: Dict[str, object]) -> bool:
    dev_deps = ensure_section(data, "devDependencies")
    changed = False
    for name, version in DEV_DEP_UPDATES.items():
        current = dev_deps.get(name)
        if current != version:
            dev_deps[name] = version
            changed = True
    return changed


def remove_deprecated_direct_dependencies(data: Dict[str, object]) -> bool:
    changed = False
    for section_name in ("dependencies", "devDependencies", "optionalDependencies"):
        section = data.get(section_name)
        if not isinstance(section, dict):
            continue
        for dep in list(section):
            if dep in DEPRECATED_DIRECT_DEPENDENCIES:
                section.pop(dep, None)
                changed = True
    return changed


def apply_overrides(data: Dict[str, object]) -> bool:
    overrides = ensure_section(data, "overrides")
    changed = False
    for name, version in DEPRECATED_DEP_OVERRIDES.items():
        current = overrides.get(name)
        if current != version:
            overrides[name] = version
            changed = True
    return changed


def write_package_json(data: Dict[str, object]) -> None:
    # Sort sections for determinism to avoid unnecessary diff churn.
    for key in ("dependencies", "devDependencies", "optionalDependencies", "overrides"):
        section = data.get(key)
        if isinstance(section, dict):
            data[key] = dict(sorted(section.items()))
    PACKAGE_JSON.write_text(json.dumps(data, indent=2))


def main() -> None:
    ensure_package_json_exists()
    data = load_package_json()

    changed_sections: Tuple[bool, bool, bool] = (
        apply_dev_dependency_updates(data),
        remove_deprecated_direct_dependencies(data),
        apply_overrides(data),
    )

    if any(changed_sections):
        write_package_json(data)
        print("Updated package.json with non-deprecated tooling versions.")
    else:
        print("package.json already uses the recommended dependencies.")


if __name__ == "__main__":
    main()
