import { utils, BigNumber } from "ethers";

import type { UserBorrowInfo } from "./getUserBorrowInfo";
import type { UserCollateralInfo } from "./getUserCollateralInfo";

type CauldronPositionItem = {
  config: object;
  oracleRate: BigNumber;
  collateralInfo: UserCollateralInfo;
  borrowInfo: UserBorrowInfo;
  liquidationPrice: number;
};

export const getUsersTotalAssets = (
  positions: CauldronPositionItem[]
): object => {
  const COLLATERAL_PRECISION = 2;

  const collateralDeposited = positions.reduce((accumulator, position) => {
    const collateralValue = position.collateralInfo.userCollateralShare
      .mul(Math.pow(10, COLLATERAL_PRECISION))
      .div(position.oracleRate);
    return accumulator.add(collateralValue);
  }, BigNumber.from(0));

  const mimBorrowed = positions.reduce((accumulator, position) => {
    return accumulator.add(position.borrowInfo.userBorrowAmount);
  }, BigNumber.from(0));

  return {
    collateralDepositedInUsd: utils.formatUnits(
      collateralDeposited,
      COLLATERAL_PRECISION
    ),
    mimBorrowed: utils.formatUnits(mimBorrowed),
  };
};